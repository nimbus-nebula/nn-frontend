import React, { useEffect, useState } from "react";
import { FileOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload, Modal, Empty } from "antd";
import * as Data from "../../../fixtures/data";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as events from "events";

const { Dragger } = Upload;

export function verifyAccount(accessToken: string, refreshToken: string) {
  const headers = getHeaders(accessToken, refreshToken);
  const res = axios.get(`${Data.PORT}/auth/me`, {
    headers,
    withCredentials: true,
  });
}

function getHeaders(accessToken: string, refreshToken: string) {
  return {
    authorization: `Bearer ${accessToken}`,
    cookie: `refreshToken=${refreshToken}`,
  };
}

export const props: UploadProps = {
  multiple: true,
  customRequest: async (options) => {
    const { file, onSuccess, onError, onProgress } = options;
    if (!file) {
      console.log("file is empty");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(
          `${Data.PORT}/s3/upload`,
          formData,
          {
            headers: {
              ...getHeaders(Data.getAccessToken(), Data.getRefreshToken()),
            },
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
              if (!progressEvent) return;
              const { loaded, total } = progressEvent;
              const progress = Math.round((loaded / Number(total)) * 100);
              if (onProgress) {
                message.info("uploading");
                onProgress({ percent: progress });
              }
            },
          },
      );
      if (onSuccess) {
        message.success("file uploaded successfully");
        onSuccess(response.data);
        GetData();
      }
    } catch (error: any) {
        if (onError) {
          message.error("file failed to upload");
          onError(error);
          return;
        }
    }
  },
};

export const UploadFilesButton: React.FC = () => {
  const [accessTokenCookies] = useCookies(["accessToken"]);
  const [refreshTokenCookies] = useCookies(["refreshToken"]);
  const accessToken = accessTokenCookies.accessToken;
  const refreshToken = refreshTokenCookies.refreshToken;
  Data.setAccessToken(accessToken);
  Data.setRefreshToken(refreshToken);

  return (
    <Dragger
        {...props}
    >
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
};

interface FileGridProps {
  files: any[];
}

export const FileSection: React.FC<FileGridProps> = ({ files }) => {
  if (files.length > 0) {
    return (
      <div className="file-grid">
        {files.map((file: any) => (
          <div key={file.filename} className="file-item">
            <FileOutlined style={{ fontSize: "35px" }} />
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
            >
              {file.filename}
            </a>
          </div>
        ))}
      </div>
    );
  }
  return <Empty style={{ background: "#f0f0f0", padding: "5px" }}></Empty>;
};

export const GetData = async () => {
  const refreshToken = Data.getRefreshToken();
  const accessToken = Data.getAccessToken();
  const headers = getHeaders(accessToken, refreshToken);
  try {
    const res = await axios.get(`${Data.PORT}/s3/list`, {
      headers,
      withCredentials: true,
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
