import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { reqUserData } from "../../ducks/userReducer";
import styles from "./main.module.scss";
import Nav from "./Nav/Nav";
import UserInfo from "./UserInfo/UserInfo";
import Uploader from "./Uploader/Uploader";
import ProjectList from "./ProjectList/ProjectList";

class Main extends Component {
  componentDidMount() {
    this.props.reqUserData();
  }
  logout = () => {
    axios
      .get("/auth/logout")
      .then(res => {})
      .catch(err => console.log(err));
  };
  render() {
    const {
      first_name,
      last_name,
      email,
      username,
      bio,
      image,
      location
    } = this.props.user;
    return (
      <div className={styles.background}>
        <Nav logout={this.logout} />
        <div className={styles.main_cont}>
          <UserInfo
            first_name={first_name}
            last_name={last_name}
            email={email}
            username={username}
            bio={bio}
            image={image}
            location={location}
          />
          <ProjectList />
          <Uploader />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  {
    reqUserData
  }
)(Main);
