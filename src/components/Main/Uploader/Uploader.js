import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { reqProjects } from "../../../ducks/projectReducer";

class Uploader extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      username: "",
      success: false,
      error: false,
      errorMessage: ""
    };
  }

  handleName = val => this.setState({ name: val });
  handleDesc = val => this.setState({ description: val });
  handleUsername = val => this.setState({ username: val });

  uploadNew = e => {
    let file = e.target.files[0];
    // Split the filename to get the name and type
    let fileParts = file.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    const { name, description, username } = this.state;
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
          .post("/api/project", { name, description, username, url })
          .then(res => this.props.reqProjects())
          .catch(err =>
            alert(
              `${err}: Project already exists. Upload new version on project card`
            )
          )
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
