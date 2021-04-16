import React from "react";
import "./my-chores.css";
import config from "./../config";

export default class MyChores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userChoresArray: [],
      userXP_til_level_up: 0,
      userLevel: 1,
    };
  }

  getUserChores() {
    fetch(
      `${config.API_User_Chores_Endpoint}/user/${this.props.match.params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.BEARER_TOKEN}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userChoresArray: data });
      });
  }

  getUser() {
    fetch(`${config.API_Users_Endpoint}/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userXP_til_level_up: data.xp_till_level_up,
          userLevel: data.level,
        });
      });
  }

  handleDone(e) {
    let userChoresArray = this.state.userChoresArray;
    const index = e.target.dataset.index;
    const chore_id = e.target.dataset.chore_id;
    const value = e.target.dataset.value;
    userChoresArray.splice(index, 1);
    this.setState({ userChoresArray: userChoresArray });
    fetch(`${config.API_Chores_Endpoint}/${chore_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        done: true,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    });
    let newXP_till_level_up = this.state.userXP_til_level_up - value;
    let newLevel;
    if (newXP_till_level_up <= 0) {
      newLevel = this.state.userLevel + 1;
      newXP_till_level_up = 100 - Math.abs(newXP_till_level_up);
    } else {
      newLevel = this.state.userLevel;
    }
    this.setState({
      userLevel: newLevel,
      userXP_til_level_up: newXP_till_level_up,
    });
    fetch(`${config.API_Users_Endpoint}/${this.props.match.params.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        level: newLevel,
        xp_till_level_up: newXP_till_level_up,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    });
  }

  componentDidMount() {
    this.getUserChores();
    this.getUser();
  }

  render() {
    let incompleteChores = 0;
    for (let i = 0; i < this.state.userChoresArray.length; i++) {
      if (!this.state.userChoresArray[i].done) {
        incompleteChores += 1;
      }
    }
    let choresHtml;
    if (this.state.userChoresArray.length === 0 || incompleteChores === 0) {
      choresHtml = <h2>There are currently no chores assigned to you.</h2>;
    } else {
      choresHtml = this.state.userChoresArray.filter(chore => !chore.done).map((chore, index) => {
        return (
          <div key={chore.chore_id} className="chores">
            <div className="chore-info">
              <h3>Chore: {chore.name}</h3>
              <h4>Value: {chore.value}</h4>
              <p>Comments: {chore.comments}</p>
            </div>
            <button
              data-index={index}
              data-chore_id={chore.chore_id}
              data-value={chore.value}
              onClick={(e) => {
                this.handleDone(e);
              }}
              className="done-btn"
            >
              Mark As Done
            </button>
          </div>
        );
      });
    }
    return (
      <>
        <main role="main" id="my-chores-page">
          <h1>Assigned Chores</h1>
          {choresHtml}
        </main>
      </>
    );
  }
}
