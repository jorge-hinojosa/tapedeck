import React, { Component } from "react";
import styles from "./version-card.module.scss";
import axios from "axios";

class VersionCard extends Component {
  deleteVersion = version_id => {
    axios
      .delete(`/api/project/versions/${version_id}`)
      .then(res => {})
      .catch(err => console.log(err));
    this.props.getAllVersions(this.props.project_id);
  };
  render() {
    const {
      version_id,
      project_id,
      name,
      description,
      username,
      project_url
    } = this.props;
    return (
      <div className={styles.versionCard_cont}>
        <div className={styles.versionCard}>
          <div className={styles.cont}>
            <span>{project_id}</span>
            <span>{name}</span>
            <span>{description}</span>
            <span>{username}</span>
            <span>
              <a href={project_url} target="_blank" rel="noopener noreferrer">
                download
              </a>
            </span>
            <span
              className={styles.link}
              onClick={() => this.deleteVersion(version_id)}
            >
              delete
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default VersionCard;
