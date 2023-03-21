import React from "react";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "./global-components.css";

type DataFieldsProps = {
  Field: string;
  IsFullSize?: boolean;
  Page: string;
};

type LinkProps = {
  Href: string;
  Text: string;
};

type PasswordProps = {
  Header: string;
  Page: string;
};

type PasswordRevealIconProps = {
  Visible: boolean;
  SetVisible: React.Dispatch<boolean>;
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
  const DataField: string = props.Field ? props.Field : "";
  const IsFullSize: boolean = props.IsFullSize ? props.IsFullSize : true;
  const Page: string = props.Page.toLowerCase();
  console.log(Page);
  const InputLabelTextFieldClass: string = `input-label-text-field-${Page}`;
  const InputLabelClass: string = `input-label-${Page}`;
  const InputFieldClass: string = `input-field-${Page}`;
  console.log(InputLabelTextFieldClass);
  let Type: string = "text";
  return (
    <div className={InputLabelTextFieldClass}>
      <h3 className={InputLabelClass}> {DataField} </h3>
      <input
        className={InputFieldClass}
        type={Type}
        id={DataField.toLowerCase()}
        name={DataField.toLowerCase()}
        placeholder={DataField}
      />
    </div>
  );
}

function PasswordRevealIcon(props: PasswordRevealIconProps) {
  return (
    <div onClick={() => props.SetVisible(!props.Visible)}>
      {props.Visible ? (
        <EyeOutlined></EyeOutlined>
      ) : (
        <EyeInvisibleOutlined></EyeInvisibleOutlined>
      )}
    </div>
  );
}

export function PasswordField(props: PasswordProps) {
  //TODO: adjust the eye icon location
  const [Password, SetPassword] = useState("");
  const [Visible, SetVisible] = useState(true);
  const Page: string = props.Page.toLowerCase();
  const InputLabelTextFieldClass: string = `input-label-text-field-${Page}`;
  const InputLabelClass: string = `input-label-${Page}`;
  const InputFieldClass: string = `input-field-${Page}`;
  return (
    <div className={InputLabelTextFieldClass}>
      <h3 className={InputLabelClass}> {props.Header} </h3>
      <input
        className={InputFieldClass}
        type={Visible ? "text" : "password"}
        id="password"
        name="password"
        placeholder="Password"
        onChange={(e) => SetPassword(e.target.value)}
      />
      <PasswordRevealIcon
        Visible={Visible}
        SetVisible={SetVisible}
      ></PasswordRevealIcon>
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
