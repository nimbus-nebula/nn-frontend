import React from "react";
import "../../App.css";
import {
  UploadOutlined,
  FileOutlined,
  FolderOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const sections: string[][] = [
  ["All Files", "all-files"],
  ["All Folders", "all-folders"],
  ["Upload New File", "upload-new-file"],
  ["Removed Files", "remove-files"],
];
const items: MenuProps["items"] = [
  FileOutlined,
  FolderOutlined,
  UploadOutlined,
  DeleteOutlined,
].map((icon, index) => ({
  key: sections[index][1],
  icon: React.createElement(icon),
  label: sections[index][0],
}));

const contents = (key: string) => {
  switch (key) {
    case "all-files":
      return <h1>all-files-page</h1>;
    case "all-folders":
      return <h1>all-folders-page</h1>;
    case "upload-new-file":
      return <h1>upload-new-files-page</h1>;
    case "removed-files":
      return <h1>removed-file-page</h1>;
    default:
      return <h1>not found / not implemented yet</h1>;
  }
};

export function Dashboard() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#110A1C",
        }}
      >
        <div style={{ height: 32, margin: 16 }} />
        {/*<Logo></Logo>*/}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          style={{ background: "#110A1C" }}
          items={items}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? "more" : "..."}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Nimbus Nebula ©2023 Created by Software-Elites
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
