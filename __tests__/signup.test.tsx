import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter as Router, MemoryRouter, Route, Routes} from "react-router-dom";
import {RegistrationForm} from "../src/components/signup/signup-components";
import axios from "axios";
import {createMemoryHistory} from "history";
import React from "react";

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

    jest.mock('axios');
    axios.post = jest.fn();
    const mockedAxiosPost = axios.post as jest.Mock;


    test('navigates to home page after successful registration', async () => {
        mockedAxiosPost.mockResolvedValueOnce({ data: { success: true } });

        const history = createMemoryHistory();
        history.push('/signup');

        const { getByText, getByPlaceholderText } = render(
            <MemoryRouter initialEntries={['/signup']}>
                <Routes>
                    <Route path="/signup" element={<RegistrationForm />} />
                    <Route path="/home" element={<div data-testid="home-page">Home Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        // Add your input filling and form submission logic here
        fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@examle.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'P@ssw0rd123' } });
        fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'P@ssw0rd123' } });

        fireEvent.click(getByText('Register'));

        await waitFor(() => {
            const home = screen.getByTestId('home-page');
        });
    });


});