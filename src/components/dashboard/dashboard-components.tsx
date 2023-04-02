import React, { useMemo, useState } from "react";
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
      visible={visible}
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
          <Button>+ NEW</Button>
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

export const UserProfile: React.FC = () => (
  <div
    className="row-rev"
    style={{ display: "flex", justifyContent: "space-around" }}
  >
    <Avatar size={43} icon={<AntDesignOutlined />} />
  </div>
);
