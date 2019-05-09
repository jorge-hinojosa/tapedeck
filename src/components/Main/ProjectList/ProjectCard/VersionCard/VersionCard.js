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
      // name,
      description,
      username,
      project_url
    } = this.props;
    return (
      <div className={styles.versionCard_cont}>
        <div className={styles.versionCard}>
          <div className={styles.cont}>
            <i className="material-icons bullet-arrow">arrow_forward_ios</i>
            <span>{project_id}</span>
            <span>{description}</span>
            <span>{username}</span>
            <div className={styles.icons_cont}>
              <i className="material-icons">
                <a href={project_url} target="_blank" rel="noopener noreferrer">
                  cloud_download
                </a>
              </i>
              <i className="material-icons" onClick={() => this.toggleEdit()}>
                edit
              </i>
              <i
                className="material-icons"
                onClick={() => this.deleteVersion(version_id)}
              >
                delete
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VersionCard;
