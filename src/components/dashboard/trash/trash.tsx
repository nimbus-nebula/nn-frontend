import React from "react";
import { Empty, Typography } from "antd";
import "../dashboard.css";

const { Title } = Typography;

export const Trash = () => (
  <div className="content">
    <Title>Recently Deleted Item</Title>
    <Empty style={{ background: "lightgray", padding: "5px" }}></Empty>
  </div>
);
