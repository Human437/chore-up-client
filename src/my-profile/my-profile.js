import React from "react";
import "./my-profile.css";
import config from "./../config";

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      level: null,
      xp_till_level_up: null,
    };
  }

  getUserInfo() {
    fetch(`${config.API_Users_Endpoint}/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          level: data.level,
          xp_till_level_up: data.xp_till_level_up,
        });
      });
  }

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    return (
      <>
        <main role="main" id="my-profile-page">
          <div id="my-info">
            <h1>Hello, {this.state.name}</h1>
            <h3>User Id: {this.state.id}</h3>
            <h3>Level: {this.state.level}</h3>
            <h3>XP till level up: {this.state.xp_till_level_up}</h3>
          </div>
        </main>
      </>
    );
  }
}
