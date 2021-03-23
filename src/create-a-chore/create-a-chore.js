import React from 'react'
import "./create-a-chore.css"
import {Link} from "react-router-dom"

export default class CreateAChore extends React.Component {
  constructor(props){
    super(props);
    this.state = {

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
                <input type="text" name="dream-title" placeholder="Chore Name here" required/>
              </section>
              <section class="form-section overview-section">
                <label for="dream-title">Due date</label>
                <input type="date" name="dream-title" required/>
              </section>
              <section class="form-section overview-section">
                <label for="status">Status</label>
                <select name = 'status' required>
                  <option value='new'>New</option>
                  <option value ='read'>Read</option>
                  <option value ='in process'>In Process</option>
                  <option value ='done'>Done</option>
                  <option value ='unable to complete'>Unable to complete</option>
                  <option value ='on hold'>On hold</option>
                </select>
              </section>
              <section class="form-section overview-section">
                <label for="dream-title">Comments</label>
                <textarea name ='comments' placeholder="Write comments here"></textarea>
              </section>
              <section class="form-section overview-section">
                <label for="dream-title">Reward</label>
                <input type="number" name="dream-title" placeholder="XP here" required/>
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