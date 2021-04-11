import React from 'react'
import "./management.css"
import config from './../config'
import ChoreUpContext from './../choreUpContext'

export default class Management extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      familyMembers:[],
      familyCode:"not-set"
    }
  }

  static contextType = ChoreUpContext

  getFamilyMembers(){
    fetch(`${config.API_Family_Members_Endpoint}/user/${this.context.userId}`, {
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
            this.setState({familyMembers:data})
          })
      })
  }

  handleKickMember(e){
    const family_memberId = e.target.dataset.family_member
    const index = e.target.dataset.index
    let familyMembers = this.state.familyMembers
    familyMembers.splice(index,1)
    //uses e.target.dataset to access custom html attributes
    this.setState({familyMembers:familyMembers})
    fetch(`${config.API_Family_Members_Endpoint}/${family_memberId}`,{
      method:"DELETE",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
  }

  getFamilyCode(){
    fetch(`${config.API_Family_Members_Endpoint}/user/${this.context.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>{
        console.log(data)  
        fetch(`${config.API_Families_Enpoint}/${data.family_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${config.BEARER_TOKEN}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            this.setState({familyCode:data.code_to_join})
          })
      })
  }

  componentDidMount(){
    this.getFamilyMembers()
    this.getFamilyCode()
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
              // Doesn't show the admin family member as a member so the admin can't kick themself
              if(!member.is_admin){
                return (
                  <div key={member.user_id} className="family_member">
                    <h4>{member.name}</h4>
                    <button
                      data-index={index}
                      data-family_member={member.id}
                      onClick={(e) =>{this.handleKickMember(e)}}
                    >
                      Kick
                    </button>
                  </div>
                )
              }
            })}
          </div>
          <h2>Code to join family</h2>
          <h4>Current Code: {this.state.familyCode}</h4>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}