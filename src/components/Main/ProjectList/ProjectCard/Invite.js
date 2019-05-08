import React, { Component } from "react";
import axios from "axios";

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
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    const viewSearchResults = this.state.searchResults.map(user => {
      return (
        <h2 onClick={() => this.inviteUser(user.id)}>
          {`${user.first_name} ${user.last_name}`}
        </h2>
      );
    });
    console.log(this.state.searchResults);
    return (
      <div>
        <input
          placeholder="Enter name to invite to project"
          onChange={e => this.handleChange(e.target.value)}
        />
        {viewSearchResults}
      </div>
    );
  }
}

export default Invite;
