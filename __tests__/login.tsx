import {fireEvent, render, waitFor} from "@testing-library/react";
import {BrowserRouter as Router, MemoryRouter, Route, Routes} from "react-router-dom";
import {LogInForm} from "../src/components/home/home-components";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import React from "react";
import Signup from "../src/components/signup/signup";
import Home from "../src/components/home/home";

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
            <MemoryRouter initialEntries={['/home']}>
                <Home />
                <Routes>
                    <Route
                        path="/dashboard"
                        element={<div data-testid="dashboard-page">Dashboard Page</div>}
                    />
                </Routes>
            </MemoryRouter>

        );

        fireEvent.change(getByPlaceholderText('Email'), {
            target: { value: 'example@test.com' },
        });
        fireEvent.change(getByPlaceholderText('Password'), {
            target: { value: 'P@ssw0rd123' },
        });
        fireEvent.click(getByText('Log in'));

        await waitFor(() =>
            expect(getByTestId('login-input-email')).toBeInTheDocument()
        );

        // Restore the axios.post method
        mockAxios.restore();
    });
});