import React from "react";
import styles from "./no-projects.module.scss";

function NoProjects(props) {
  return (
    <div className={styles.test}>
      <div className={styles.cont}>
        <i className="material-icons">create_new_folder</i>
        <h2>Please add a project</h2>
      </div>
    </div>
  );
}

export default NoProjects;
