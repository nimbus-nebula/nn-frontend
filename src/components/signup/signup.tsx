import React from "react";
import { Footer } from "antd/es/layout/layout";
import "./signup.css";
import { Layout } from "antd";
import { RegistrationForm } from "./signup-components";
import {useCookies} from "react-cookie";
import PreventNav from "../PreventNav";

const logo: string = `${process.env.PUBLIC_URL}/nn-logo.svg`;
function SignUp() {
  const [cookies] = useCookies(["refreshToken"]);
  return (
      <div>
        <PreventNav
            targetPath="/dashboard"
            condition={!!cookies.refreshToken}
        />
        <Layout>
          <div className="signup-background">
            <div className="signup-page">
              <header className="header-title" data-testid="register-page-header">Create An Account</header>
              <RegistrationForm></RegistrationForm>
              <Footer className="page-footer">
                <div>
                  <img src={logo} className="footer-logo" alt="logo" />
                </div>
              </Footer>
            </div>
          </div>
        </Layout>
      </div>
  );
}

export default SignUp;
