import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { reqProjects } from "../../../ducks/projectReducer";
import ProjectCard from "./ProjectCard/ProjectCard";

class ProjectList extends Component {
  componentDidMount() {
    this.props.reqProjects();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   this.props.reqProjects();
  // }
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
    const projectList = projects.map((project, i) => {
      const {
        project_id,
        name,
        description,
        latest_user,
        project_url
      } = project;
      console.log(latest_user);
      return (
        <ProjectCard
          project_id={project_id}
          name={name}
          description={description}
          username={latest_user}
          project_url={project_url}
          deleteProject={this.delete}
          reqProjects={this.props.reqProjects}
          key={i}
        />
      );
    });
    return <div>{projectList}</div>;
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
