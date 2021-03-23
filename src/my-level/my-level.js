import React from 'react'
import "./my-chores.css"

export default class MyLevel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <>
        <main role="main">
          <h2>Level 1</h2>
          <h3>XP till level up: 100</h3>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}