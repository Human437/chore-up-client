import React from "react";
import "./sign-in.css";
import bcrypt from "bcryptjs";
import validator from "validator";
import ValidationError from "./../validationError";
import config from "./../config";
import { Link } from "react-router-dom";
import ChoreUpContext from "./../choreUpContext";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        touched: false,
      },
      password: {
        value: "",
        touched: false,
      },
      isEmailInDb: true,
      isPasswordCorrect: true,
    };
  }

  static contextType = ChoreUpContext;

  updateEmail(email) {
    this.setState({
      email: { value: email, touched: true },
      isEmailInDb: true,
    });
  }

  updatePassword(password) {
    this.setState({
      password: { value: password, touched: true },
      isPasswordCorrect: true,
    });
  }

  validateEmail() {
    const email = this.state.email.value.trim();
    if (email.length === 0) {
      return "Email is required";
    } else if (!validator.isEmail(email)) {
      return "Please enter a valid email address";
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return "Password is required";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email.value.trim();
    fetch(`${config.API_Users_Endpoint}?email=${email}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.id !== "undefined") {
          const hash = json.hashed_password;
          const enteredPassword = this.state.password.value.trim();
          bcrypt.compare(enteredPassword, hash, (err, res) => {
            if (err) {
              console.error(err);
              return;
            }
            if (res) {
              this.context.updateIsSignedIn(true);
              this.context.updateUserId(json.id);
              fetch(`${config.API_Family_Members_Endpoint}/user/${json.id}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${config.BEARER_TOKEN}`,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  this.context.updateFamilyId(data.family_id);
                });
              if (json.is_admin) {
                this.context.updateIsAdmin(true);
                this.props.history.push("/management");
              } else {
                this.props.history.push(`/my-chores/${json.id}`);
              }
            } else {
              this.setState({ isPasswordCorrect: false });
            }
          });
        } else {
          this.setState({ isEmailInDb: false });
        }
      });
  }

  render() {
    return (
      <>
        <div className="sign-on-container">
          <h2>Sign in to your account</h2>
          <br></br>
          <div id="form-container">
            <div id="form-section">
              <form
                className="signup-form"
                onSubmit={(e) => {
                  this.handleSubmit(e);
                }}
              >
                <div className="form-group">
                  <div className="form-field" id="email">
                    <div>
                      <i className="fa fa-user"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={(e) => this.updateEmail(e.target.value)}
                      className="sign-on-input"
                    />
                  </div>
                  <small className="error">
                    {this.state.email.touched && (
                      <ValidationError message={this.validateEmail()} />
                    )}
                    {!this.state.isEmailInDb && (
                      <ValidationError message="The email entered is not associated with any account" />
                    )}
                  </small>
                  <div className="form-field" id="password">
                    <div>
                      <i className="fa fa-lock"></i>
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => this.updatePassword(e.target.value)}
                      className="sign-on-input"
                    />
                  </div>
                  <small className="error">
                    {this.state.password.touched && (
                      <ValidationError message={this.validatePassword()} />
                    )}
                    {!this.state.isPasswordCorrect && (
                      <ValidationError message="The password entered is incorrect" />
                    )}
                  </small>
                </div>
                <button
                  type="submit"
                  id="submit-btn"
                  disabled={this.validateEmail() || this.validatePassword()}
                >
                  Sign In
                </button>
                <div id="register-text">
                  <small>
                    Don't have an account?
                    <Link to="/sign-up">
                      <span>Register</span>
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
