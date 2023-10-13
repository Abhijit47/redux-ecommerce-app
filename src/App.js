import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Homepage from './pages/Homepage';
import Cart from './components/Cart';
import Success from './pages/Success';
import Cancle from './pages/Cancle';
import { Toaster } from 'react-hot-toast';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/your-cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancle' element={<Cancle />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;