import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route, Routes, useNavigate,
} from 'react-router-dom';
import HomePage from './Features/Home/HomePage';
import LandingPage from './Features/LandingPage/LandingPage';
import LoginPage from './Features/Login/LoginPage';
import RegisterPage from './Features/Register/RegisterPage';
import StoryPage from './Features/Story/StoryPage';
import './index.css';
import LogoutUseCase from './UseCases/Auth/LogoutUseCase';

axios.defaults.withCredentials = true;

function Logout() {
  const navigator = useNavigate();

  useEffect(() => {
    LogoutUseCase.handle();
    navigator('/');
  }, []);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/app" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
