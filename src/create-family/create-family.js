import React from "react";
import "./create-family.css";
import config from './../config'
import ChoreUpContext from './../choreUpContext'

export default class CreateFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyCode: {
        value: ""
      },
    };
  }

  static contextType = ChoreUpContext;

  makeFamilyCode(length=8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    fetch(`${config.API_Families_Enpoint}?code_to_join=${result}`,{
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.id === 'undefined'){
          this.setState({familyCode:{value:result}})
          this.createNewEntryInFamiliesTable()
          return result
        }else{
          this.makeFamilyCode()
        }
      })
  }

  createNewEntryInFamiliesTable(){
    fetch(`${config.API_Families_Enpoint}`,{
      method: "POST",
      body: JSON.stringify({
        admin:this.context.userId,
        code_to_join:this.state.familyCode.value
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      this.context.updateFamilyId(data.id)
      this.context.updateIsAdmin(true)
      this.createNewEntryInFamily_MembersTable(data.id)
    })
  }

  createNewEntryInFamily_MembersTable(familyId){
    fetch(`${config.API_Family_Members_Endpoint}`,{
      method: "POST",
      body: JSON.stringify({
        user_id: this.context.userId,
        family_id: familyId
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }

  componentDidMount(){
    this.makeFamilyCode()
  }

  render() {
    return (
      <>
        <h1>Created New Family</h1>
        <h2>Family Code</h2>
        <p>{this.state.familyCode.value}</p>
        <p>Please make note of the family code so that your family members can use the code to join your family</p>
        <button>Create Chores For Family Members</button>
        <br/>
        <button>Visit Management Page</button>
        <br/>
        <button>View Profile</button>
      </>
    );
  }
}
