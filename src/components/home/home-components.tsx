import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Space } from "antd";

export const LogInForm: React.FC = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nnLogin = async () => {
    try {
      const payload = {
        "email": email,
        "password": password
      };
      const res = await axios.post("http://127.0.0.1:8000/auth/login", payload);
      navigate("/dashboard");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdateValue = (changedValues: any, allValues: any) => {
    setEmail(allValues.email);
    setPassword(allValues.password);
  };

  const handleLogin = () => {
    nnLogin();
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
          name="normal_login"
          className="form-login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onValuesChange={handleUpdateValue}
          size="large"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Space direction="vertical" size="middle">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              shape="round"
              onClick={handleLogin}
            >
              Log in
            </Button>
            <a href="/signup" className="link-to-register-page">
              Register Now!
            </a>
          </Space>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
