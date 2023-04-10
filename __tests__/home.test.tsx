import React from "react";
import { render, screen } from "@testing-library/react";
import { LogInForm } from "../src/components/home/home-components";

test('LogIn Form Checking', () => {
    console.log('run login form testing');
    render(<LogInForm />);
    expect(screen.getAllByTestId('login-input-email')).toBeInTheDocument();
    expect(screen.getAllByTestId('login-input-password')).toBeInTheDocument();
});
