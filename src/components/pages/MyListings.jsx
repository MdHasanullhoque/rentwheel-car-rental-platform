
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthContext";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;

        try {
            const res = await fetch(`http://localhost:3000/delete-car/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();
            if (data.success) {
                alert("Car deleted successfully");
                setCars(cars.filter(car => car._id !== id));
            } else {
                alert(data.message || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
                My Listings
            </h2>

            <table className="w-full border-collapse border border-gray-300 text-center">
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

                            <td className="p-2 flex flex-col md:flex-row justify-center gap-2">
                                <button
                                    onClick={() => navigate(`/update-car/${car._id}`)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() => handleDelete(car._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
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
