import React, { useState } from "react";
import "./dashboard.css";
import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  Space,
  Upload,
  Modal,
  message,
  Input,
} from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { props } from "./users-galaxy/users-galaxy-components";

export const NewButton: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (option === "createf") {
      Modal.confirm({
        title: "Create new folder",
        content: (
          <Input
            placeholder="folder name"
            onChange={(e) => setNewFolderName(e.target.value)}
            //TODO: folder name is delaying by 1 (starting with "")
          />
        ),
        okText: "Create",
        cancelText: "Cancel",
        onOk: () => {
          setCreatingFolder(true);
          setTimeout(() => {
            setCreatingFolder(false);
            message.success(`Created folder "${newFolderName}"`);
          }, 1000);
        },
        onCancel: () => {
          setNewFolderName("");
        },
        maskClosable: false,
        closable: false,
      });
    }
  };

  const items = (
    <Menu>
      <Menu.Item key="upload-file">
        <Upload {...props}>Upload New File</Upload>
      </Menu.Item>
      <Menu.Item
        key="create-folder"
        onClick={() => handleOptionSelect("createf")}
      >
        <div>Create New Folder</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Space
      direction="horizontal"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Space wrap direction="horizontal">
        <Dropdown
          overlay={items}
          placement="bottomLeft"
          className="upload-new-file-button"
        >
          <Button>+ NEW</Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export const UserProfile: React.FC = () => (
  <div
    className="row-rev"
    style={{ display: "flex", justifyContent: "space-around" }}
  >
    <Avatar size={43} icon={<AntDesignOutlined />} />
  </div>
);
