import React from "react";
import {
  DataField,
  Link,
  PasswordField,
} from "../../components/global-components";

function SignUp() {
  // TODO: readjust the fields positions
  return (
    <div className="signup">
      <header className="app-header">
        <form className="login-form">
          <DataField Field="First Name"></DataField>
          <DataField Field="Last Name"></DataField>
          <DataField Field="Email"></DataField>
          <PasswordField Header="Password"></PasswordField>
          <PasswordField Header="Confirm Password"></PasswordField>
          {/*<SubmitButton></SubmitButton>*/}
          <Link Href="/signup" Text="Create An Account"></Link>
        </form>
      </header>
      <body></body>
    </div>
  );
}

export default SignUp;
