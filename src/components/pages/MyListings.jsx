import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthContext";

export default function MyListings() {
    const { user } = useContext(AuthContext);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/my-listings?email=${user.email}`)
                .then(res => res.json())
                .then(data => setCars(data.data || []));
        }
    }, [user]);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">My Listings</h2>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Car Name</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Rent</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {cars.map(car => (
                        <tr key={car._id} className="border">
                            <td className="p-2">{car.title}</td>
                            <td className="p-2">{car.category}</td>
                            <td className="p-2">${car.rentPerDay}</td>
                            <td className="p-2">{car.status}</td>
                            <td className="p-2">
                                <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2">
                                    Update
                                </button>
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
