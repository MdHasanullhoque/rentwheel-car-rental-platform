import React from 'react';
import { Link } from 'react-router-dom';

// Sample cars (same as HomePage for demo)
const sampleCars = [
    { id: 1, name: 'Honda Civic', price: 50, model: 'Sedan', provider: 'Alice' },
    { id: 2, name: 'Toyota Corolla', price: 45, model: 'Sedan', provider: 'Bob' },
    { id: 3, name: 'Tesla Model 3', price: 120, model: 'Electric', provider: 'Charlie' },
    { id: 4, name: 'BMW X5', price: 150, model: 'SUV', provider: 'David' },
    { id: 5, name: 'Mercedes C-Class', price: 140, model: 'Luxury', provider: 'Eva' },
    { id: 6, name: 'Hyundai i20', price: 35, model: 'Hatchback', provider: 'Frank' },
];

export default function BrowseCars() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Browse All Cars</h1>
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
        </div>
    );
}
