import React from 'react'
import "./management.css"
import config from './../config'
import ChoreUpContext from './../choreUpContext'

export default class Management extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      familyMembers:[]
    }
  }

  static contextType = ChoreUpContext

  getFamilyMembers(){
    fetch(`${config.API_Family_Members_Endpoint}/user/${this.context.user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>{
        fetch(`${config.API_Family_Members_Endpoint}/family/${data.family_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${config.BEARER_TOKEN}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            this.setState({familyMembers:data})
          })
      })
  }

  componentDidMount(){
    this.getFamilyMembers()
  }

  render(){
    return(
      <>
        <main role="main">
          <h1>Family Management</h1>
          <h2>Members</h2>
          {/* Only admins of the family should be able to see this page and manage users
          Admins should be able to remove users */}
          <div id="members">
            {this.state.familyMembers.map((member,index) => {
              return (
                <div key={member.user_id} className="family_member">
                  <h4>{member.name}</h4>
                  <button>Kick</button>
                </div>
              )
            })}
          </div>
          <h2>Code to join family</h2>
          <h4>Current Code: ahw3j</h4>
          <button>Regenerate code</button>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}