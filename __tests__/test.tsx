import { LogInForm } from "../src/components/home/home-components";
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
//Rebase
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

});