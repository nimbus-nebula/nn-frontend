import React, { useState } from "react";
import "../../App.css";
import "./dashboard.css";
import {
  DeleteOutlined,
  CloudOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { ConfigProvider, MenuProps, Space } from "antd";
import { Layout, Menu, theme } from "antd";
import { NewButton, UserProfile } from "./dashboard-components";
import { UsersGalaxy } from "./users-galaxy/users-galaxy";
import { Trash } from "./trash/trash";
import { Logo } from "../global-components";
import { Recent } from "./recent/recent";
import { Content } from "antd/es/layout/layout";

const { Header, Footer, Sider } = Layout;
const sections: string[][] = [
  ["My Galaxy", "galaxy"],
  ["Black Hole", "trash"],
  ["Recent", "recent"],
];
const items: MenuProps["items"] = [
  CloudOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
].map((icon, index) => ({
  key: `${sections[index][1]}`,
  icon: React.createElement(icon),
  label: sections[index][0],
}));

const selectContent = (key: string) => {
  switch (key) {
    case "galaxy":
      return <UsersGalaxy></UsersGalaxy>;
    case "trash":
      return <Trash></Trash>;
    case "recent":
      return <Recent></Recent>;
    default:
      break;
  }
};

export function Dashboard() {
  //TODO: profile section & footer
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("galaxy");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#A296CA",
        },
      }}
    >
      <Layout>
        <Sider
          width={220}
          style={{ background: "#110A1C" }}
          className="side-tab"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div style={{ scale: "0.35", marginRight: "105px" }}>
            <Logo></Logo>
          </div>
          <NewButton></NewButton>
          <Space direction={"vertical"}>
            <Menu
              theme="dark"
              mode="inline"
              className="menu"
              items={items}
              onClick={({ key }) => {
                setSelectedMenu(key);
              }}
            />
          </Space>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <UserProfile onLogout={() => console.log("User logged out")} />
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              marginLeft: 25,
            }}
          >
            {selectContent(selectedMenu)}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Nimbus Nebula ©2023 Created by Software-Elites
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Dashboard;
