import React from "react";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "../App.css";

type DataFieldsProps = {
  Field: string;
  IsPassword?: boolean;
};

type LinkProps = {
  Href: string;
  Text: string;
};

type PasswordProps = {
  Header: string;
};

export function Logo() {
  return (
    <div className="logo-n">
      N<div className="logo-remaining">imbus ebula</div>
    </div>
  );
}

export function Slogan() {
  return <div className="app-slogan">"Create Your Cluster of Files"</div>;
}

export function DataField(props: DataFieldsProps) {
  const IsPassword: boolean = props.IsPassword ? props.IsPassword : false;
  const DataField: string = props.Field ? props.Field : "";
  let Type: string = !IsPassword ? "text" : "password";
  return (
    <div className="input-label-text-field">
      <h3 className="input-label"> {DataField} </h3>
      <input
        className="input-field"
        type={Type}
        id={DataField.toLowerCase()}
        name={DataField.toLowerCase()}
        placeholder={DataField}
      />
    </div>
  );
}

export function PasswordField(props: PasswordProps) {
  //TODO: adjust the eye icon location
  const [Password, SetPassword] = useState("");
  const [Visible, SetVisible] = useState(true);
  return (
    <div className="input-label-text-field">
      <h3 className="input-label"> {props.Header} </h3>
      <input
        className="input-field"
        type={Visible ? "text" : "password"}
        id="password"
        name="password"
        placeholder="Password"
        onChange={(e) => SetPassword(e.target.value)}
      />
      <div onClick={() => SetVisible(!Visible)}>
        {Visible ? (
          <EyeOutlined></EyeOutlined>
        ) : (
          <EyeInvisibleOutlined></EyeInvisibleOutlined>
        )}
      </div>
    </div>
  );
}

export function Link(props: LinkProps) {
  return (
    <a className="anchor" href={props.Href}>
      {props.Text}
    </a>
  );
}
