import React, { Component } from "react";
import styles from "./project-card.module.scss";
import S3FileUpload from "react-s3";
import axios from "axios";
import VersionCard from "./VersionCard/VersionCard";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_FOLDER,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY
};

class ProjectCard extends Component {
  constructor() {
    super();
    this.state = {
      versions: [],
      updatedDescription: "",
      updatedUsername: "",
      cardOpen: false
    };
  }

  toggleCard = () => {
    const { cardOpen } = this.state;
    if (cardOpen === false) {
      this.getAllVersions(this.props.project_id);
      this.setState({ cardOpen: true });
    } else if (cardOpen === true) {
      this.setState({ cardOpen: false });
    }
  };

  getAllVersions = project_id => {
    console.log(project_id);
    axios
      .get(`/api/project/versions/${project_id}`)
      .then(res => {
        console.log(res);
        this.setState({ versions: res.data });
        console.log(this.state.versions);
      })
      .catch(err => console.log(err));
  };

  uploadVersion = async e => {
    const result = await S3FileUpload.uploadFile(
      e.target.files[0],
      config
    ).catch(err => console.log(err));

    const { project_id, name, description, username, project_url } = this.props;
    const { updatedDescription, updatedUsername } = this.state;

    axios
      .post("/api/project/versions", {
        project_id,
        name,
        description,
        username,
        project_url
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    axios
      .put(`/api/project/${project_id}`, {
        name,
        updatedDescription,
        updatedUsername,
        result
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    const {
      name,
      description,
      username,
      project_url,
      deleteProject,
      project_id
    } = this.props;

    const viewVersions = this.state.versions.map((version, i) => {
      return (
        <VersionCard
          name={version.name}
          description={version.description}
          username={version.username}
          project_url={version.project_url}
          key={i}
        />
      );
    });

    return (
      <div className={styles.cont}>
        <div className={styles.projectCard}>
          <div className={styles.project_cont}>
            <button onClick={() => this.toggleCard()}>open</button>
            <span>{name}</span>
            <span>{description}</span>
            <span>{username}</span>
            <span className={styles.link}>edit</span>
            <span className={styles.link}>invite</span>
            <span className={styles.link}>upload</span>
            <span>
              <a href={project_url} target="_blank" rel="noopener noreferrer">
                download
              </a>
            </span>
            <span
              className={styles.link}
              onClick={() => deleteProject(project_id)}
            >
              delete
            </span>
          </div>
        </div>
        {this.state.cardOpen
          ? viewVersions
          : // <VersionCard
            //   name={name}
            //   description={description}
            //   username={username}
            //   project_url={project_url}
            // />
            null}
      </div>
    );
  }
}

export default ProjectCard;
