import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import UserForm from "./components/Form";

class App extends Component {
  state = {
    
     repos: null,
    followers:'',
    following:'',
    
  }
  getUser = (e) => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    if (user) {
      axios.get(`https://api.github.com/users/${user}`)
      .then((res) => {
        const repos = res.data.public_repos;
        const followers = res.data.followers;
        const following= res.data.following;
        this.setState({ repos, followers, following });
      })
    } else return;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HTTP Calls using Axios in React</h1>
        </header>
        <UserForm getUser={this.getUser} />
        { this.state.repos ? <p> Total Number of repos: { this.state.repos }</p> : <p>Please enter a username.</p> }
        { this.state.followers ? <p>Followers: { this.state.followers }</p> : <p>No followers</p> }
        { this.state.following ? <p>Following: { this.state.following }</p> : <p>Not Following anyone</p> }
      </div>
    );
  }
};

export default App;
