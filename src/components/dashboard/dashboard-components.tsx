import React from "react";
import "./dashboard.css";
import { Avatar, Button, Dropdown, MenuProps, Space, Upload } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { props } from "./users-galaxy/users-galaxy-components";

const items: MenuProps["items"] = [
  {
    key: "upload-file",
    label: (
      <Upload {...props}>
        <div>Upload New File</div>
      </Upload>
    ),
  },
  {
    key: "create-folder",
    label: <div>Create New Folder</div>,
  },
];

export const NewButton: React.FC = () => (
  <Space
    direction="horizontal"
    style={{ display: "flex", justifyContent: "center" }}
  >
    <Space wrap direction="horizontal">
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        className="upload-new-file-button"
      >
        <Button>+ NEW</Button>
      </Dropdown>
    </Space>
  </Space>
);

export const UserProfile: React.FC = () => (
  <div
    className="row-rev"
    style={{ display: "flex", justifyContent: "space-around" }}
  >
    <Avatar size={43} icon={<AntDesignOutlined />} />
  </div>
);
