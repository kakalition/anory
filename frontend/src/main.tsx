import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Features/Home/HomePage';
import LandingPage from './Features/LandingPage/LandingPage';
import LoginPage from './Features/Login/LoginPage';
import RegisterPage from './Features/Register/RegisterPage';
import StoryPage from './Features/Story/StoryPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
