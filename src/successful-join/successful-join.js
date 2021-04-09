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
        <button
          onClick = {this.props.history.push(`/my-chores/${this.context.userId}`)}
        >
          View My Chores
        </button>
        <br/>
        <button
          onClick = {this.props.history.push(`/my-profile/${this.context.userId}`)}
        >
          View Profile
        </button>
      </>
    );
  }
}
