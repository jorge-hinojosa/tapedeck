import React, { Component } from "react";
import S3FileUpload from "react-s3";
import axios from "axios";
import { connect } from "react-redux";
import { reqProjects } from "../../../ducks/projectReducer";
// import { reqUserData } from "../../../ducks/userReducer";
import { config } from "../../../aws_config";

class Uploader extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      username: ""
    };
  }
  // componentDidMount() {
  //   this.props.reqUserData();
  // }

  handleName = val => this.setState({ name: val });
  handleDesc = val => this.setState({ description: val });
  handleUsername = val => this.setState({ username: val });

  uploadNew = async e => {
    const result = await S3FileUpload.uploadFile(
      e.target.files[0],
      config
    ).catch(err => console.log(err));

    const { location } = result;
    const { name, description, username } = this.state;

    axios
      .post("/api/project", { name, description, username, location })
      .then(res => this.props.reqProjects())
      .catch(err =>
        alert(
          `${err}: Project already exists. Upload new version on project card`
        )
      );

    this.clearInputFields();
  };
  clearInputFields = () => {
    this.refs.projectName.value = "";
    this.refs.description.value = "";
    this.refs.username.value = "";
    this.refs.file.value = "";
  };
  render() {
    // console.log(this.props);
    return (
      <div>
        <input
          ref="projectName"
          type="text"
          placeholder="Project Name"
          onChange={e => this.handleName(e.target.value)}
        />
        <input
          ref="description"
          type="text"
          placeholder="Describe Edits"
          onChange={e => this.handleDesc(e.target.value)}
        />
        <input
          ref="username"
          type="text"
          placeholder="Username"
          onChange={e => this.handleUsername(e.target.value)}
        />
        <input ref="file" type="file" onChange={this.uploadNew} />
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
