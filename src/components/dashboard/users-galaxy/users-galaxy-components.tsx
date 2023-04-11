import React, { useState } from "react";
import {FileOutlined, InboxOutlined} from "@ant-design/icons";
import type { UploadProps } from "antd";
import {Button, message, Upload, Modal, Empty} from "antd";

const { Dragger } = Upload;

//TODO
export const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
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

export const CreateNewFolderButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const createFolder = () => {
    // TODO
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const cancelCreateFolder = () => {
    // TODO
    setOpen(false);
  };

  return (
    <>
      <Button
        shape="default"
        onClick={showModal}
        style={{ padding: "50px 30px", fontSize: "25px" }}
      >
        New Folder
      </Button>
      <Modal
        title="Name Your Cluster"
        open={open}
        onOk={createFolder}
        confirmLoading={confirmLoading}
        onCancel={cancelCreateFolder}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
