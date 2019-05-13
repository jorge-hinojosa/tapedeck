import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./edit-version.module.scss";

class EditVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedDescription: this.props.description
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  updateVersion = () => {
    const { updatedDescription } = this.state;
    const { version_id, project_id, name, username, project_url } = this.props;
    axios
      .put(`/api/project/versions/${version_id}`, {
        project_id,
        name,
        updatedDescription,
        username,
        project_url
      })
      .then(res => {
        this.props.getAllVersions(project_id);
        this.props.successToast();
      })
      .catch(err => {
        console.log(err);
        this.props.errorToast("Could not update version.");
      });

    this.props.toggleEdit();
  };

  render() {
    return (
      <Dialog
        className={styles.newProject_dialog}
        open={this.props.editting}
        onClose={this.props.toggleEdit}
      >
        <DialogTitle id="form-dialog-title">Edit Version</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit version description here:</DialogContentText>
          <FormControl className={styles.form}>
            <TextField
              label="Edit description"
              // className={classes.textField}
              defaultValue={this.props.description}
              onChange={this.handleChange}
              margin="normal"
              name="updatedDescription"
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.updateVersion} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditVersion;
