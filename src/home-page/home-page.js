import React from "react";
import "./home-page.css";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <main role="main" id="landing-page">
          <header role="banner">
            <h1 id="landing-page-h1">Chore Up</h1>
          </header>
          <h2 id='landing-summary'>Sign up, create a family and share your code to start assigning chores to family members. Earn rewards on chore completion!</h2>
        </main>
      </>
    );
  }
}
