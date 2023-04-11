import "./signup.css";
import axios from "axios";
import React, {useState} from "react";
import * as Data from "../../fixtures/data"
import { useNavigate } from "react-router-dom";
import {Button, ConfigProvider, Form, Input, message, Space} from "antd";

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export const RegistrationForm: React.FC = () => {

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //TODO: add first name & last name after BE updated

  const nnSignUp = async () => {
    try {
      const payload = {
        "email": email,
        "password": password
      };
      const res = await axios.post(`${Data.PORT}/auth/register`, payload);
      navigate("/");
      message.success("Succesfully Created a New Account!");
      console.log(res.data);
    } catch (e) {
      message.error("Failed to Create an Account. Please make sure that all input is valid.");
      console.log(e);
    }
  }

  const handleUpdateValue = (changedValues: any, allValues: any) => {
    setEmail(allValues.email);
    setPassword(allValues.password);
  };

  const handleSignUp = () => {
    nnSignUp();
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#A296CA",
        },
      }}
    >
      <Form
        className="signup-form"
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        size="large"
        layout="vertical"
        labelAlign="left"
        onValuesChange={handleUpdateValue}
      >
        <Space direction="vertical" size="middle">
          <div className="form-fields-container">
            <div className="form-fields-row">
              <Form.Item
                name="firstname"
                label={<label>First Name</label>}
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                    whitespace: true,
                  },
                ]}
                className="field-firstname"
                data-testid="register-field-firstname"
              >
                <Input placeholder="First Name" style={{ color: "#4A494D" }} data-testid="register-input-firstname"/>
              </Form.Item>

              <Form.Item
                name="lastname"
                label={<label>Last Name</label>}
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                    whitespace: true,
                  },
                ]}
                className="field-lastname"
                data-testid="register-field-lastname"
              >
                <Input placeholder="Last Name" style={{ color: "#4A494D" }} data-testid="register-input-lastname"/>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="email"
            label={<label>Email</label>}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "This field is required!",
              },
            ]}
            className="field-email"
            data-testid="register-field-email"
          >
            <Input placeholder="Email" style={{ color: "#4A494D" }} data-testid="register-input-email"/>
          </Form.Item>

          <Form.Item
            name="password"
            label={<label>Password</label>}
            rules={[
              {
                required: true,
                message: "This field is required!",

              },
              { pattern: passwordRegex,
                message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
              },
            ]}
            hasFeedback
            className="field-password"
            data-testid="register-field-password"
          >
            <Input.Password
              placeholder="Password"
              style={{ color: "#4A494D" }}
              data-testid="register-input-password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<label>Confirm Password</label>}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              {
                pattern: passwordRegex,
                message: "The format of the password is not correct."
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            className="field-confirm-password"
            data-testid="register-field-confirmed-password"
          >
            <Input.Password
              placeholder="Confirm Password"
              style={{ color: "#4A494D" }}
              data-testid="register-input-confirmed-password"
            />
          </Form.Item>

          <div className="button-container">
            <Form.Item
              {...tailFormItemLayout}
              className="signup-form-button-wrapper"
            >
              <Button type="primary" htmlType="submit" shape="round" onClick={handleSignUp} data-testid="register-button">
                Register
              </Button>
            </Form.Item>
          </div>
        </Space>
      </Form>
    </ConfigProvider>
  );
};
