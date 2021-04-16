import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import ChoreUpContext from "./../choreUpContext";
import Favicon from "./../images/signOn/android-chrome-512x512.png";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = ChoreUpContext;

  handleSignOut() {
    this.context.updateIsSignedIn(false);
    this.context.updateUserId(null);
    this.context.updateIsAdmin(false);
    this.context.updateFamilyId(null);
    this.context.updateIsAlreadyAdminOfAFamily(false);
    this.context.updateFamilyCode("");
  }

  navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    if (window.innerWidth <= 768) {
      //Toggle Nav
      nav.classList.toggle("nav-active");

      //Animate Links
      navLinks.forEach((link, index) => {
        //Good way to add delay based on the index of the items in the nav
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });

      //Burger Animation
      burger.classList.toggle("toggle");
    }
  };

  render() {
    if (this.context.isSignedIn && this.context.isAdmin) {
      return (
        <>
          <nav role="navigation">
            <div class="logo">
              <Link to="/" id="chore-up-logo">
                <img
                  src={Favicon}
                  alt="up arrow icon"
                  id="nav-icon"
                  width="35px"
                />
              </Link>
            </div>
            <ul className="nav-links">
              <li>
                <Link to={`/my-chores/${this.context.userId}`}>My Chores</Link>
              </li>
              <li>
                <Link to="/create-a-chore">Create a Chore</Link>
              </li>
              <li>
                <Link to="/management">Management</Link>
              </li>
              <li>
                <Link to={`/my-profile/${this.context.userId}`}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={(e) => {
                    this.handleSignOut();
                  }}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
            <div class="burger">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
            </div>
          </nav>
        </>
      );
    } else if (this.context.isSignedIn) {
      return (
        <>
          <nav role="navigation">
            <div class="logo">
              <Link to="/" id="chore-up-logo">
                <img
                  src={Favicon}
                  alt="up arrow icon"
                  id="nav-icon"
                  width="35px"
                />
              </Link>
            </div>
            <ul className="nav-links">
              <li>
                <Link to={`/my-chores/${this.context.userId}`}>My Chores</Link>
              </li>
              <li>
                <Link to={`/my-profile/${this.context.userId}`}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={(e) => {
                    this.handleSignOut();
                  }}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
            <div class="burger">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
            </div>
          </nav>
        </>
      );
    } else {
      return (
        <>
          <nav role="navigation">
            <div class="logo">
              <Link to="/" id="chore-up-logo">
                <img
                  src={Favicon}
                  alt="up arrow icon"
                  id="nav-icon"
                  width="35px"
                />
              </Link>
            </div>
            <ul className="nav-links" onClick={this.navSlide}>
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </ul>
            <div class="burger" onClick={this.navSlide}>
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
            </div>
          </nav>
        </>
      );
    }
  }
}
