import React from "react";
import { Empty, Typography } from "antd";
import { UploadFilesButton } from "./users-galaxy-components";
import "../dashboard.css";

const { Title } = Typography;

export const UsersGalaxy: React.FC = () => (
  <div className="content">
    <Title>Upload New File</Title>
    <UploadFilesButton></UploadFilesButton>
    <Title>Files</Title>
    <Empty style={{ background: "lightgray", padding: "5px" }}></Empty>
    <Title>Folders</Title>
    <Empty style={{ background: "lightgray", padding: "5px" }}></Empty>
  </div>
);
