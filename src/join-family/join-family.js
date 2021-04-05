import React from "react";
import "./join-family.css";
import ValidationError from './../validationError'

export default class JoinFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyCode:{
        value: "",
        touched: false
      }
    };
  }

  updateFamilyCode(familyCode){
    this.setState({
      familyCode:{
        value: familyCode,
        touched: true
      }
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
