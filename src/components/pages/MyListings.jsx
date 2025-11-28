
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyListings() {
    const { user } = useContext(AuthContext);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://rentwheels-api-server-seven.vercel.app/my-listings?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("My Listings response:", data);
                // Flexible: backend jodi { data: [...] } or [...] return kore
                setCars(data.data || data || []);
            })
            .catch((err) => {
                console.error("Failed to fetch My Listings:", err);
                toast.error("Failed to load your listings.");
            });
    }, [user]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;

        try {
            const res = await fetch(
                `https://rentwheels-api-server-seven.vercel.app/delete-car/${id}`,
                { method: "DELETE" }
            );
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Car deleted successfully");
                setCars(cars.filter((car) => car._id !== id));
            } else {
                toast.error(data.message || "Failed to delete");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete car");
        }
    };

    if (!user) {
        return <p className="text-center mt-10">Please login to view your listings.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">My Listings</h2>

            {cars.length === 0 ? (
                <p className="text-center">You have no listings yet.</p>
            ) : (
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
                        {cars.map((car) => (
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
            )}
        </div>
    );
}
