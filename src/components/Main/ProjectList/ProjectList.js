import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { reqProjects } from "../../../ducks/projectReducer";
import ProjectCard from "./ProjectCard/ProjectCard";

class ProjectList extends Component {
  componentDidMount() {
    this.props.reqProjects();
  }
  delete = id => {
    console.log(id);
    axios
      .delete(`/api/project/${id}`)
      .then(res => {})
      .catch(err => console.log(err));
    this.props.reqProjects();
  };
  render() {
    console.log(this.props.projects.projects);
    const { projects } = this.props.projects;
    const projectList = projects.map(project => {
      const { id, name, description, author, project_url } = project;
      return (
        <ProjectCard
          id={id}
          name={name}
          description={description}
          author={author}
          project_url={project_url}
          delete={this.delete}
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
