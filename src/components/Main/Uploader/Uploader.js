import React, { Component } from "react";
import S3FileUpload from "react-s3";
import axios from "axios";
import { connect } from "react-redux";
import { reqProjects } from "../../../ducks/projectReducer";

const config = {
  bucketName: "honey-bucket",
  dirName: "projects",
  region: "us-west-2",
  accessKeyId: "AKIAIRGLY2N7DRDPZT3Q",
  secretAccessKey: "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"
};

class Uploader extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      author: ""
    };
  }
  handleName = val => this.setState({ name: val });
  handleDesc = val => this.setState({ description: val });
  handleAuthor = val => this.setState({ author: val });

  upload = async e => {
    const result = await S3FileUpload.uploadFile(
      e.target.files[0],
      config
    ).catch(err => console.log(err));
    const { location } = result;
    const { name, description, author } = this.state;
    axios
      .post("/api/project", { name, description, author, location })
      .then(res => this.props.reqProjects())
      .catch(err => console.log(err));

    this.clearInputFields();
  };
  clearInputFields = () => {
    this.refs.projectName.value = "";
    this.refs.description.value = "";
    this.refs.author.value = "";
  };
  render() {
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
          ref="author"
          type="text"
          placeholder="Username"
          onChange={e => this.handleAuthor(e.target.value)}
        />
        <input type="file" onChange={this.upload} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};
export default connect(
  mapStateToProps,
  { reqProjects }
)(Uploader);
