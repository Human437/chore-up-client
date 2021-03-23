import React from 'react'
import "./home-page.css"

export default class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <>
        <main role="main">
          <header role="banner">
            <h1>Chore Up</h1>
          </header>
          <section>
            <header>
                <h3>Keeping track of chores</h3>
            </header>
            <p>[<em>placeholder img of chore app</em>]</p>
            <p>Know exactly who is assigned what chore and the status of the chore</p>
          </section>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}