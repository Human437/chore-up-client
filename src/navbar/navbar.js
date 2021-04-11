import React from 'react'
import "./navbar.css"
import {Link} from "react-router-dom"
import ChoreUpContext from './../choreUpContext'

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  static contextType = ChoreUpContext

  render(){
    if(this.context.isSignedIn && this.context.isAdmin){
      return(
        <>
          <nav role="navigation">
            <Link to="/">Home</Link>
            <Link to= {`/my-chores/${this.context.userId}`}>My Chores</Link>
            <Link to= '/create-a-chore'>Create a Chore</Link>
            <Link to= '/management'>Management</Link>
            <Link to= {`/my-profile/${this.context.userId}`}>My Profile</Link>
            <button><Link to="/">Sign Out</Link></button>
          </nav>
        </>
      )
    }else if(this.context.isSignedIn){
      return(
        <>
          <nav role="navigation">
            <Link to="/">Home</Link>
            <Link to= {`/my-chores/${this.context.userId}`}>My Chores</Link>
            <Link to= {`/my-profile/${this.context.userId}`}>My Profile</Link>
            <button><Link to="/">Sign Out</Link></button>
          </nav>
        </>
      )
    }else{
      return(
        <>
          <nav role="navigation">
            <Link to="/">Home</Link>
            <button><Link to="/sign-in">Sign In</Link></button>
            <button><Link to="/sign-up">Sign Up</Link></button>
          </nav>
        </>
      )
    }
  }
}