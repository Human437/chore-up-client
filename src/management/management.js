import React from 'react'
import "./management.css"
import {Link} from "react-router-dom"

export default class Management extends React.Component {
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
          <h2>Members</h2>
          {/* Only admins of the family should be able to see this page and manage users
          Admins should be able to remove users */}
          <ul>
            <li>Jack</li>
            <li>Jill</li>
            <li>Bob</li>
            <li>Jane</li>
            <li>Mary</li>
          </ul>
          <h2>Chores to be approved</h2>
          {/* Only admins should be able to approve chores that were completed */}
          <ul>
            <li>Walking the dog</li>
            <li>Washing the dishes</li>
            <li>Buying groceries</li>
          </ul>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}