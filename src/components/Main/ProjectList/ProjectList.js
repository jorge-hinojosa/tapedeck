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
    // console.log(this.props);
    const { projects } = this.props.projects;
    const myFilteredProjects = projects.filter(
      project => project.shared === false
    );
    console.log(myFilteredProjects);
    const myProjectList = myFilteredProjects.map((project, i) => {
      const {
        project_id,
        name,
        description,
        latest_user,
        project_url,
        upload_date
      } = project;
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
    });

    const otherFilteredProjects = projects.filter(
      project => project.shared === true
    );
    const otherProjectList = otherFilteredProjects.map((project, i) => {
      const {
        project_id,
        name,
        description,
        latest_user,
        project_url,
        upload_date
      } = project;
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
    });
    console.log(myProjectList, otherProjectList);
    return (
      <div>
        {/* {loading ? <div>Loading</div> : null} */}
        <h2 className={styles.projectDivider}>My Projects:</h2> <br />
        {myProjectList.length === 0 ? (
          // ||
          // myProjectList[myProjectList.length - 1] === undefined ? (
          <NoProjects />
        ) : (
          myProjectList
        )}
        <h2 className={styles.projectDivider}>Shared Projects:</h2> <br />
        {otherProjectList.length === 0 ? (
          // ||
          // otherProjectList[otherProjectList.length - 1] === undefined ? (
          <NoProjects />
        ) : (
          otherProjectList
        )}
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
