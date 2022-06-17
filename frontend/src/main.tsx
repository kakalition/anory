import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';

function Te() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-sky-200">
      Hey
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/te" element={<Te />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
