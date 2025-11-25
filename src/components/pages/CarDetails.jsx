
import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../firebase/AuthContext";

export default function CarDetails() {
    const car = useLoaderData();
    const { user } = useContext(AuthContext);

    if (!car) return <p>Loading car details...</p>;

    const handleBookNow = async () => {
        if (!user) return toast.error("Please login to book a car");

        const bookingInfo = {
            carId: car._id,
            carName: car.title,
            rentPerDay: car.rentPerDay,
            userName: user.displayName,
            userEmail: user.email,
        };

        try {
            const res = await fetch("http://localhost:3000/book-car", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(bookingInfo),
            });
            const data = await res.json();
            if (data.success) toast.success(data.message);
            else toast.error(data.message);
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2>{car.title}</h2>
            <img src={car.imageUrl} alt={car.title} />
            <p>{car.description}</p>
            <p>Category: {car.category}</p>
            <p>Rent/day: ${car.rentPerDay}</p>
            <p>Status: {car.status}</p>

            <button onClick={handleBookNow} disabled={car.status === "Unavailable"}>
                {car.status === "Unavailable" ? "Already Booked" : "Book Now"}
            </button>
        </div>
    );
}

