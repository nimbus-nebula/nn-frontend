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
import {useCookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { AntDesignOutlined } from "@ant-design/icons";
import { props } from "./users-galaxy/users-galaxy-components";
import axios from "axios";
import * as Data from "../../fixtures/data";
import {DOMAIN} from "../../fixtures/data";

interface CreateFolderModalProps {
  visible: boolean;
  onCreate: () => void;
  onCancel: () => void;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [newFolderName, setNewFolderName] = useState("");

  const handleOk = () => {
    onCreate();
    message.success(`Created folder "${newFolderName}"`);
    setNewFolderName("");
  };

  const handleCancel = () => {
    onCancel();
    setNewFolderName("");
  };

  return (
    <Modal
      title="Create new folder"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      maskClosable={false}
      closable={false}
    >
      <Input
        placeholder="folder name"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
      />
    </Modal>
  );
};

export const NewButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (option === "createf") {
      setIsModalVisible(true);
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
          <Button data-testid="dashboard-new-button">+ NEW</Button>
        </Dropdown>
      </Space>
      <CreateFolderModal
        visible={isModalVisible}
        onCreate={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      />
    </Space>
  );
};

interface UserProfileProps {
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {

  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const nnLogOut = async () => {
    try {
      removeCookie('refreshToken', { path: '/', domain: DOMAIN });
      removeCookie('accessToken', {path: '/', domain: DOMAIN})
      navigate("/home");
      message.success("Log Out Successfully");
    } catch (e) {
      console.log(e);
    }
  }

  const handleLogOut = () => {
    nnLogOut();
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogOut}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="row-rev"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <Dropdown overlay={menu} placement="bottomRight">
        <Avatar size={43} icon={<AntDesignOutlined />} />
      </Dropdown>
    </div>
  );
};
