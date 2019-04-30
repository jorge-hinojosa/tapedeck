import React from "react";
import styles from "./project-card.module.scss";

function ProjectCard(props) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.project_cont}>
        <span>{props.name}</span>
        <span>{props.description}</span>
        <span>{props.author}</span>
        <span>
          <a href={props.project_url} target="_blank" rel="noopener noreferrer">
            download
          </a>
        </span>
        <span className={styles.link} onClick={() => props.delete(props.id)}>
          delete
        </span>
      </div>
    </div>
  );
}

export default ProjectCard;
