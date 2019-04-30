import React, { Component } from "react";
import S3FileUpload from "react-s3";
import axios from "axios";

const config = {
  bucketName: "honey-bucket",
  dirName: "projects",
  region: "us-west-2",
  accessKeyId: "AKIAIRGLY2N7DRDPZT3Q",
  secretAccessKey: "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"
};

class FileManager extends Component {
  upload = async e => {
    const result = await S3FileUpload.uploadFile(
      e.target.files[0],
      config
    ).catch(err => console.log(err));
    const { location } = result;
    console.log(location);
    axios
      .post("/api/project", { location })
      .then(res => {})
      .catch(err => console.log(err));
  };
  delete = async e => {
    const result = await S3FileUpload.deleteFile(
      e.target.files[0],
      config
    ).catch(err => console.error(err));
    const { location } = result;
  };
  render() {
    return (
      <div>
        <input type="file" onChange={this.upload} />
      </div>
    );
  }
}

export default FileManager;
