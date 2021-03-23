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
        <main role="main">
          <h2>Members</h2>
          {/* Only admins of the family should be able to see this page and manage users
          Admins should be able to remove users */}
          <ul>
            <li>Jack <button>Kick</button></li>
            <li>Jill <button>Kick</button></li>
            <li>Bob <button>Kick</button></li>
            <li>Jane <button>Kick</button></li>
            <li>Mary <button>Kick</button></li>
          </ul>
          <h2>Chores to be approved</h2>
          {/* Only admins should be able to approve chores that were completed */}
          <ul>
            <li>Walking the dog <button>Mark as Approved</button><button>Mark as Redo</button></li>
            <li>Washing the dishes <button>Mark as Approved</button><button>Mark as Redo</button></li>
            <li>Buying groceries <button>Mark as Approved</button><button>Mark as Redo</button></li>
          </ul>
          <h2>Code to join family</h2>
          <h4>Current Code: ahw3j</h4>
          <button>Regenerate code</button>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}