import React from 'react'
import "./create-a-chore.css"
import ChoreUpContext from './../choreUpContext'
import ValidationError from './../validationError'

export default class CreateAChore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:{
        value:"",
        touched:false
      },
      comments:{
        value:"",
        touched:false
      },
      reward:{
        value:0,
        touched:false
      }
    }
  }

  static contextType = ChoreUpContext

  updateChoreName(name){
    this.setState({
      name:{
        value:name,
        touched:true
      }
    })
  }

  updateComments(comment){
    this.setState({
      comments:{
        value:comment,
        touched:true
      }
    })
  }

  updateReward(reward){
    this.setState({
      reward:{
        value:reward,
        touched:true
      }
    })
  }

  validateChoreName(){
    const choreName = this.state.name.value.trim();
    if (choreName.length === 0){
      return "Chore name is required"
    }
  }

  // validateComments(){
  //   const comments = this.state.comments.value.trim();
  //   if (comments.length === 0){
  //     return ""
  //   }
  // }

  validateReward(){
    const reward = this.state.reward.value.trim()
    if (reward%10 !== 0){
      return "Rewards must be a multiple of 10"
    }
  }

  render(){
    return(
      <>
        <main role="main">
          <header>
            <h1>Create a new chore</h1>
          </header>
          <section>
            <form id="chore-creator">
              <section class="form-section overview-section">
                <label for="dream-title">Chore Name</label>
                <input 
                  type="text" 
                  name="dream-title" 
                  placeholder="Chore Name here" 
                  required
                  onChange={(e) =>{this.updateChoreName(e.target.value)}}
                />
                <small></small>
              </section>
              <section class="form-section overview-section">
                <label for="dream-title">Comments</label>
                <textarea 
                  name ='comments' 
                  placeholder="Write comments here"
                  onChange={(e) => {this.updateComments(e.target.value)}}
                ></textarea>
              </section>
              <section class="form-section overview-section">
                <label for="dream-title">Reward</label>
                <input 
                  type="number" 
                  name="dream-title" 
                  placeholder="XP here" 
                  required
                  onChange={(e) => {this.updateReward(e.target.value)}}
                />
              </section>
              <section class="button-section">
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
              </section>

            </form>
          </section>
        </main>
        <footer role="content-info">Footer</footer>
      </>
    )
  }
}