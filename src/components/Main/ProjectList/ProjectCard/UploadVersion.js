import React, { Component } from "react";
import axios from "axios";
import styles from "./upload-version.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";

class UploadVersion extends Component {
  constructor() {
    super();
    this.state = {
      chosenFile: [],
      updatedDescription: "",
      updatedUsername: "",
      updatedUploadDate: ""
      // url: ""
    };
  }
  componentDidMount() {
    this.getUploadDate();
  }
  handleClick = () => {
    this.uploadVersion();
    this.props.toggleUpload();
  };
  handleDesc = val => this.setState({ updatedDescription: val });
  handleUsername = val => this.setState({ updatedUsername: val });

  chooseFile = e => {
    console.log(e.target.files[0]);
    this.setState({
      chosenFile: [e.target.files[0]]
    });
  };
  getUploadDate = () => {
    let today = new Date();
    let date =
      today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    this.setState({ updatedUploadDate: dateTime });
  };
  uploadVersion = async () => {
    let file = this.state.chosenFile[0];
    // Split the filename to get the name and type
    let fileParts = file.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    const {
      project_id,
      name,
      description,
      project_url,
      upload_date,
      reqProjects,
      username
    } = this.props;
    const {
      updatedDescription,
      updatedUsername,
      updatedUploadDate
    } = this.state;
    // console.log(username, updatedUsername);

    console.log("Preparing the upload");

    if (username !== undefined) {
      console.log(username);
      finishUpload(username);
    } else console.log("IT DIDNT WORK", username);

    function finishUpload(username) {
      axios
        .post("/sign_s3", {
          fileName: fileName,
          fileType: fileType
        })
        .then(async response => {
          var returnData = response.data.data.returnData;
          var signedRequest = returnData.signedRequest;
          var url = returnData.url;
          console.log("Recieved a signed request " + signedRequest);

          var options = {
            headers: {
              "Content-Type": fileType
            }
          };
          await axios
            .put(signedRequest, file, options)
            .then(result => {
              console.log("Response from s3");
            })
            .catch(err => console.log(err));
          await axios
            .post("/api/project/versions", {
              project_id,
              name,
              description,
              username,
              project_url,
              upload_date
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
          await axios
            .put(`/api/project/${project_id}`, {
              name,
              updatedDescription,
              updatedUsername,
              url,
              updatedUploadDate
            })
            .then(res => {
              console.log(res);
              reqProjects();
            })
            .catch(err => console.log(err));
          // this.props.successToast();
        })
        .catch(err => {
          console.log(err);
          // this.props.errorToast("Could not upload version");
        });
    }
    this.props.getAllVersions(project_id);
    this.clearInputFields();
  };
  clearInputFields = () => {
    this.setState({
      chosenFile: [],
      updatedDescription: "",
      updatedUsername: ""
    });
  };
  render() {
    // console.log(this.props);
    return (
      <div>
        <Dialog
          className={styles.newVersion_dialog}
          open={this.props.uploading}
          onClose={this.props.toggleUpload}
        >
          <DialogTitle id="form-dialog-title">Upload a New Version</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>
            <FormControl className={styles.form}>
              <TextField
                label="Update Description"
                // className={classes.textField}
                value={this.state.updatedDescription}
                onChange={e => this.handleDesc(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Your Username"
                // className={classes.textField}
                value={this.state.updatedUsername}
                onChange={e => this.handleUsername(e.target.value)}
                margin="normal"
              />
              <input
                // accept="image/*"
                className={styles.uglyUpload}
                id="contained-button-file"
                // multiple
                type="file"
                onChange={this.chooseFile}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  // className={classes.button}
                >
                  Choose File <br />
                  <i className="material-icons">cloud_upload</i>
                </Button>
              </label>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => this.handleClick()} variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UploadVersion;
