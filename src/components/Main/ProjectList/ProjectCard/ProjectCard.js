import React, { Component } from "react";
import styles from "./project-card.module.scss";

class ProjectCard extends Component {
  render() {
    const {
      name,
      description,
      username,
      project_url,
      deleteProject,
      project_id
    } = this.props;
    return (
      <div className={styles.projectCard}>
        <div className={styles.project_cont}>
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
    );
  }
}

export default ProjectCard;
