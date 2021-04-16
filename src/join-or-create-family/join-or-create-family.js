import React from "react";
import "./join-or-create-family.css";
import ChoreUpContext from "./../choreUpContext";
import config from "./../config";

export default class JoinOrCreateFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = ChoreUpContext;

  handleCreateFamilyBtn() {
    this.context.updateIsAdmin(true);
    fetch(`${config.API_Users_Endpoint}/${this.context.userId}`, {
      method: "PATCH",
      body: JSON.stringify({
        is_admin: true,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    });
    this.props.history.push("/create-family");
  }

  render() {
    return (
      <>
        <main id="join-create-family-page">
          <h1 id="join-create-family-header">Join or Create a Family</h1>
          <button
            id="create-a-family-btn"
            onClick={() => this.handleCreateFamilyBtn()}
          >
            Create a Family
          </button>
          <br />
          <button
            id="join-a-family-btn"
            onClick={() => this.props.history.push("/join-family")}
          >
            Join a Family
          </button>
        </main>
      </>
    );
  }
}
