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