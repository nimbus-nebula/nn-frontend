import React from "react";
import { DataField, Link, PasswordField } from "../global-components";
import { Footer } from "antd/es/layout/layout";
import "./signup.css";
import { Button, Form, Input, Layout, Radio } from "antd";
import { RegistrationForm } from "./signup-components";

const logo: string = `${process.env.PUBLIC_URL}/nn-logo.svg`;
function OnCreate() {}
function SignUp() {
  
  // TODO: CSS for registration form
  // src: https://ant.design/components/form#components-form-demo-register
  return (
    <Layout>
      <div className="signup background">
        <header>
          <div className="header" style={{ textAlign: "center" }}>
            Create An Account
          </div>
        </header>
        <body>
          <RegistrationForm></RegistrationForm>
        </body>
        <Footer className="page-footer">
          <div>
            <img src={logo} className="footer-logo" alt="logo"/>
          </div>
        </Footer>
      </div>
    </Layout>
  );
}

export default SignUp;
