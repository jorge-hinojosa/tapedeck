import React, { Component } from "react";
import styles from "./version-card.module.scss";

class VersionCard extends Component {
  render() {
    const { name, description, username, project_url } = this.props;
    return (
      <div className={styles.versionCard_cont}>
        <div className={styles.versionCard}>
          <div className={styles.cont}>
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
              // onClick={() => deleteProject(project_id)}
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
