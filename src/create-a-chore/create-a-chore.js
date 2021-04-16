import React from "react";
import "./create-a-chore.css";
import ChoreUpContext from "./../choreUpContext";
import ValidationError from "./../validationError";
import config from "./../config";

export default class CreateAChore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
      comments: {
        value: "",
        touched: false,
      },
      reward: {
        value: 0,
        touched: false,
      },
      familyMembers: [],
      selectedFamilyMember: "",
    };
  }

  static contextType = ChoreUpContext;

  updateChoreName(name) {
    this.setState({
      name: {
        value: name,
        touched: true,
      },
    });
  }

  updateComments(comment) {
    this.setState({
      comments: {
        value: comment,
        touched: true,
      },
    });
  }

  updateReward(reward) {
    this.setState({
      reward: {
        value: reward,
        touched: true,
      },
    });
  }

  updateSelectedFamilyMember(familyMember) {
    this.setState({ selectedFamilyMember: familyMember });
  }

  validateChoreName() {
    const choreName = this.state.name.value.trim();
    if (choreName.length === 0) {
      return "Chore name is required";
    }
  }

  validateReward() {
    const reward = Number(this.state.reward.value.trim());
    if (reward % 10 !== 0) {
      return "Rewards must be a multiple of 10";
    }
  }

  getFamilyMembers() {
    fetch(`${config.API_Family_Members_Endpoint}/user/${this.context.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(
          `${config.API_Family_Members_Endpoint}/family/${data.family_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${config.BEARER_TOKEN}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({ familyMembers: data });
            if (data.length > 0) {
              this.setState({ selectedFamilyMember: data[0].id });
            }
          });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name.value.trim();
    const comments = this.state.comments.value.trim();
    const reward = this.state.reward.value;

    fetch(`${config.API_Chores_Endpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        name: name,
        comments: comments,
        value: reward,
        done: false,
      }),
    })
      .then((responsse) => responsse.json())
      .then((data) => {
        fetch(config.API_User_Chores_Endpoint, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${config.BEARER_TOKEN}`,
          },
          body: JSON.stringify({
            user_id: this.state.selectedFamilyMember,
            chore_id: data.id,
          }),
        });
        this.props.history.push("/successful-chore-creation");
      });
  }

  componentDidMount() {
    this.getFamilyMembers();
  }

  render() {
    let family_members;
    if (this.state.familyMembers.length === 0) {
      family_members = <option value={null}>No Family Members</option>;
    } else {
      family_members = this.state.familyMembers.map((member, index) => {
        return (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        );
      });
    }
    return (
      <>
        <main role="main" id="create-a-chore-page">
          <div className="chore-item">
            <header>
              <h1 id="chore-header">Create a new chore</h1>
            </header>
          </div>
          <section className="chore-item">
            <form id="chore-creator" onSubmit={(e) => this.handleSubmit(e)}>
              <section className="form-section overview-section">
                <label htmlFor="dream-title" className="chore-label">
                  Chore Name
                </label>
                <br />
                <input
                  type="text"
                  name="dream-title"
                  placeholder="Chore Name here"
                  required
                  onChange={(e) => {
                    this.updateChoreName(e.target.value);
                  }}
                  className="chore-input"
                />
                <small className="error">
                  {this.state.name.touched && (
                    <ValidationError message={this.validateChoreName()} />
                  )}
                </small>
              </section>
              <section className="form-section overview-section">
                <label htmlFor="dream-title" className="chore-label">
                  Comments
                </label>
                <br />
                <textarea
                  name="comments"
                  id="chore-text-area"
                  placeholder="Write comments here"
                  onChange={(e) => {
                    this.updateComments(e.target.value);
                  }}
                ></textarea>
              </section>
              <section className="form-section overview-section">
                <label htmlFor="dream-title" className="chore-label">
                  Reward
                </label>
                <br />
                <input
                  type="number"
                  name="dream-title"
                  placeholder="XP here"
                  required
                  onChange={(e) => {
                    this.updateReward(e.target.value);
                  }}
                  className="chore-input"
                />
                <small className="error">
                  {this.state.reward.touched && (
                    <ValidationError message={this.validateReward()} />
                  )}
                </small>
              </section>
              <section className="form-section overview-section">
                <label htmlFor="dream-title" className="chore-label">
                  Responsible
                </label>
                <br />
                <select
                  name="family_members"
                  id="chore-select"
                  value={this.state.selectedFamilyMember}
                  onChange={(e) => {
                    this.updateSelectedFamilyMember(e.target.value);
                  }}
                  required
                >
                  {family_members}
                </select>
              </section>
              <section className="chore-button-section">
                <button
                  type="submit"
                  className="submit-reset-btn"
                  disabled={this.validateChoreName() || this.validateReward()}
                >
                  Submit
                </button>
                <button type="reset" className="submit-reset-btn">
                  Reset
                </button>
              </section>
            </form>
          </section>
        </main>
      </>
    );
  }
}
