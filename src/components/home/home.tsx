import React from "react";
import { Logo, Slogan } from "../global-components";
import "./home-components";
import { LogInForm } from "./home-components";
import {useCookies} from "react-cookie";
import PreventNav from "../PreventNav";

const divider: string = `${process.env.PUBLIC_URL}/section-div.svg`;

export function Home() {
  const [cookies] = useCookies(["refreshToken"]);
  return (
      <div>
        <PreventNav
            targetPath="/dashboard"
            condition={!!cookies.refreshToken}
        />
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
          <div className="login-form">
            <LogInForm></LogInForm>
          </div>
          </body>
        </div>
      </div>

  );
}

export default Home;
