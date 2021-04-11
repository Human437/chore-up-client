import React from "react";
import "./join-family.css";
import ValidationError from './../validationError'
import config from './../config'
import ChoreUpContext from './../choreUpContext'

export default class JoinFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyCode:{
        value: "",
        touched: false,
        familyCodeInDb: false,
      }
    };
  }

  static contextType = ChoreUpContext

  updateFamilyCode(familyCode){
    this.setState({
      familyCode:{
        value: familyCode,
        touched: true,
      },
      familyCodeInDb: true,
    })
  }

  validateFamilyCode(){
    const familyCode = this.state.familyCode.value.trim()
    if(familyCode.length === 0){
      return "Family code is required"
    }else if(familyCode.length > 8){
      return "Family codes are not longer than eight characters"
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const familyCode = this.state.familyCode.value.trim();
    fetch(`${config.API_Families_Enpoint}?code_to_join=${familyCode}`,{
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.id !== 'undefined'){
          this.context.updateFamilyId(data.id)
          fetch(`${config.API_Family_Members_Endpoint}`,{
            method: "POST",
            body: JSON.stringify({
              user_id: this.context.userId,
              family_id: data.id
            }),
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${config.BEARER_TOKEN}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              this.props.history.push('/successful-join')
            })
        }else{
          this.setState({familyCodeInDb:false})
        }
      })
  }

  render() {
    return (
      <>
        <h1>Join a Family</h1>
        <form
          id='join-family-form'
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Family Code"
            onChange={(e) => this.updateFamilyCode(e.target.value)}
          />
          <br/>
          <small className='error'>
            {this.state.familyCode.touched && (
              <ValidationError message={this.validateFamilyCode()}/>
            )}
            {!this.state.familyCodeInDb && this.state.familyCode.touched &&(
              <ValidationError message="The family code entered is not associated with any family"/>
            )}
          </small>
          <button
            type='submit'
            id='join-family-submit-btn'
            disabled={this.validateFamilyCode()}
          >
            Join Family
          </button>
        </form>
      </>
    );
  }
}
