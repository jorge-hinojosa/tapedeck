import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styles from "./welcome.module.scss";
import axios from "axios";

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
      });
  };
  login = () => {
    const { username, password } = this.state;
    axios.post("/auth/login", { username, password }).then(res => {
      console.log(res);
      if (res.data.username) {
        this.setState({
          loggedIn: true,
          redirect: true
        });
      }
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/main" />;
    }
  };
  render() {
    return (
      <div className={styles.welcomeCont}>
        <div className={styles.imgCont}>
          <img src="https://via.placeholder.com/900x937" alt="person" />
        </div>
        <div className={styles.background}>
          <h1>TapeDeck</h1>
          {this.state.account === false ? (
            <div className={styles.login}>
              First Name:{" "}
              <input
                onChange={e => this.handleFirstNameChange(e.target.value)}
                type="text"
                placeholder="Jorge"
              />{" "}
              <br />
              Last Name:{" "}
              <input
                onChange={e => this.handleLastNameChange(e.target.value)}
                type="text"
                placeholder="Hinojosa"
              />{" "}
              <br />
              Email :{" "}
              <input
                onChange={e => this.handleEmailChange(e.target.value)}
                type="text"
                placeholder="user@email.com"
              />{" "}
              <br />
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
              <button onClick={this.signUp}>Sign-up</button> <br />
              {this.renderRedirect()}
              Already have an account?
              <button onClick={this.hasAccount}>Login</button>{" "}
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
              <button onClick={this.login} type="submit">
                Login
              </button>{" "}
              {this.renderRedirect()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Welcome;