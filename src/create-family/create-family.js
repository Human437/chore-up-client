import React from "react";
import "./create-family.css";
import config from './../config'

export default class CreateFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyCode: {
        value: ""
      }
    };
  }

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
          return result
        }else{
          this.makeFamilyCode()
        }
      })
  }

  componentDidMount(){
    this.makeFamilyCode()
  }

  handleSubmit(e){
    e.preventDefault()
  }

  render() {
    return (
      <>
        <h1>Created New Family</h1>
        <h2>Family Code</h2>
        <p>{this.state.familyCode.value}</p>
        <p>Please make note of the family code so that your family members can use the code to join your family</p>
      </>
    );
  }
}
