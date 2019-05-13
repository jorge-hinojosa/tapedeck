import React, { Component } from "react";
import styles from "./version-card.module.scss";
import axios from "axios";
import EditVersion from "./EditVersion";

class VersionCard extends Component {
  constructor() {
    super();
    this.state = {
      editting: false
    };
  }
  toggleEdit = () => {
    this.state.editting === true
      ? this.setState({ editting: false })
      : this.setState({ editting: true });
  };
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
            <i className="material-icons bullet-arrow">play_arrow</i>
            <span>{project_id}</span>
            <span>{description}</span>
            <span>{username}</span>
            <div className={styles.icons_cont}>
              <i className="material-icons">
                <a href={project_url} target="_blank" rel="noopener noreferrer">
                  cloud_download
                </a>
              </i>
              <i className="material-icons" onClick={this.toggleEdit}>
                edit
              </i>
              {this.state.editting ? (
                <EditVersion
                  getAllVersions={this.props.getAllVersions}
                  toggleEdit={this.toggleEdit}
                  editting={this.state.editting}
                  version_id={version_id}
                  project_id={project_id}
                  name={name}
                  description={description}
                  username={username}
                  project_url={project_url}
                />
              ) : null}
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
