import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../firebase/AuthContext";

export default function UpdateCar() {
    const { id } = useParams(); // URL থেকে car id
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch car data
    useEffect(() => {
        fetch(`http://localhost:3000/Featured-Cars/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCar(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load car data");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!car) return <p>Car not found</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCar = {
            title: car.title,
            description: car.description,
            category: car.category,
            rentPerDay: car.rentPerDay,
            location: car.location,
            imageUrl: car.imageUrl,
            providerName: car.providerName,
            providerEmail: car.providerEmail,
        };

        try {
            const res = await fetch(`http://localhost:3000/update-car/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCar),
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Car updated successfully!");
                navigate("/my-listings"); // redirect back
            } else {
                toast.error(data.message || "Update failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">Update Car</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={car.title}
                    onChange={(e) => setCar({ ...car, title: e.target.value })}
                    placeholder="Car Name"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    value={car.description}
                    onChange={(e) => setCar({ ...car, description: e.target.value })}
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                />
                <select
                    value={car.category}
                    onChange={(e) => setCar({ ...car, category: e.target.value })}
                    className="w-full border p-2 rounded"
                >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Electric">Electric</option>
                </select>
                <input
                    type="number"
                    value={car.rentPerDay}
                    onChange={(e) => setCar({ ...car, rentPerDay: e.target.value })}
                    placeholder="Rent Price per day"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    value={car.location}
                    onChange={(e) => setCar({ ...car, location: e.target.value })}
                    placeholder="Location"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    value={car.imageUrl}
                    onChange={(e) => setCar({ ...car, imageUrl: e.target.value })}
                    placeholder="Image URL"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    value={car.providerName}
                    readOnly
                    className="w-full border p-2 rounded bg-gray-200"
                />
                <input
                    type="text"
                    value={car.providerEmail}
                    readOnly
                    className="w-full border p-2 rounded bg-gray-200"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Update Car
                </button>
            </form>
        </div>
    );
}
