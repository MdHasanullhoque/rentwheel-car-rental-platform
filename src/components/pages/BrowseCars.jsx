
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BrowseCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/Featured-Cars")
            .then(res => res.json())
            .then(data => {
                // available
                const availableCars = data.filter(car => car.status === "Available");
                setCars(availableCars);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Loading cars...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Browse Cars</h2>
            {cars.length === 0 ? (
                <p>No cars available right now.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map(car => (
                        <div key={car._id} className="border rounded-lg shadow p-4">
                            <img
                                src={car.imageUrl}
                                alt={car.title}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                            <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                            <p className="text-gray-600 mb-1">{car.description}</p>
                            <p className="mb-1">
                                <strong>Category:</strong> {car.category}
                            </p>
                            <p className="mb-1">
                                <strong>Rent/day:</strong> ${car.rentPerDay}
                            </p>
                            <p className={`mb-2 font-semibold ${car.status === "Unavailable" ? "text-red-600" : "text-green-600"}`}>
                                <strong>Status:</strong> {car.status}
                            </p>
                            <Link
                                to={`/Featured-Cars/${car._id}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
