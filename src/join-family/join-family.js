import React from "react";
import "./join-family.css";

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

  updateFamilyCode(e){
    return
  }

  validateFamilyCode(e){
    return
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
            onchange={(e) => this.updateFamilyCode(e.target.value)}
          />
          <br/>
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
