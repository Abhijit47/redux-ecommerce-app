import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Homepage from './pages/Homepage';
import Cart from './components/Cart';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/your-cart' element={<Cart />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;