import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import ChoreUpContext from "./choreUpContext";
import CreateAChore from "./create-a-chore/create-a-chore";
import Management from "./management/management";
import MyChores from "./my-chores/my-chores";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";
import NavBar from "./navbar/navbar";
import HomePage from "./home-page/home-page";
import MyLevel from "./my-level/my-level";
import JoinOrCreateFamily from './join-or-create-family/join-or-create-family'
import JoinFamily from './join-family/join-family'
import CreateFamily from './create-family/create-family'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isAdmin: false,
      userId:null,
    };
  }

  updateIsSignedIn = (state) => {
    this.setState({ isSignedIn: state });
  };

  updateUserId = (id) => {
    this.setState({ userId: id });
  };

  updateIsAdmin = (state) => {
    this.setState({isAdmin: state})
  }

  render() {
    return (
      <ChoreUpContext.Provider 
      value={{
        isSignedIn: this.state.isSignedIn,
        isAdmin: this.state.isAdmin,
        userId: this.state.userId,
        updateIsSignedIn: this.updateIsSignedIn,
        updateIsAdmin: this.updateIsAdmin,
        updateUserId: this.updateUserId,
      }}>
        <main>
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={HomePage} />
          <Route path="/my-chores" component={MyChores} />
          <Route path="/management" component={Management} />
          <Route path="/create-a-chore" component={CreateAChore} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/my-level" component={MyLevel} />
          <Route path="/join-or-create-family" component={JoinOrCreateFamily}/>
          <Route path='/join-family' component={JoinFamily}/>
          <Route path='/create-family' component={CreateFamily}/>
        </main>
      </ChoreUpContext.Provider>
    );
  }
}
