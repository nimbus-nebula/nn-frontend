import React, { useState } from "react";
import {FileOutlined, InboxOutlined} from "@ant-design/icons";
import type { UploadProps } from "antd";
import {Button, message, Upload, Modal, Empty} from "antd";
import * as Data from "../../../fixtures/data";
import {useCookies} from "react-cookie";
import axios from "axios";

const { Dragger } = Upload;

const GetCookies = async () => {
    const [refreshTokenCookies] = useCookies(['refreshToken']);
    const [accessTokenCookies] = useCookies(['accessToken']);
    Data.setRefreshToken(refreshTokenCookies.refreshToken);
    Data.setAccessToken(accessTokenCookies.accessToken);
};

GetCookies();
const accessToken = Data.getAccessToken();
const refreshToken = Data.getRefreshToken();
const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': "multipart/form-data",
    Accept: '*/*',
};

export const props: UploadProps = {
    name: "file",
    multiple: true,
    method: 'POST',
    action: `${Data.PORT}/s3/upload`,
    withCredentials: true,
    headers: headers,
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
          GetData();
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export const UploadFilesButton: React.FC = () => (
  <Dragger {...props}>
    <p
      className="ant-upload-drag-icon"
      style={{ scale: "1.1", overflow: "auto" }}
    >
      <InboxOutlined />
    </p>
    <p className="ant-upload-text" style={{ fontSize: "20px" }}>
      Click or drag file to this area to upload
    </p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading
      company data or other banned files.
    </p>
  </Dragger>
);

interface FileGridProps {
    files: any[];
}

export const FileSection: React.FC<FileGridProps> = ({ files }) => {
    if (files.length > 0) {
        return (
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
        );
    }
    return (
        <Empty style={{ background: "#f0f0f0", padding: "5px" }}></Empty>
    );
};

export const GetData = async () => {

    GetCookies();
    const refreshToken = Data.getRefreshToken();
    const accessToken = Data.getAccessToken();
    const [file, setFiles] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
    };
    try {
        // console.log(`THIS IS COOKIES: ${cookies.refreshToken}`)
        // console.log(`THIS IS REFRESHTK: ${refreshToken}`);
        const res = await axios.get(`${Data.PORT}/s3/list`, { headers, withCredentials: true });
        console.log(res);
        setFiles(res.data.files);
    } catch (e) {
        console.log(e);
    }
};
