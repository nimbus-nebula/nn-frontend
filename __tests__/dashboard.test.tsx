import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { NewButton, UserProfile } from './dashboard';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Dashboard components', () => {
    test('renders NewButton component', () => {
        render(<NewButton />);
        const newButton = screen.getByText('+ NEW');
        expect(newButton).toBeInTheDocument();
    });

    test('opens and closes CreateFolderModal when + NEW button is clicked', async () => {
        render(<NewButton />);
        const newButton = screen.getByText('+ NEW');
        fireEvent.click(newButton);

        const createFolderMenuItem = screen.getByText('Create New Folder');
        fireEvent.click(createFolderMenuItem);

        const modal = await waitFor(() => screen.getByText('Create new folder'));
        expect(modal).toBeInTheDocument();

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        await waitFor(() => expect(screen.queryByText('Create new folder')).not.toBeInTheDocument());
    });

    test('renders UserProfile component with avatar and logout option', () => {
        const handleLogoutMock = jest.fn();
        render(<Router><UserProfile onLogout={handleLogoutMock} /></Router>);

        const avatar = screen.getByRole('img');
        expect(avatar).toBeInTheDocument();

        fireEvent.click(avatar);
        const logoutOption = screen.getByText('Log out');
        expect(logoutOption).toBeInTheDocument();
    });

    test('calls onLogout when logout option is clicked', () => {
        const handleLogoutMock = jest.fn();
        render(<Router><UserProfile onLogout={handleLogoutMock} /></Router>);

        const avatar = screen.getByRole('img');
        fireEvent.click(avatar);

        const logoutOption = screen.getByText('Log out');
        fireEvent.click(logoutOption);

        expect(handleLogoutMock).toHaveBeenCalledTimes(1);
    });
});
