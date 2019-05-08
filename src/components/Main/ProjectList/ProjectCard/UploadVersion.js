import React, { Component } from "react";
import axios from "axios";

class UploadVersion extends Component {
  constructor() {
    super();
    this.state = {
      updatedDescription: "",
      updatedUsername: "",
      url: ""
    };
  }
  handleDesc = val => this.setState({ updatedDescription: val });
  handleUsername = val => this.setState({ updatedUsername: val });

  uploadVersion = async e => {
    let file = e.target.files[0];
    // Split the filename to get the name and type
    let fileParts = file.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    const { project_id, name, description, username, project_url } = this.props;
    console.log(username);
    const { updatedDescription, updatedUsername } = this.state;

    console.log("Preparing the upload");

    axios
      .post("/sign_s3", {
        fileName: fileName,
        fileType: fileType
      })
      .then(async response => {
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
        await axios
          .put(signedRequest, file, options)
          .then(result => {
            console.log("Response from s3");
            this.setState({ success: true });
          })
          .catch(err => console.log(err));
        await axios
          .post("/api/project/versions", {
            project_id,
            name,
            description,
            username,
            project_url
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        await axios
          .put(`/api/project/${project_id}`, {
            name,
            updatedDescription,
            updatedUsername,
            url
          })
          .then(res => {
            console.log(res);
            this.props.reqProjects();
          })
          .catch(err => console.log(err));
        this.props.getCurrVersionUsername(project_id);
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
    this.props.getAllVersions(project_id);
    this.clearInputFields();
  };
  clearInputFields = () => {
    this.refs.description.value = "";
    this.refs.username.value = "";
    this.refs.file.value = "";
  };
  render() {
    // console.log(this.props);
    return (
      <div>
        <input
          ref="description"
          type="text"
          placeholder="Describe Edits"
          onChange={e => this.handleDesc(e.target.value)}
        />
        <input
          ref="username"
          type="text"
          placeholder="Insert Username"
          onChange={e => this.handleUsername(e.target.value)}
        />
        <input ref="file" type="file" onChange={this.uploadVersion} />
      </div>
    );
  }
}

export default UploadVersion;
