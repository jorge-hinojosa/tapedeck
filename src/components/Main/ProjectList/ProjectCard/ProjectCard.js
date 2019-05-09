import React, { Component } from "react";
import styles from "./project-card.module.scss";
import axios from "axios";
import VersionCard from "./VersionCard/VersionCard";
import UploadVersion from "./UploadVersion";
import Invite from "./Invite";

class ProjectCard extends Component {
  constructor() {
    super();
    this.state = {
      versions: [],
      cardOpen: false,
      editting: false,
      inviting: false,
      uploading: false
    };
  }
  toggleCard = () => {
    const { cardOpen } = this.state;
    if (cardOpen === false) {
      this.getAllVersions(this.props.project_id);
      this.setState({
        cardOpen: true,
        editting: false,
        inviting: false,
        uploading: false
      });
    } else if (cardOpen === true) {
      this.setState({ cardOpen: false });
    }
  };
  toggleEdit = () => {
    const { editting } = this.state;
    if (editting === false) {
      this.setState({
        cardOpen: false,
        editting: true,
        inviting: false,
        uploading: false
      });
    } else if (editting === true) {
      this.setState({ editting: false });
    }
  };
  toggleInvite = () => {
    const { inviting } = this.state;
    if (inviting === false) {
      this.setState({
        cardOpen: false,
        editting: false,
        inviting: true,
        uploading: false
      });
    } else if (inviting === true) {
      this.setState({ inviting: false });
    }
  };
  toggleUpload = () => {
    const { uploading } = this.state;
    if (uploading === false) {
      this.setState({
        cardOpen: false,
        editting: false,
        inviting: false,
        uploading: true
      });
    } else if (uploading === true) {
      this.setState({ uploading: false });
    }
  };

  getAllVersions = project_id => {
    axios
      .get(`/api/project/versions/${project_id}`)
      .then(res => {
        // console.log("HERE");
        this.setState({ versions: res.data });
      })
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
    // console.log(this.state.versions);

    const viewVersions = this.state.versions.map((version, i) => {
      return (
        <VersionCard
          version_id={version.id}
          project_id={version.project_id}
          name={version.name}
          description={version.description}
          username={version.username}
          project_url={version.project_url}
          getAllVersions={this.getAllVersions}
          key={i}
        />
      );
    });

    return (
      <div className={styles.cont}>
        <div className={styles.projectCard}>
          <div className={styles.icons_cont}>
            <div className={styles.dropdown_cont}>
              {!this.state.cardOpen ? (
                <i className="material-icons" onClick={() => this.toggleCard()}>
                  arrow_right
                </i>
              ) : (
                <i className="material-icons" onClick={() => this.toggleCard()}>
                  arrow_drop_down
                </i>
              )}
            </div>
            <div className={styles.otherIcons_cont}>
              <i onClick={() => this.toggleInvite()} className="material-icons">
                share
              </i>
              <i className="material-icons" onClick={() => this.toggleUpload()}>
                cloud_upload
              </i>
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
                onClick={() => deleteProject(project_id)}
              >
                delete
              </i>
            </div>
          </div>
          <div className={styles.project_cont}>
            <span>
              <span className={styles.label}>Project Name:</span> <br />
              {name}
            </span>
            <span>
              <span className={styles.label}>Last Edit:</span> <br />
              {description}
            </span>
            <span>
              <span className={styles.label}>Last Editted By:</span> <br /> @
              {this.props.username}
            </span>
          </div>
        </div>
        {this.state.cardOpen ? viewVersions : null}
        {this.state.editting ? <div>editting</div> : null}
        {this.state.inviting ? <Invite project_id={project_id} /> : null}
        {this.state.uploading ? (
          <UploadVersion
            project_id={project_id}
            name={name}
            description={description}
            username={username}
            project_url={project_url}
            getAllVersions={this.getAllVersions}
            getCurrVersionUsername={this.getCurrVersionUsername}
            reqProjects={this.props.reqProjects}
            toggleSuccess={this.toggleSuccess}
          />
        ) : null}
      </div>
    );
  }
}

export default ProjectCard;
