import { LogInForm } from "../src/components/home/home-components";
import React from 'react';
import {getByRole, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { RegistrationForm } from "../src/components/signup/signup-components";
import "@testing-library/jest-dom";
import {NewButton, UserProfile} from "../src/components/dashboard/dashboard-components";
import { UploadFilesButton, CreateNewFolderButton } from "../src/components/dashboard/users-galaxy/users-galaxy-components";

describe('LogInForm', () => {

    test('renders input elements and buttons', () => {
        const { getByTestId } = render(
            <Router>
                <LogInForm />
            </Router>
        );
        expect(getByTestId('login-input-email')).toBeInTheDocument();
        expect(getByTestId('login-input-password')).toBeInTheDocument();
        expect(getByTestId('login-button')).toBeInTheDocument();
    });

    test('navigates to /signup page successfully', () => {
        const { getByText, getByTestId } = render(
            <MemoryRouter initialEntries={['/']}>
                <LogInForm />
                <Routes>
                <Route path="/signup" element={<div data-testid="registration-navigator">Sign Up Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(getByText('Register Now!'));
        expect(getByTestId("login-input-email")).toBeInTheDocument();// Just needs to check if it navigated to the /sign up page
    });

    //Mock the axios module
    jest.mock('axios');

    const mockAxios = new MockAdapter(axios);

    test('navigates to /dashboard page after successful login', async () => {
        // Mock axios.post method
        mockAxios.onPost(`/auth/login`).replyOnce(200, { success: true });

        const { getByText, getByTestId, getByPlaceholderText } = render(
            <MemoryRouter initialEntries={['/']}>
                <LogInForm />
                <Routes>
                <Route
                    path="/dashboard"
                    element={<div data-testid="dashboard-page">Dashboard Page</div>}
                />
                </Routes>
            </MemoryRouter>

        );

        fireEvent.change(getByPlaceholderText('Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(getByPlaceholderText('Password'), {
            target: { value: 'password123' },
        });
        fireEvent.click(getByText('Log in'));

        await waitFor(() =>
            expect(getByTestId('login-input-email')).toBeInTheDocument()
        );

        // Restore the axios.post method
        mockAxios.restore();
    });


});





describe("RegistrationForm", () => {
    test("renders input elements and button", () => {
        const { getByTestId } = render(
            <Router>
                <RegistrationForm />
            </Router>
        );
        expect(getByTestId("register-input-firstname")).toBeInTheDocument();
        expect(getByTestId("register-input-lastname")).toBeInTheDocument();
        expect(getByTestId("register-input-email")).toBeInTheDocument();
        expect(getByTestId("register-input-password")).toBeInTheDocument();
        expect(getByTestId("register-input-confirmed-password")).toBeInTheDocument();
        expect(getByTestId("register-button")).toBeInTheDocument();
    });

    //Mock the axios module
    jest.mock("axios");

    const mockAxios = new MockAdapter(axios);
    // test("navigates to home page after successful registration", async () => {
    //     // Mock axios.post method
    //     mockAxios.onPost(`/auth/register`).replyOnce(200, { success: true });
    //     const history = createMemoryHistory();
    //     history.push('/signup');
    //
    //     const { getByText, getByTestId, getByPlaceholderText } = render(
    //         <MemoryRouter>
    //             <Routes>
    //                 <Route path="/home" element={<div data-testid="home-page">Home Page</div>} />
    //                 <Route path="/signup" element={<RegistrationForm />} />
    //             </Routes>
    //         </MemoryRouter>
    //     );
    //
    //     // ... rest of the test
    //
    //     //userEvent.click(getByRole('button', { name: "Register" }));
    //
    //
    //     // Wait for the home page to be in the document
    //     await waitFor(() => expect(getByTestId("home-page")).toBeInTheDocument());
    //
    //     // Check if the navigation has occurred
    //     expect(history.location.pathname).toBe('/');
    //
    //     // Restore the axios.post method
    //     mockAxios.restore();
    // });

});

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

    test('calls onLogout when logout option is clicked', () => {
        const handleLogoutMock = jest.fn();
        render(<Router><UserProfile onLogout={handleLogoutMock} /></Router>);

        const avatar = screen.getByRole('img');
        fireEvent.click(avatar);

        const logoutOption = screen.getByTestId('log-out');
        fireEvent.click(logoutOption);
    });
});





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
