import React from 'react'
import "./successful-chore-creation.css"
import ChoreUpContext from './../choreUpContext'

export default class SuccessfulChoreCreation extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  static contextType = ChoreUpContext

  render(){
    return(
      <>
        <main role="main">
          <header>
            <h1>Successfully Created New Chore</h1>
          </header>
          <section>
            <button onChange={(e) => {this.props.history.push('/create-a-chore')}}>Create another chore</button>
            <button onChange={(e) => {this.props.history.push('/management')}}>Return to management page</button>
          </section>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}