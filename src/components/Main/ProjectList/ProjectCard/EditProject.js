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
import styles from "./edit-project.module.scss";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedProjectname: this.props.name,
      updatedDescription: this.props.description
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  updateProject = () => {
    const { updatedProjectname, updatedDescription } = this.state;
    const { project_id, username, project_url, upload_date } = this.props;
    axios
      .put(`/api/project/edit/${project_id}`, {
        project_id,
        updatedProjectname,
        updatedDescription,
        username,
        project_url,
        upload_date
      })
      .then(res => {
        this.props.reqProjects();
        this.props.successToast();
      })
      .catch(err => {
        console.log(err);
        this.props.errorToast("Could not update project");
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
        <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
        <DialogContent>
          <DialogContentText>Update project details here:</DialogContentText>
          <FormControl className={styles.form}>
            <TextField
              label="Change Project Name"
              // className={classes.textField}
              defaultValue={this.props.name}
              onChange={this.handleChange}
              margin="normal"
              name="updatedProjectname"
            />
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
          <Button onClick={this.updateProject} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditProject;
