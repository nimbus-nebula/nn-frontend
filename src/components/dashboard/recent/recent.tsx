import React from "react";
import { Empty, Typography } from "antd";
import "../dashboard.css";

const { Title } = Typography;

export const Recent = () => (
  <div className="content">
    <Title level={2}>Recent</Title>
    <Empty style={{ background: "lightgray", padding: "5px" }}></Empty>
  </div>
);
