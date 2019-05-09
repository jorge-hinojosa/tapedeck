import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import styles from "./settings.module.scss";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      updatedUsername: "",
      updatedFirstName: "",
      updatedLastName: "",
      updatedBio: "",
      updatedLocation: "",
      updatedImage: ""
    };
  }
  render() {
    return (
      <form>
        <TextField
          label="Change Username"
          // className={classes.textField}
          value={this.state.updatedUsername}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Change First Name"
          // className={classes.textField}
          value={this.state.updatedFirstName}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Change Last Name"
          // className={classes.textField}
          value={this.state.updatedLastName}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Update Bio"
          // className={classes.textField}
          value={this.state.updatedBio}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Update Location"
          // className={classes.textField}
          value={this.state.updatedLocation}
          // onChange={this.handleChange('name')}
          margin="normal"
        />
        <input
          accept="image/*"
          className={styles.uglyUpload}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            component="span"
            // className={classes.button}
          >
            Update Pro Pic
          </Button>
        </label>

        {/* Change Username:
        <Input value={this.state.updatedUsername || ""} />
        Change First Name:
        <Input value={this.state.updatedFirstName || ""} />
        Change Last Name:
        <Input>Change Last Name</Input>
        Change Bio:
        <Input>Change Bio</Input>
        Change Location:
        <Input>Change Location</Input>
        Change Profile Picture:
        <Input>Change Profile Picture</Input>
        <Button>Submit</Button> */}
      </form>
    );
  }
}

export default Settings;
