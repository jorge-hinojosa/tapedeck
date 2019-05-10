import React, { Component } from "react";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./settings.module.scss";
import axios from "axios";

class Settings extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      updatedFirstName: this.props.first_name,
      updatedLastName: this.props.last_name,
      updatedUsername: this.props.username,
      updatedImage: [],
      updatedLocation: this.props.location,
      updatedBio: this.props.bio
    };
  }
  handleClick = () => {
    this.updatePicture();
    this.editProfile();
    this.props.toggleSettings();
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  editProfile = async () => {
    const {
      updatedFirstName,
      updatedLastName,
      updatedUsername,
      updatePicture,
      updatedLocation,
      updatedBio
    } = this.state;
    const { id } = this.props;
    await axios
      .put(`/auth/user-data/${id}`, {
        updatedFirstName,
        updatedLastName,
        updatedUsername,
        updatePicture,
        updatedLocation,
        updatedBio
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  updatePicture = () => {
    // let file = e.target.files[0];
    let file = this.state.updatedImage[0];
    // Split the filename to get the name and type
    let fileParts = file.name.split(".");
    let fileName = `photos/${fileParts[0]}`;
    let fileType = fileParts[1];

    console.log("Preparing the upload");

    axios
      .post("/sign_s3", {
        fileName: fileName,
        fileType: fileType
      })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        // var url = returnData.url;
        // this.setState({ url: url });
        console.log("Recieved a signed request " + signedRequest);

        var options = {
          headers: {
            "Content-Type": fileType
          }
        };
        axios.put(signedRequest, file, options).then(result => {
          console.log("Response from s3");
          // this.setState({ success: true });
        });
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });

    this.resetInputFields();
  };
  resetInputFields = () => {
    this.setState({
      updatedUsername: "",
      updatedFirstName: "",
      updatedLastName: "",
      updatedBio: "",
      updatedLocation: "",
      updatedImage: []
    });
  };
  choosePicture = e => {
    console.log(e.target.files[0]);
    this.setState({
      updatedImage: [e.target.files[0]]
    });
  };
  render() {
    return (
      <Dialog
        className={styles.newProject_dialog}
        open={this.props.settings}
        onClose={this.props.toggleSettings}
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update you profile settings here:
          </DialogContentText>
          <FormControl className={styles.form}>
            <TextField
              label="Change Username"
              // className={classes.textField}
              defaultValue={this.props.username}
              onChange={this.handleChange}
              margin="normal"
              name="updatedUsername"
            />
            <TextField
              label="Change First Name"
              // className={classes.textField}
              defaultValue={this.props.first_name}
              onChange={this.handleChange}
              margin="normal"
              name="updatedFirstName"
            />
            <TextField
              label="Change Last Name"
              // className={classes.textField}
              defaultValue={this.props.last_name}
              onChange={this.handleChange}
              margin="normal"
              name="updatedLastName"
            />
            <TextField
              label="Update Bio"
              // className={classes.textField}
              defaultValue={
                this.props.bio !== undefined ? this.props.bio : this.state.bio
              }
              onChange={this.handleChange}
              margin="normal"
              name="updatedBio"
            />
            <TextField
              label="Update Location"
              // className={classes.textField}
              defaultValue={
                this.props.location !== undefined
                  ? this.props.location
                  : this.state.location
              }
              onChange={this.handleChange}
              margin="normal"
              name="updatedLocation"
            />
            <input
              accept="image/*"
              className={styles.uglyUpload}
              id="contained-button-file"
              type="file"
              value=""
              onChange={this.choosePicture}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                // className={classes.button}
              >
                Choose Pro Pic
              </Button>
            </label>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => this.handleClick()} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Settings;
