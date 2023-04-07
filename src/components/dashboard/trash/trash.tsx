import React from "react";
import { Empty, Typography } from "antd";
import "../dashboard.css";

const { Title } = Typography;

export const Trash = () => (
  <div className="content">
    <Title level={2}>Recently Deleted Item</Title>
    <Empty style={{ background: "#f0f0f0", padding: "5px" }}></Empty>
  </div>
);
