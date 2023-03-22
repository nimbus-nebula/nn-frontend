import React from "react";
import { DataField, Link, PasswordField } from "../global-components";
import { Footer } from "antd/es/layout/layout";
import "./signup.css";
import { Button, Form, Input, Layout, Radio } from "antd";
import { RegistrationForm } from "./signup-components";

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
        <Footer style={{ textAlign: "center" }}>
          Nimbus Nebula ©2023 Created by Software-Elites
        </Footer>
      </div>
    </Layout>
  );
}

export default SignUp;
