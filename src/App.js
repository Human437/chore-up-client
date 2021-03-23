import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import ChoreUpContext from "./choreUpContext";
import CreateAChore from "./create-a-chore/create-a-chore";
import Management from "./management/management";
import MyChores from "./my-chores/my-chores";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";
import NavBar from './navbar/navbar';
import HomePage from './home-page/home-page'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ChoreUpContext.Provider value={{}}>
        <main>
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={HomePage} />
          <Route path="/my-chores" component={MyChores} />
          <Route path="/management" component={Management} />
          <Route path="/create-a-chore" component={CreateAChore} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
        </main>
      </ChoreUpContext.Provider>
    );
  }
}
