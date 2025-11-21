import React from 'react';
import { Link } from 'react-router-dom';

export default function RentWheelsFooter() {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo & Site Name */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">RentWheels</h1>
                    <p className="text-gray-400">The easiest way to rent cars in your city.</p>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="font-semibold mb-2">Contact Info</h2>
                    <p>Email: support@rentwheels.com</p>
                    <p>Phone: +880 1234 567890</p>
                    <p>Address: Dhaka, Bangladesh</p>
                </div>

                {/* Links & Social Media */}
                <div>
                    <h2 className="font-semibold mb-2">Follow Us</h2>
                    <div className="flex gap-4">
                        <Link to="#" className="text-gray-400 hover:text-white">Facebook</Link>
                        <Link to="#" className="text-gray-400 hover:text-white">Twitter</Link>
                        <Link to="#" className="text-gray-400 hover:text-white">Instagram</Link>
                    </div>
                    <p className="mt-4 text-gray-500 text-sm">© 2025 RentWheels. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
