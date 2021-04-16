import React from "react";
import "./management.css";
import config from "./../config";
import ChoreUpContext from "./../choreUpContext";

export default class Management extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyMembers: [],
      familyCode: "not-set",
    };
  }

  static contextType = ChoreUpContext;

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
          });
      });
  }

  handleKickMember(e) {
    const family_memberId = e.target.dataset.family_member;
    const index = e.target.dataset.index;
    let familyMembers = this.state.familyMembers;
    familyMembers.splice(index, 1);
    //uses e.target.dataset to access custom html attributes
    this.setState({ familyMembers: familyMembers });
    fetch(`${config.API_Family_Members_Endpoint}/${family_memberId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    });
  }

  getFamilyCode() {
    fetch(`${config.API_Family_Members_Endpoint}/user/${this.context.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(`${config.API_Families_Enpoint}/${data.family_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${config.BEARER_TOKEN}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.setState({ familyCode: data.code_to_join });
          });
      });
  }

  componentDidMount() {
    if (this.context.isSignedIn && this.context.isAdmin) {
      this.getFamilyMembers();
      this.getFamilyCode();
    }
  }

  render() {
    if (this.context.isSignedIn && this.context.isAdmin) {
      return (
        <>
          <header>
            <h1 id="management-page-header">Family Management</h1>
          </header>
          <main role="main" id="management-page">
            <div className="management-item">
              <h2>Members</h2>
              {/* Only admins of the family should be able to see this page and manage users
              Admins should be able to remove users */}
              <div id="members">
                {this.state.familyMembers.map((member, index) => {
                  // Doesn't show the admin family member as a member so the admin can't kick themself
                  if (!member.is_admin) {
                    return (
                      <div key={member.user_id} className="family_member">
                        <div className="member-info">
                          <h4>Name: {member.name}</h4>
                          <h4>Level: {member.level}</h4>
                          <h4>XP Till Level Up: {member.xp_till_level_up}</h4>
                          <h4>Email: {member.email}</h4>
                        </div>
                        <button
                          data-index={index}
                          data-family_member={member.id}
                          onClick={(e) => {
                            this.handleKickMember(e);
                          }}
                          className="kick-btn"
                        >
                          Kick
                        </button>
                      </div>
                    );
                  }else{
                    return <h3 id="only-fam-member">You are the only family member</h3>
                  }
                })}
              </div>
            </div>
            <div className="management-item">
              <h2>Code to join family</h2>
              <h4 id="family-code">{this.state.familyCode}</h4>
            </div>
          </main>
        </>
      );
    } else {
      return (
        <>
          <h1>
            You must be signed in as a admin to view the family management page
          </h1>
        </>
      );
    }
  }
}
