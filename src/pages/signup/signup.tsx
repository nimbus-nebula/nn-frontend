import React from "react";
import {
  DataField,
  Link,
  PasswordField,
} from "../../components/global-components";
import { Footer } from "antd/es/layout/layout";
import "../../components/signup/signup.css";
import { Button, Form, Input, Radio } from "antd";
import { RegistrationForm } from "../../components/signup/signup-components";

function SubmitButton() {
  return (
    <input
      className="submit-button"
      type={"submit"}
      value={"Create"}
      onSubmit={OnCreate}
    />
  );
}

function OnCreate() {}
function SignUp() {
  // TODO: CSS for registration form
  // src: https://ant.design/components/form#components-form-demo-register
  return (
    <div className="signup background">
      <header>
        <div className="header" style={{ textAlign: "center" }}>
          Create An Account
        </div>
      </header>
      <body>
        <RegistrationForm></RegistrationForm>
        {/*<form className="form-signup">*/}
        {/*    <DataField Field="First Name" Page="SignUp"></DataField>*/}
        {/*    <DataField Field="Last Name" Page="SignUp"></DataField>*/}
        {/*    <Form.Item label="Email" required tooltip="This is a required field">*/}
        {/*        <Input placeholder="input placeholder" />*/}
        {/*    </Form.Item>*/}
        {/*    <PasswordField Header="Password" Page="SignUp"></PasswordField>*/}
        {/*    <PasswordField Header="Confirm Password" Page="SignUp"></PasswordField>*/}
        {/*</form>*/}
        {/*<Form.Item>*/}
        {/*    <Button type="primary">Submit</Button>*/}
        {/*</Form.Item>*/}
      </body>
      <Footer style={{ textAlign: "center" }}>
        Nimbus Nebula ©2023 Created by Software-Elites
      </Footer>
    </div>
  );
}

export default SignUp;
