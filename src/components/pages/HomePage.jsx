import React from 'react';
import { Link } from 'react-router-dom';

// Sample cars for UI preview
const sampleCars = [
    { id: 1, name: 'Honda Civic', price: 50, model: 'Sedan', provider: 'Alice' },
    { id: 2, name: 'Toyota Corolla', price: 45, model: 'Sedan', provider: 'Bob' },
    { id: 3, name: 'Tesla Model 3', price: 120, model: 'Electric', provider: 'Charlie' },
    { id: 4, name: 'BMW X5', price: 150, model: 'SUV', provider: 'David' },
    { id: 5, name: 'Mercedes C-Class', price: 140, model: 'Luxury', provider: 'Eva' },
    { id: 6, name: 'Hyundai i20', price: 35, model: 'Hatchback', provider: 'Frank' },
];

export default function HomePage() {
    return (
        <div className="space-y-20">

            {/* Hero Banner */}
            <section className="relative h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">RentWheels - Your Trusted Car Rental</h1>
                    <p className="text-gray-700 mb-6">Book cars quickly, easily, and safely from local providers.</p>
                    <Link to="/browse-cars" className="py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700">Browse Cars</Link>
                </div>
            </section>

            {/* Featured Cars */}
            <section className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">Featured Cars</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {sampleCars.map(car => (
                        <div key={car.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            <img
                                src={`https://source.unsplash.com/400x250/?car,${car.id}`}
                                alt={car.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold">{car.name}</h3>
                            <p>Model: {car.model}</p>
                            <p>Price: ${car.price}/day</p>
                            <p>Provider: {car.provider}</p>
                            <Link
                                to={`/cars/${car.id}`}
                                className="mt-2 inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Rent With Us */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6 text-center">Why Rent With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div className="p-6 bg-white rounded shadow">Easy Booking</div>
                        <div className="p-6 bg-white rounded shadow">Affordable Rates</div>
                        <div className="p-6 bg-white rounded shadow">Trusted Providers</div>
                        <div className="p-6 bg-white rounded shadow">24/7 Support</div>
                    </div>
                </div>
            </section>

            {/* Extra Section 1 - Top Rated Cars */}
            <section className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">Top Rated Cars</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sampleCars.slice(0, 3).map(car => (
                        <div key={car.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold">{car.name}</h3>
                            <p>Model: {car.model}</p>
                            <p>Price: ${car.price}/day</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Extra Section 2 - Customer Testimonials */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded shadow">"Great service and smooth booking!" - Sarah ALi</div>
                        <div className="p-6 bg-white rounded shadow">"Affordable rates and reliable cars." - John</div>
                        <div className="p-6 bg-white rounded shadow">"Highly recommend RentWheels!" - Priya</div>
                    </div>
                </div>
            </section>

        </div>
    );
}
