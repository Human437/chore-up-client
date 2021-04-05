import React from "react";
import "./join-or-create-family.css";

export default class JoinOrCreateFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Join or Create a Family</h1>
        <button 
          id="create-a-family-btn"
          onClick={(e) => this.props.history.push('/create-family')}
        >
          Create a Family
        </button>
        <br />
        <button
          id="join-a-family-btn"
          onClick={(e) => this.props.history.push('/join-family')}
        >
          Join a Family
        </button>
      </>
    );
  }
}
