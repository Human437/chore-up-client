import React from 'react'
import "./navbar.css"
import {Link} from "react-router-dom"

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <>
        <nav role="navigation">
          <Link to="/">Home</Link>
          <Link to= '/my-chores'>My Chores</Link>
          <Link to= '/create-a-chore'>Create a Chore</Link>
          <Link to= '/management'>Management</Link>
          <button><Link to="/sign-in">Sign In</Link></button>
          <button><Link to="/sign-up">Sign Up</Link></button>
        </nav>
      </>
    )
  }
}