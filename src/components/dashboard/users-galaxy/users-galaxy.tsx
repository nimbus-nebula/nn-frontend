import React from "react";
import { Empty, Typography } from "antd";
import { UploadFilesButton } from "./users-galaxy-components";
import "../dashboard.css";

const { Title } = Typography;

export const UsersGalaxy: React.FC = () => (
  <div className="content">
    <Title level={2}>Upload New File</Title>
    <UploadFilesButton></UploadFilesButton>
    <Title level={2}>Files</Title>
    <Empty style={{ background: "#f0f0f0", padding: "5px" }}></Empty>
    <Title level={2}>Folders</Title>
    <Empty style={{ background: "#f0f0f0", padding: "5px" }}></Empty>
  </div>
);
