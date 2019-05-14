import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styles from "./welcome.module.scss";
import axios from "axios";

import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      loggedIn: false,
      account: false,
      redirect: false
    };
  }

  handleFirstNameChange = val => this.setState({ first_name: val });
  handleLastNameChange = val => this.setState({ last_name: val });
  handleEmailChange = val => this.setState({ email: val });
  handleUsernameChange = val => this.setState({ username: val });
  handlePasswordChange = val => this.setState({ password: val });

  hasAccount = () => {
    if (this.state.account === false) {
      this.setState({ account: true });
    }
  };
  signUp = () => {
    const { first_name, last_name, email, username, password } = this.state;
    axios
      .post("/auth/signup", {
        first_name,
        last_name,
        email,
        username,
        password
      })
      .then(res => {
        console.log(res);
        if (res.data.username) {
          this.setState({
            loggedIn: true,
            redirect: true
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.errorToast("Error. Please check and fill all input fields.");
      });
  };
  login = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then(res => {
        if (res.data.username) {
          this.setState({
            loggedIn: true,
            redirect: true
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.errorToast("Incorrect username or password, please try again.");
      });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/main" />;
    }
  };
  errorToast = str => {
    toast.error(str);
  };
  render() {
    return (
      <div className={styles.welcomeCont}>
        <div className={styles.background}>
          <h1>
            {/* <img
              src="https://image.flaticon.com/icons/png/512/1789/1789303.png"
              alt="TapeDeck"
            /> */}
            T A P E D E C K
          </h1>
          <ToastContainer
            autoClose={4000}
            position={toast.POSITION.BOTTOM_LEFT}
          />
          {this.state.account === false ? (
            <div className={styles.login}>
              First Name:{" "}
              <input
                onChange={e => this.handleFirstNameChange(e.target.value)}
                type="text"
                placeholder="Lars"
              />{" "}
              <br />
              Last Name:{" "}
              <input
                onChange={e => this.handleLastNameChange(e.target.value)}
                type="text"
                placeholder="Ulrich"
              />{" "}
              <br />
              Email :{" "}
              <input
                onChange={e => this.handleEmailChange(e.target.value)}
                type="text"
                placeholder="drummerboi@metallica.com"
              />{" "}
              <br />
              Username:{" "}
              <input
                onChange={e => this.handleUsernameChange(e.target.value)}
                type="text"
                placeholder="@napstersux"
              />{" "}
              <br />
              Password:{" "}
              <input
                onChange={e => this.handlePasswordChange(e.target.value)}
                type="password"
              />{" "}
              <br />
              <Button className={styles.Button} onClick={this.signUp}>
                Sign-up
              </Button>{" "}
              <br />
              {this.renderRedirect()}
              Already have an account?
              <br /> <br />
              <Button className={styles.Button} onClick={this.hasAccount}>
                Login
              </Button>{" "}
            </div>
          ) : (
            <div className={styles.login}>
              Username:{" "}
              <input
                onChange={e => this.handleUsernameChange(e.target.value)}
                type="text"
                placeholder="user123"
              />{" "}
              <br />
              Password:{" "}
              <input
                onChange={e => this.handlePasswordChange(e.target.value)}
                type="password"
              />{" "}
              <br />
              <Button
                className={styles.Button}
                onClick={this.login}
                type="submit"
              >
                Login
              </Button>{" "}
              {this.renderRedirect()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Welcome;
