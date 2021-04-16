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
          <section>
            <header id="landing-page-h2">
              <h2>Keeping track of chores, so you don't have to</h2>
            </header>
          </section>
        </main>
      </>
    );
  }
}
