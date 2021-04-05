import React from 'react'
import "./join-or-create-family.css"

export default class JoinOrCreateFamily extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <>
        <h1>Join or Create a Family</h1>
        <button>Create a Family</button>
        <br/>
        <button>Join a Family</button>
      </>
    )
  }
}