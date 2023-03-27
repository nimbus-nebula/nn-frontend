import React from "react";
import { Empty, Typography } from "antd";
import { UploadFilesButton } from "./users-galaxy-components";
import "../dashboard.css";

const { Title } = Typography;

export const UsersGalaxy: React.FC = () => (
  <div className="content">
    <Title>Upload New File</Title>
    <UploadFilesButton></UploadFilesButton>
    <Title>All File</Title>
    <Empty style={{ background: "lightgray", padding: "5px" }}></Empty>
    <Title>All Folder</Title>
    <Empty style={{ background: "lightgray", padding: "5px" }}></Empty>
  </div>
);
