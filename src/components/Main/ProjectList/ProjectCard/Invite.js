import React, { Component } from "react";
import axios from "axios";
import styles from "./invite.module.scss";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

class Invite extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      searchResults: []
    };
  }
  handleChange = val => {
    this.setState({ input: val });
    this.handleSearch(val);
  };
  handleSearch = input => {
    axios
      .get(`./api/user?first_name=${input}`)
      .then(res => this.setState({ searchResults: res.data }))
      .catch(err => console.log(err));
  };
  inviteUser = user_id => {
    const { project_id } = this.props;
    axios
      .post("/api/user", { user_id, project_id })
      .then(res => {
        this.props.successToast();
      })
      .catch(err => {
        console.log(err);
        this.props.errorToast("Could not invite user, try again later.");
      });
  };
  render() {
    const viewSearchResults = this.state.searchResults.map(user => {
      return (
        <div className={styles.searchResult_cont}>
          <div
            className={styles.searchResult}
            onClick={() => this.inviteUser(user.id)}
          >
            <img src={user.image} alt={user.first_name} />
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <h4>{`@${user.username}`}</h4>
          </div>
        </div>
      );
    });
    return (
      <div className={styles.form}>
        <InputLabel>
          Enter name or username to invite user to project:
        </InputLabel>
        <Input onChange={e => this.handleChange(e.target.value)} />
        {viewSearchResults}
      </div>
    );
  }
}

export default Invite;
