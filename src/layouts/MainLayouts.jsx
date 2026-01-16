import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/home/shared/Navbar';

const MainLayouts = () => {
    return (
        <div className='assignment'>
           <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayouts;