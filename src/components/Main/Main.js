import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { reqUserData } from "../../ducks/userReducer";
import styles from "./main.module.scss";
import Nav from "./Nav/Nav";
import UserInfo from "./UserInfo/UserInfo";
import Uploader from "./Uploader/Uploader";
import ProjectList from "./ProjectList/ProjectList";
import Settings from "./Settings/Settings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      settings: false
    };
  }
  componentDidMount() {
    this.props.reqUserData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.settings !== this.state.settings) {
      this.props.reqUserData();
    }
  }
  logout = () => {
    axios
      .get("/auth/logout")
      .then(res => {})
      .catch(err => console.log(err));
  };
  toggleSettings = () => {
    if (this.state.settings === false) {
      this.setState({ settings: true });
    } else if (this.state.settings === true) {
      this.setState({ settings: false });
    }
  };
  successToast = () => {
    toast.success("Success!");
  };
  errorToast = str => {
    toast.error(str);
  };

  render() {
    const {
      id,
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
          {/* <Snackbar /> */}
          <Uploader
            toggleSettings={this.toggleSettings}
            successToast={this.successToast}
            errorToast={this.errorToast}
            username={username}
            reqUserData={this.props.reqUserData}
          />
          <UserInfo
            first_name={first_name}
            last_name={last_name}
            email={email}
            username={username}
            bio={bio}
            image={image}
            location={location}
          />
          {this.state.settings ? (
            <Settings
              id={id}
              settings={this.state.settings}
              toggleSettings={this.toggleSettings}
              first_name={first_name}
              last_name={last_name}
              email={email}
              username={username}
              bio={bio}
              image={image}
              location={location}
              reqUserData={this.props.reqUserData}
              successToast={this.successToast}
              errorToast={this.errorToast}
            />
          ) : null}
          <ProjectList
            successToast={this.successToast}
            errorToast={this.errorToast}
          />
          <ToastContainer
            autoClose={4000}
            position={toast.POSITION.BOTTOM_RIGHT}
          />
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
