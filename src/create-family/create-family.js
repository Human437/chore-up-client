import React from "react";
import "./create-family.css";

export default class CreateFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeFamilyCode(length=8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  handleSubmit(e){
    e.preventDefault()
  }

  render() {
    return (
      <>
        <h1>Created New Family</h1>
        <h2>Family Code</h2>
        <p>{this.makeFamilyCode()}</p>
        <p>Please make note of the family code so that your family members can use the code to join your family</p>
      </>
    );
  }
}
