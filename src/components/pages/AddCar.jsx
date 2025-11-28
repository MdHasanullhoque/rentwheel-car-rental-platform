import React, { useContext, useState } from "react";
// import { AuthContext } from "../../provider/AuthProvider";
import { AuthContext } from "../../firebase/AuthContext";
import { toast } from "react-toastify";

export default function AddCar() {
    const { user } = useContext(AuthContext);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        rentPerDay: "",
        location: "",
        imageUrl: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCar = {
            ...form,
            providerName: user?.displayName,
            providerEmail: user?.email,
        };

        const res = await fetch("https://rentwheels-api-server-seven.vercel.app/add-car", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar),
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Car added successfully!");
        } else {
            toast.error("Failed to add car.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Car</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Car Name"
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    required
                ></textarea>

                <select
                    name="category"
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Electric">Electric</option>
                </select>

                <input
                    type="number"
                    name="rentPerDay"
                    placeholder="Rent Price Per Day"
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                <button className="btn btn-primary w-full">Add Car</button>
            </form>
        </div>
    );
}
