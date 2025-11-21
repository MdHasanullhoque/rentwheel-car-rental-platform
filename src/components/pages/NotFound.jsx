import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-6">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Back to Home
            </Link>
        </div>
    );
}
