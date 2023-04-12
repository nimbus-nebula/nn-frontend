import {render} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import {RegistrationForm} from "../src/components/signup/signup-components";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
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