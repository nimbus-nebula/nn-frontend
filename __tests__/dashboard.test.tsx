import React from 'react';
import {getByRole, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import {NewButton, UserProfile} from "../src/components/dashboard/dashboard-components";
import { act } from 'react-dom/test-utils';

describe('Dashboard components', () => {


    test('renders NewButton component', () => {
        render(<NewButton />);
        const newButton = screen.getByText('+ NEW');
        expect(newButton).toBeInTheDocument();
    });


    test("opens and closes CreateFolderModal when + NEW button is clicked", async () => {
        render(<NewButton />);

        // Click the + NEW button
        const newButton = screen.getByTestId('dashboard-new-button');
        await act(async () => {
            fireEvent.mouseEnter(newButton);

        });


        const createFolderMenuItem = await screen.findByTestId('create-folder-menu-item')
        // Click the Create New Folder menu item
        await act(async () => {
            fireEvent.click(createFolderMenuItem);
        });

        // Find the "Create new folder" modal
        const createFolderModal = await screen.findByText('Create new folder');

        const cancelButton = screen.getByTestId('create-folder-modal-cancel');
        await act(async () => {
            fireEvent.click(cancelButton);
        });

        // Check that the modal is no longer visible
        const modalAfterClosing = screen.queryByText('Create new folder ');
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

    test('calls onLogout when logout option is clicked', () => {
        const handleLogoutMock = jest.fn();
        render(<Router><UserProfile onLogout={handleLogoutMock} /></Router>);

        const avatar = screen.getByRole('img');
        fireEvent.click(avatar);

        const logoutOption = screen.getByTestId('log-out');
        fireEvent.click(logoutOption);
    });
});