import React from "react";
import { render, screen } from "@testing-library/react";
import { LogInForm } from "../../src/components/home/home-components";

describe("[HealthCheck] Login", () => {
  test("LogIn Form Checking", () => {
    console.log("run login form testing");
    const { getByTestId } = render(<LogInForm />);
    expect(getByTestId("login-input-email")).toBeVisible();
    expect(getByTestId("login-input-password")).toBeVisible();
  });
});
