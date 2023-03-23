import { Button, ConfigProvider, Form, Input, Space } from "antd";
import React from "react";
import "./signup.css";

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    // xs: { span: 24 },
    // sm: { span: 8 },
  },
  wrapperCol: {
    // xs: { span: 24 },
    // sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
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
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ width: 600 }}
        scrollToFirstError
        size="large"
        layout="vertical"
        labelAlign="left"
      >
        <Space direction="vertical" size="middle">
          <Form.Item
            name="firstname"
            label={<label >First Name</label>}
            className="field-label-firstname"
            rules={[
              {
                required: true,
                message: "This field is required!",
                whitespace: true,
              },
            ]}
            >
            <Input placeholder="First Name" style={{ color: "#4A494D" }} />
          </Form.Item>

          <Form.Item
          className="field-label-lastname"
            name="lastname"
            label={<label>Last Name</label>}
            rules={[
              {
                required: true,
                message: "This field is required!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Last Name" style={{ color: "#4A494D" }} />
          </Form.Item>

          <Form.Item
            className="field-label-email"
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
          >
            <Input placeholder="Email" style={{ color: "#4A494D" }} />
          </Form.Item>

          <Form.Item
          className="field-label-password"
            name="password"
            label={<label>Password</label>}
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Password"
              style={{ color: "#4A494D" }}
            />
          </Form.Item>

          <Form.Item
          className="field-label-confirm-password"
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
          >
            <Input.Password
              placeholder="Confirm Password"
              style={{ color: "#4A494D"}}
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout} className="signup-form-button">
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
              shape="round"
            >
              Register
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </ConfigProvider>
  );
};
