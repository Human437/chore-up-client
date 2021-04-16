import React from "react";
import "./create-family.css";
import config from "./../config";
import ChoreUpContext from "./../choreUpContext";

export default class CreateFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyCode: {
        value: "",
      },
    };
  }

  static contextType = ChoreUpContext;

  makeFamilyCode(length = 8) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    fetch(`${config.API_Families_Enpoint}?code_to_join=${result}`, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.id === "undefined") {
          this.setState({ familyCode: { value: result } });
          this.context.updateFamilyCode(result);
          this.createNewEntryInFamiliesTable(result);
          return result;
        } else {
          this.makeFamilyCode();
        }
      });
  }

  createNewEntryInFamiliesTable(code) {
    fetch(`${config.API_Families_Enpoint}`, {
      method: "POST",
      body: JSON.stringify({
        admin: this.context.userId,
        code_to_join: code,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.context.updateFamilyId(data.id);
        this.context.updateIsAdmin(true);
        this.createNewEntryInFamily_MembersTable(data.id);
      });
  }

  createNewEntryInFamily_MembersTable(familyId) {
    fetch(`${config.API_Family_Members_Endpoint}`, {
      method: "POST",
      body: JSON.stringify({
        user_id: this.context.userId,
        family_id: familyId,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      },
    });
  }

  componentDidMount() {
    if (!this.context.isAlreadyAdminOfAFamily) {
      this.makeFamilyCode();
      this.context.updateIsAlreadyAdminOfAFamily(true);
    }
  }

  render() {
    let familyCode;
    if (this.state.familyCode.value === "") {
      familyCode = this.context.familyCode;
    } else {
      familyCode = this.state.familyCode.value;
    }
    return (
      <>
        <main id="create-family-page">
          <h1>Created New Family</h1>
          <h2>Family Code</h2>
          <h3 id="created-family-code">{familyCode}</h3>
          <h4>
            Please make note of the family code so that your family members can
            use the code to join your family
          </h4>
          <br />
          <div id="created-family-btn-container">
            <button
              className="created-family-btn"
              onClick={() => this.props.history.push(`/create-a-chore`)}
            >
              Create a Chore
            </button>
            {/* <br/> */}
            <button
              className="created-family-btn"
              onClick={() => this.props.history.push(`/management`)}
            >
              Visit Management Page
            </button>
            {/* <br/> */}
            <button
              className="created-family-btn"
              onClick={() =>
                this.props.history.push(`/my-chores/${this.context.userId}`)
              }
            >
              View My Chores
            </button>
            {/* <br/> */}
            <button
              className="created-family-btn"
              onClick={() =>
                this.props.history.push(`/my-profile/${this.context.userId}`)
              }
            >
              View Profile
            </button>
          </div>
        </main>
      </>
    );
  }
}
