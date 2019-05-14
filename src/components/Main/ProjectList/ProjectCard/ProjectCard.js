import React, { Component } from "react";
import styles from "./project-card.module.scss";
import axios from "axios";
import VersionCard from "./VersionCard/VersionCard";
import UploadVersion from "./UploadVersion";
import Invite from "./Invite";
import EditProject from "./EditProject";

class ProjectCard extends Component {
  constructor() {
    super();
    this.state = {
      versions: [],
      cardOpen: false,
      editting: false,
      inviting: false,
      uploading: false
      // loading: false
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
  // toggleLoading = () => {
  //   const { loading } = this.state;
  //   loading
  //     ? this.setState({ loading: false })
  //     : this.setState({ loading: true });
  // };
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
    // console.log(this.props);
    const {
      name,
      description,
      username,
      project_url,
      deleteProject,
      project_id,
      upload_date
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
          upload_date={version.upload_date}
          getAllVersions={this.getAllVersions}
          successToast={this.props.successToast}
          errorToast={this.props.errorToast}
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
                <span className={styles.projectName_cont}>
                  <i
                    className="material-icons"
                    onClick={() => this.toggleCard()}
                  >
                    arrow_right
                  </i>
                  {/* <span className={styles.label}>Project Name:</span> <br /> */}
                  <span className={styles.projectName}>{name}</span>
                </span>
              ) : (
                <span className={styles.projectName_cont}>
                  <i
                    className="material-icons"
                    onClick={() => this.toggleCard()}
                  >
                    arrow_drop_down
                  </i>
                  {/* <span className={styles.label}>Project Name:</span> <br /> */}
                  <span className={styles.projectName}>{name}</span>
                </span>
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
            <div className={styles.project_info_cont}>
              <div className={styles.label_cont}>
                <span className={styles.label}>Uploaded:</span>
              </div>
              <span className={styles.project_info}>{upload_date}</span>
            </div>
            <div className={styles.project_info_cont}>
              <div className={styles.label_cont}>
                <span className={styles.label}>Last Edit:</span>
              </div>
              <span className={styles.project_info}>{description}</span>
            </div>
            <div className={styles.project_info_cont}>
              <div className={styles.label_cont}>
                <span className={styles.label}>Last Editted By:</span>
              </div>
              <span className={styles.project_info}>
                @{this.props.username}
              </span>
            </div>
          </div>
        </div>
        {this.state.cardOpen ? viewVersions : null}
        {this.state.editting ? (
          <EditProject
            editting={this.state.editting}
            project_id={project_id}
            name={name}
            description={description}
            username={username}
            project_url={project_url}
            upload_date={upload_date}
            toggleEdit={this.toggleEdit}
            reqProjects={this.props.reqProjects}
            successToast={this.props.successToast}
            errorToast={this.props.errorToast}
          />
        ) : null}
        {this.state.inviting ? (
          <Invite
            project_id={project_id}
            successToast={this.props.successToast}
            errorToast={this.props.errorToast}
          />
        ) : null}
        {this.state.uploading ? (
          <UploadVersion
            project_id={project_id}
            name={name}
            description={description}
            username={username}
            project_url={project_url}
            upload_date={upload_date}
            getAllVersions={this.getAllVersions}
            getCurrVersionUsername={this.getCurrVersionUsername}
            reqProjects={this.props.reqProjects}
            uploading={this.state.uploading}
            toggleUpload={this.toggleUpload}
            toggleLoading={this.toggleLoading}
            successToast={this.props.successToast}
            errorToast={this.props.errorToast}
          />
        ) : null}
      </div>
    );
  }
}

export default ProjectCard;
