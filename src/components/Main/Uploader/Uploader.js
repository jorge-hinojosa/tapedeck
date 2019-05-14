import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { reqProjects } from "../../../ducks/projectReducer";

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
  constructor() {
    super();
    this.state = {
      adding: false,
      name: "",
      description: "",
      username: "",
      chosenFile: [],
      uploadDate: "",
      success: false,
      error: false,
      errorMessage: ""
    };
  }
  componentDidMount() {
    this.getUploadDate();
  }
  handleClick = () => {
    this.uploadNew();
    this.addProjectToggle();
  };
  handleName = val => this.setState({ name: val });
  handleDesc = val => this.setState({ description: val });
  handleUsername = val => this.setState({ username: val });
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
    }
  };
  getUploadDate = () => {
    let today = new Date();
    let date =
      today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    this.setState({ uploadDate: dateTime });
  };
  uploadNew = () => {
    // let file = e.target.files[0];
    let file = this.state.chosenFile[0];
    // Split the filename to get the name and type
    let fileParts = file.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    const { name, description, username, uploadDate } = this.state;

    console.log("Preparing the upload");

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
    // console.log(this.props);
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
              <DialogContentText>
                Note: if you wish to add a new version to an existing project,
                upload on an existing project card.
              </DialogContentText>
              <FormControl className={styles.form}>
                <TextField
                  label="Project Name"
                  value={this.state.name}
                  onChange={e => this.handleName(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Initial Description"
                  value={this.state.description}
                  onChange={e => this.handleDesc(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Your Username"
                  value={this.state.username}
                  onChange={e => this.handleUsername(e.target.value)}
                  margin="normal"
                />
                <input
                  className={styles.uglyUpload}
                  id="contained-button-file"
                  type="file"
                  onChange={this.chooseFile}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span">
                    Choose File <br />
                    <i className="material-icons">cloud_upload</i>
                  </Button>
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
    projects: state.projects,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { reqProjects }
)(Uploader);
