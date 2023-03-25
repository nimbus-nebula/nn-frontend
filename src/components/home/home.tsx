import React from "react";
// import "../../App.css";
import { Logo, Slogan } from "../global-components";
import "./home-components";
import { LogInForm } from "./home-components";
import "./home.css";

const divider: string = `${process.env.PUBLIC_URL}/section-div.svg`;

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
        </form>
      </body>
    </div>
  );
}

export default Home;
