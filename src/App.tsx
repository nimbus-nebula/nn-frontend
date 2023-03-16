import React from 'react';
import './App.css';
import Home from "./pages/home/home";

const logo: string = `${process.env.PUBLIC_URL}/nn-logo.svg`;
function App() {
  return (
    <Home />
  );
}

export default App;
