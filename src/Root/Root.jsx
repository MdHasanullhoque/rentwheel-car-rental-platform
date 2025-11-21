

import React from 'react';
import { Outlet } from 'react-router-dom';
import RentWheelsNavbar from '../components/shared/RentWheelsNavbar.jsx';
import RentWheelsFooter from '../components/shared/RentWheelsFooter.jsx';

export default function Root() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <RentWheelsNavbar />

            {/* Page Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <RentWheelsFooter />
        </div>
    );
}


