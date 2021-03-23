import React from 'react'
import "./my-chores.css"
import {Link} from "react-router-dom"

export default class MyChores extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <>
        <nav role="navigation">
          <Link to="./../index.html">Home</Link>
          <Link to= './my-chores.html'>My Chores</Link>
          <Link to= './createAChore.html'>Create a Chore</Link>
          <Link to= './managementPage.html'>Management</Link>
          <button><Link to="./sign-in.html">Sign In</Link></button>
          <button><Link to="./sign-up.html">Sign Up</Link></button>
        </nav>
        <main role="main">
          <h2>Chores</h2>
          <ul>
            <li>Washing the dishes</li>
            <li>Making dinner</li>
            <li>Vacuum the carpet</li>
          </ul>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}