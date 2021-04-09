import React from 'react'
import "./my-chores.css"
import config from "./../config"

export default class MyChores extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userChoresArray:[],
    }
  }

  getUserChores(){
    fetch(`${config.API_User_Chores_Endpoint}/user/${this.props.match.params.id}`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({userChoresArray:data})
    })
  }

  componentDidMount(){
    this.getUserChores()
  }

  render(){
    return(
      <>
        <main role="main">
          <h1>Assigned Chores</h1>
          {this.state.userChoresArray.map((chore,index) => {
            return (
              <div key={chore.chore_id} className='chores'>
                <h3>Task: {chore.name}</h3>
                <h4>Value: {chore.value}</h4>
                <p>Comments: {chore.comments}</p>
                <button>Mark As Done</button>
              </div>
            )
          })}
        </main>
      </>
    )
  }
}