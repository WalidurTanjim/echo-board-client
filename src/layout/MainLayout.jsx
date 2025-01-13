import React from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer/Footer';

const MainLayout = () => {
    return (
        <>
          <Navbar />
          <Outlet />
          <Footer />  
        </>
    );
};

export default MainLayout;