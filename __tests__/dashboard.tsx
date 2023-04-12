import {fireEvent, render, screen} from "@testing-library/react";
import {NewButton, UserProfile} from "../src/components/dashboard/dashboard-components";
import {BrowserRouter as Router} from "react-router-dom";
import React from "react";
import userEvent from '@testing-library/user-event';
import {UploadFilesButton} from "../src/components/dashboard/users-galaxy/users-galaxy-components";

describe('Dashboard components', () => {

    test('renders NewButton component', () => {
        render(<NewButton />);
        const newButton = screen.getByText('+ NEW');
        expect(newButton).toBeInTheDocument();
    });

    test("opens and closes CreateFolderModal when + NEW button is clicked", async () => {
        render(<NewButton />);

        // Click the + NEW button
        const newButton = screen.getByTestId("dashboard-new-button");
        fireEvent.click(newButton);

        // Click the Create New Folder menu item
        //TODO: Currently fails as the when newButton above is not clicked, hence test dosent follow through
        const createFolderMenuItem = screen.getByTestId("create-folder-menu-item");
        fireEvent.click(createFolderMenuItem);

        // Find the "Create new folder" modal
        const createFolderModal = await screen.findByText("Create new folder");

        // Find the cancel button within the modal and click it
        const cancelButton = screen.getByTestId("create-folder-modal-cancel");
        fireEvent.click(cancelButton);

        // Check that the modal is no longer visible
        const modalAfterClosing = screen.queryByText("Create new folder");
        expect(modalAfterClosing).toBeNull();
    });

    test('renders UserProfile component with avatar and logout option', () => {
        const handleLogoutMock = jest.fn();
        render(<Router><UserProfile onLogout={handleLogoutMock} /></Router>);

        const avatar = screen.getByRole('img');
        expect(avatar).toBeInTheDocument();

        fireEvent.click(avatar);
        const logoutOption = screen.getByTestId('log-out');
        expect(logoutOption).toBeInTheDocument();
    });

    test("renders UploadFilesButton component", () => {
        render(<UploadFilesButton />);
        const uploadText = screen.getByText("Click or drag file to this area to upload");
        expect(uploadText).toBeInTheDocument();
    });

    test('calls onLogout when logout option is clicked', () => {
        const handleLogoutMock = jest.fn();
        render(
            <Router>
                <UserProfile onLogout={handleLogoutMock} />
            </Router>
        );
        const avatar = screen.getByRole('img');
        userEvent.hover(avatar); // Simulate mouse hover
        const logoutOption = screen.getByText('/Log out/i');
        fireEvent.click(logoutOption);
        expect(handleLogoutMock).toHaveBeenCalled();
    });

});