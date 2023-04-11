import React, { useState } from "react";
import { Empty, Typography } from "antd";
import { FileOutlined } from '@ant-design/icons';
import { UploadFilesButton } from "./users-galaxy-components";
import "../dashboard.css";

const { Title } = Typography;

const dummyData = {
  "username": "example@gmail.com",
  "files": [
    {
      "filename": "bossFile.txt",
      "url": "http://tanpantz.com:9000/example/bossFile.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=K41A9jEtlfz413O8%2F20230408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230408T165111Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host&X-Amz-Signature=726e9bd5828dbdee94b1c12c22038dcb2ca4c76caff441cf6b2a6a5d769440ae%22%7D"
    },
    {
      "filename": "bossFile2.txt",
      "url": "http://tanpantz.com:9000/example/bossFile2.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=K41A9jEtlfz413O8%2F20230408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230408T165111Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host&X-Amz-Signature=c14df544769c3205285ce85a4cc9c32e9920bce92c412622390a8ca38ab8001f"
    }
  ]
};

export const UsersGalaxy: React.FC = () => {
  const [files] = useState(dummyData.files);

  return (
    <div className="content">
      <Title level={2}>Upload New File</Title>
      <UploadFilesButton></UploadFilesButton>
      <Title level={2}>Files</Title>
      {files.length > 0 ? (
        <div className="file-grid">
          {files.map((file: any) => (
            <div key={file.filename} className="file-item">
              <FileOutlined style={{ fontSize: '35px' }} />
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="file-link">
                {file.filename}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <Empty style={{ background: "#f0f0f0", padding: "5px" }}></Empty>
      )}
      <Title level={2}>Folders</Title>
      <Empty style={{ background: "#f0f0f0", padding: "5px" }}></Empty>
    </div>
  );
};

export default UsersGalaxy;
