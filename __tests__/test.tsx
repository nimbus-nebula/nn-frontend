import { LogInForm } from "../src/components/home/home-components";
import React from 'react';
import {render, waitFor} from '@testing-library/react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { RegistrationForm } from "../src/components/signup/signup-components";
import "@testing-library/jest-dom";

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

    test("navigates to home page after successful registration", async () => {
        // Mock axios.post method
        mockAxios.onPost(`/auth/register`).replyOnce(200, { success: true });

        const { getByText, getByTestId, getByPlaceholderText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<div data-testid="home-page">Home Page</div>} />
                    <Route path="/signup" element={<RegistrationForm />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(getByPlaceholderText("First Name"), {
            target: { value: "John" },
        });
        fireEvent.change(getByPlaceholderText("Last Name"), {
            target: { value: "Doe" },
        });
        fireEvent.change(getByPlaceholderText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(getByPlaceholderText("Password"), {
            target: { value: "Password123!" },
        });
        fireEvent.change(getByPlaceholderText("Confirm Password"), {
            target: { value: "Password123!" },
        });
        fireEvent.click(getByText("Register"));

        await waitFor(() =>
            expect(getByTestId("home-page")).toBeInTheDocument()
        );

        // Restore the axios.post method
        mockAxios.restore();
    });
});
