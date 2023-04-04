import { Button, ConfigProvider, Form, Input, Space } from "antd";
import React from "react";
import "./signup.css";

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
  const [form] = Form.useForm();

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
              >
                <Input placeholder="First Name" style={{ color: "#4A494D" }} />
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
              >
                <Input placeholder="Last Name" style={{ color: "#4A494D" }} />
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
          >
            <Input placeholder="Email" style={{ color: "#4A494D" }} />
          </Form.Item>

          <Form.Item
            name="password"
            label={<label>Password</label>}
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
            hasFeedback
            className="field-password"
          >
            <Input.Password
              placeholder="Password"
              style={{ color: "#4A494D" }}
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
          >
            <Input.Password
              placeholder="Confirm Password"
              style={{ color: "#4A494D" }}
            />
          </Form.Item>

          <div className="button-container">
            <Form.Item
              {...tailFormItemLayout}
              className="signup-form-button-wrapper"
            >
              <Button type="primary" htmlType="submit" shape="round">
                Register
              </Button>
            </Form.Item>
          </div>
        </Space>
      </Form>
    </ConfigProvider>
  );
};
