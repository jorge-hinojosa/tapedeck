import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { reqProjects } from "../../../ducks/projectReducer";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./projectlist.module.scss";
import NoProjects from "./NoProjects";

class ProjectList extends Component {
  componentDidMount() {
    this.props.reqProjects();
  }
  delete = project_id => {
    console.log(project_id);
    axios
      .delete(`/api/project/${project_id}`)
      .then(res => {})
      .catch(err => console.log(err));

    this.props.reqProjects();
  };
  render() {
    const { projects } = this.props.projects;
    const myProjectList = projects.map((project, i) => {
      const {
        project_id,
        name,
        description,
        latest_user,
        project_url,
        upload_date,
        shared
      } = project;
      // console.log(latest_user);
      if (shared === false) {
        return (
          <ProjectCard
            project_id={project_id}
            name={name}
            description={description}
            username={latest_user}
            project_url={project_url}
            upload_date={upload_date}
            deleteProject={this.delete}
            reqProjects={this.props.reqProjects}
            successToast={this.props.successToast}
            errorToast={this.props.errorToast}
            key={i}
          />
        );
      }
    });

    const otherProjectList = projects.map((project, i) => {
      const {
        project_id,
        name,
        description,
        latest_user,
        project_url,
        upload_date,
        shared
      } = project;
      // console.log(latest_user);
      if (shared === true) {
        return (
          <ProjectCard
            project_id={project_id}
            name={name}
            description={description}
            username={latest_user}
            project_url={project_url}
            upload_date={upload_date}
            deleteProject={this.delete}
            reqProjects={this.props.reqProjects}
            successToast={this.successToast}
            errorToast={this.errorToast}
            key={i}
          />
        );
      }
    });
    return (
      <div>
        {/* {loading ? <div>Loading</div> : null} */}
        <h2 className={styles.projectDivider}>My Projects:</h2> <br />
        {myProjectList.length === 0 ? <NoProjects /> : myProjectList}
        <h2 className={styles.projectDivider}>Shared Projects:</h2> <br />
        {otherProjectList.length === 0 ? <NoProjects /> : otherProjectList}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};
export default connect(
  mapStateToProps,
  { reqProjects }
)(ProjectList);
