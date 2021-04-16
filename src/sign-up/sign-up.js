import React from "react";
import "./sign-up.css";
import ValidationError from "./../validationError";
import bcrypt from "bcryptjs";
import validator from "validator";
import config from "./../config";
import { Link } from "react-router-dom";
import ChoreUpContext from './../choreUpContext';

export default class SignUp extends React.Component {
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
      confirmPassword: {
        value: "",
        touched: false,
      },
      isEmailInDb: false,
      name:{
        value: "",
        touched: false,
      },
    };
  }

  static contextType = ChoreUpContext;

  updateEmail(email) {
    this.setState({
      email: { value: email, touched: true },
      isEmailInDb: false,
    });
  }

  updatePassword(password) {
    this.setState({ password: { value: password, touched: true } });
  }

  updateConfirmPassword(confirmPassword) {
    this.setState({
      confirmPassword: { value: confirmPassword, touched: true },
    });
  }

  updateName(name){
    this.setState({
      name: {value:name,touched:true}
    })
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
    /*
    ^                         Start anchor
    (?=.*[A-Z])               Ensure string has two uppercase letters.
    (?=.*[!@#$%^&*()-+_`~{}|/?.>,<[\]])(?=.*[0-9])(?=.*[a-z])Ensure string has one special case letter.
    (?=.*[0-9])               Ensure string has two digits.
    (?=.*[a-z])               Ensure string has three lowercase letters.
    .{8,}                     Ensure string is of at least length 8, replace the 8 with whatever value; , makes it atleast.
    $                         End anchor.
    */
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-+_`~{}|/?.>,<[\]])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (password.length === 0) {
      return "Password is required";
    } else if (password === this.state.email.value.trim()) {
      return "Password cannot be your email";
    } else if (!passwordRegex.test(password)) {
      return "Password does not meet the above requirements";
    }
  }

  validateConfirmPassword() {
    const password = this.state.password.value.trim();
    const confirmPassword = this.state.confirmPassword.value.trim();
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
  }

  validateName(){
    const name = this.state.name.value.trim();
    const nameRegex = /^[a-zA-Z]+$/
    //Regex checks to make sure that the name only contains letters
    if (name.length === 0){
      return "First name is required";
    }else if(!nameRegex.test(name)){
      return "First name must only contain letters"
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // bcrypt will be used to hash passwords
    // default number of salt rounds is 10
    // config used to store api keys
    // Check if the email provided is already associated with another account
    const name = this.state.name.value.trim();
    const email = this.state.email.value.trim();
    // Check if the provided email is associated with another account
    fetch(`${config.API_Users_Endpoint}?email=${email}`, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${config.BEARER_TOKEN}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.id === "undefined") {
          const password = this.state.password.value.trim();
          const rounds = 10; // number of salt rounds, by default its 10
          bcrypt.hash(password, rounds, (err, hash) => {
            if (err) {
              return;
            }
            fetch(config.API_Users_Endpoint, {
              method: "POST",
              body: JSON.stringify({
                name: name,
                level: 1,
                xp_till_level_up: 100,
                is_admin: false,
                email: email,
                hashed_password: hash,
              }),
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${config.BEARER_TOKEN}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                this.context.updateIsSignedIn(true);
                this.context.updateUserId(data.id)
                this.props.history.push('/join-or-create-family')
              });
          });
        } else {
          this.setState({ isEmailInDb: true });
        }
      });
  }

  render() {
    return (
      <>
        <div className="sign-on-container">
          <h2>Create an account</h2>
          <br/>
          <div id="form-container">
            <div id="form-section">
              <form
                className="signup-form"
                onSubmit={(e) => this.handleSubmit(e)}
              >
                <div className="form-group">
                <div className="form-field" id="user_name">
                    <div>
                      <i className="fa fa-user"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => this.updateName(e.target.value)}
                    />
                  </div>
                  <small className="error">
                    {this.state.name.touched && (
                      <ValidationError message = {this.validateName()} />
                    )}
                  </small>
                  <div className="form-field" id="email">
                    <div>
                      <i class="fas fa-envelope-square"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={(e) => this.updateEmail(e.target.value)}
                    />
                  </div>
                  <small className="error">
                    {this.state.email.touched && (
                      <ValidationError message={this.validateEmail()} />
                    )}
                    {this.state.isEmailInDb && (
                      <ValidationError message="The email entered is already associated with another account" />
                    )}
                  </small>

                  <div className="form-field" id="password">
                    <div>
                      <i className="fa fa-lock"></i>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter a strong password"
                      onChange={(e) => this.updatePassword(e.target.value)}
                    />
                  </div>
                  <small id="password-requirement">
                    Use 8 or more characters with a mix of upper & lower case letters, numbers &
                    symbols
                  </small>
                  <small className="error">
                    {this.state.password.touched && (
                      <ValidationError message={this.validatePassword()} />
                    )}
                  </small>
                  <div className="form-field" id="confirm-password">
                    <div>
                      <i className="fa fa-lock"></i>
                    </div>
                    <input
                      type="password"
                      placeholder="Reenter your password"
                      onChange={(e) =>
                        this.updateConfirmPassword(e.target.value)
                      }
                    />
                  </div>
                  <small className="error">
                    {this.state.confirmPassword.touched && (
                      <ValidationError
                        message={this.validateConfirmPassword()}
                      />
                    )}
                  </small>
                </div>
                <button
                  type="submit"
                  id="submit-btn"
                  disabled={
                    this.validateEmail() ||
                    this.validatePassword() ||
                    this.validateConfirmPassword()
                  }
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
