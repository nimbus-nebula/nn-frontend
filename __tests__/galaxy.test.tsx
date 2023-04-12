import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {
    CreateNewFolderButton,
    UploadFilesButton
} from "../src/components/dashboard/users-galaxy/users-galaxy-components";
import React from "react";

describe("UploadFilesButton", () => {
    test("renders UploadFilesButton component", () => {
        render(<UploadFilesButton />);
        const uploadText = screen.getByText("Click or drag file to this area to upload");
        expect(uploadText).toBeInTheDocument();
    });
});

describe("CreateNewFolderButton", () => {
    test("renders CreateNewFolderButton component", () => {
        render(<CreateNewFolderButton />);
        const newFolderButton = screen.getByText("New Folder");
        expect(newFolderButton).toBeInTheDocument();
    });

    test("opens and closes the modal when clicking New Folder button", async () => {
        render(<CreateNewFolderButton />);
        const newFolderButton = screen.getByText("New Folder");

        fireEvent.click(newFolderButton);
        const modalTitle = await screen.findByText("Name Your Cluster");
        expect(modalTitle).toBeInTheDocument();

        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        fireEvent.click(cancelButton);

        await waitFor(() => {
            const modalAfterClosing = screen.queryByText("Name Your Cluster ");
            expect(modalAfterClosing).not.toBeInTheDocument();
        });
    });
});