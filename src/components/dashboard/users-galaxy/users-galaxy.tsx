import React, { useEffect, useState } from "react";
import { Empty, Typography } from "antd";
import {
  FileSection,
  UploadFilesButton,
  GetData,
} from "./users-galaxy-components";
import "../dashboard.css";
import * as Data from "../../../fixtures/data";

const { Title } = Typography;

const dummyData = {
  username: "example@gmail.com",
  files: [
    {
      filename: "bossFile.txt",
      url: "http://tanpantz.com:9000/example/bossFile.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=K41A9jEtlfz413O8%2F20230408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230408T165111Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host&X-Amz-Signature=726e9bd5828dbdee94b1c12c22038dcb2ca4c76caff441cf6b2a6a5d769440ae%22%7D",
    },
    {
      filename: "bossFile2.txt",
      url: "http://tanpantz.com:9000/example/bossFile2.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=K41A9jEtlfz413O8%2F20230408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230408T165111Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host&X-Amz-Signature=c14df544769c3205285ce85a4cc9c32e9920bce92c412622390a8ca38ab8001f",
    },
  ],
};

export const UsersGalaxy: React.FC = () => {
  const [files] = useState(dummyData.files);
  console.log(
    `This is accessT ${Data.getAccessToken()} | This is refreshT ${Data.getRefreshToken()}`
  );
  return (
    <div className="content">
      <Title level={2}>Upload New File</Title>
      <UploadFilesButton></UploadFilesButton>
      <Title level={2}>Files</Title>
      <FileSection files={files}></FileSection>
      <Title level={2}>Folders</Title>
      <Empty style={{ background: "#f0f0f0", padding: "5px" }}></Empty>
    </div>
  );
};

export default UsersGalaxy;
