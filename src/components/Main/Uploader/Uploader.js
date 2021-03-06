import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { reqProjects } from "../../../ducks/projectReducer";
// import { reqUserData } from "../../../ducks/userReducer";

import styles from "./uploader.module.scss";

// import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";

class Uploader extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      adding: false,
      name: "",
      description: "",
      username: "",
      chosenFile: [],
      success: false,
      error: false,
      errorMessage: ""
    };
  }
  handleClick = () => {
    this.uploadNew();
    this.addProjectToggle();
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  chooseFile = e => {
    console.log(e.target.files[0]);
    this.setState({
      chosenFile: [e.target.files[0]]
    });
  };
  addProjectToggle = () => {
    const { adding } = this.state;
    if (adding === false) {
      this.setState({ adding: true });
    } else if (adding === true) {
      this.setState({ adding: false });
      this.clearInputFields();
    }
  };
  uploadNew = () => {
    // let file = e.target.files[0];
    let file = this.state.chosenFile[0];
    // Split the filename to get the name and type
    let fileParts = file.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    const { name, description, username } = this.state;

    //Get Timestamp
    let today = new Date();
    let date =
      today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let uploadDate = date + " " + time;

    console.log("Preparing the upload");

    //Upload file to S3 and Db
    axios
      .post("/sign_s3", {
        fileName: fileName,
        fileType: fileType
      })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({ url: url });
        console.log("Recieved a signed request " + signedRequest);

        var options = {
          headers: {
            "Content-Type": fileType
          }
        };
        axios.put(signedRequest, file, options).then(result => {
          console.log("Response from s3");
          this.setState({ success: true });
        });
        axios
          .post("/api/project", {
            name,
            description,
            username,
            url,
            uploadDate
          })
          .then(res => {
            this.props.reqProjects();
            this.props.successToast();
          })
          .catch(err => {
            console.log(err);
            this.props.errorToast(
              "Project already exists. Upload new version on project card"
            );
          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });

    this.clearInputFields();
  };
  clearInputFields = () => {
    this.setState({
      name: "",
      description: "",
      username: "",
      chosenFile: []
    });
  };
  render() {
    return (
      <div>
        <div className={styles.uploader_cont}>
          <i
            onClick={() => this.props.toggleSettings()}
            className="material-icons"
          >
            settings
          </i>
          <i onClick={() => this.addProjectToggle()} className="material-icons">
            add_circle
          </i>
        </div>
        {this.state.adding ? (
          <Dialog
            className={styles.newProject_dialog}
            open={this.state.adding}
            onClose={this.addProjectToggle}
          >
            <DialogTitle id="form-dialog-title">
              Create a New Project
            </DialogTitle>
            <DialogContent>
              <FormControl margin="dense" className={styles.form}>
                <DialogContentText>
                  Note: if you wish to add a new version to an existing project,
                  upload on an existing project card.
                </DialogContentText>
                <TextField
                  className={styles.textfield}
                  label="Project Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  margin="normal"
                  name="name"
                />
                <TextField
                  className={styles.textfield}
                  label="Initial Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  margin="normal"
                  name="description"
                />
                <TextField
                  className={styles.textfield}
                  label="Your Username"
                  defaultValue={this.state.username}
                  onChange={this.handleChange}
                  margin="normal"
                  name="username"
                />
                <input
                  className={styles.uglyUpload}
                  id="contained-button-file"
                  type="file"
                  onChange={this.chooseFile}
                />
                <label
                  className={styles.button_cont}
                  htmlFor="contained-button-file"
                >
                  <Button
                    className={styles.button}
                    variant="contained"
                    component="span"
                  >
                    Choose File <br />
                    <i className="material-icons">cloud_upload</i>
                  </Button>
                  {this.state.chosenFile.length > 0 ? (
                    <i className="material-icons">check_circle</i>
                  ) : null}
                </label>
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => this.handleClick()} variant="contained">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    projects: state.projects
    // user: state.user
  };
};
export default connect(
  mapStateToProps,
  { reqProjects }
)(Uploader);
