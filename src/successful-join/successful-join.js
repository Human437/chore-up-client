import React from "react";
import "./successful-join.css";
import ChoreUpContext from './../choreUpContext'

export default class SuccessfulJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = ChoreUpContext;

  render() {
    return (
      <>
        <h1>Successfully Joined Family</h1>
        <p>You admin will assign you chores. You will be rewarded with points and other rewards for successfully completing assigned chores.</p>
        <button>View My Chores</button>
        <br/>
        <button>View Profile</button>
      </>
    );
  }
}
