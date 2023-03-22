import React from "react";
import "../../App.css";
import {
  Logo,
  Slogan,
  DataField,
  Link,
  PasswordField,
} from "../global-components";
import "./home-components";
import { LogInForm } from "./home-components";

const divider: string = `${process.env.PUBLIC_URL}/section-div.svg`;

function SubmitButton() {
  return (
    <input
      className="submit-button"
      type={"submit"}
      value={"Log In"}
      onSubmit={OnLogin}
    />
  );
}

function OnLogin() {}

function Home() {
  return (
    <div className="home">
      <header></header>
      <body className="app-header">
        <div className="logo-section">
          <Logo></Logo>
          <Slogan></Slogan>
        </div>
        <div className="section-divider">
          <img src={divider} className="section-divider" alt="logo" />
        </div>
        <form className="login-form">
          <LogInForm></LogInForm>
          <Link Href="/signup" Text="Create An Account"></Link>
        </form>
      </body>
    </div>
  );
}

export default Home;
