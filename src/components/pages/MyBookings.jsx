
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../firebase/AuthContext";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";

// export default function MyBookings() {
//     const { user } = useContext(AuthContext);
//     const [bookings, setBookings] = useState([]);

//     useEffect(() => {
//         if (!user) return;

//         fetch(`http://localhost:3000/my-bookings/${user.email}`)
//             .then(res => res.json())
//             .then(data => setBookings(data))
//             .catch(err => {
//                 console.error(err);
//                 toast.error("Failed to fetch your bookings");
//             });
//     }, [user]);

//     if (!user) return <p>Please login to see your bookings.</p>;

//     const handleCancel = async (bookingId) => {
//         if (!window.confirm("Are you sure to cancel this booking?")) return;

//         try {
//             const res = await fetch(`http://localhost:3000/cancel-booking/${bookingId}`, {
//                 method: "DELETE"
//             });
//             const data = await res.json();

//             if (data.success) {
//                 toast.success("Booking canceled successfully");
//                 setBookings(bookings.filter(b => b._id !== bookingId));
//             } else {
//                 toast.error(data.message || "Failed to cancel booking");
//             }
//         } catch (err) {
//             console.error(err);
//             toast.error("Error canceling booking");
//         }
//     };

//     return (
//         <div className="max-w-5xl mx-auto p-6">
//             <h2 className="text-3xl font-bold mb-4">My Bookings</h2>
//             {bookings.length === 0 ? (
//                 <p>No bookings yet.</p>
//             ) : (
//                 <table className="min-w-full border">
//                     <thead>
//                         <tr className="border-b">
//                             <th className="px-4 py-2">Car Name</th>
//                             <th className="px-4 py-2">Category</th>
//                             <th className="px-4 py-2">Rent Price</th>
//                             <th className="px-4 py-2">Status</th>
//                             <th className="px-4 py-2">Booking Date</th>
//                             <th className="px-4 py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map(b => (
//                             <tr key={b._id} className="border-b text-center">
//                                 <td className="px-4 py-2">{b.carName}</td>
//                                 <td className="px-4 py-2">{b.category || "N/A"}</td>
//                                 <td className="px-4 py-2">${b.rentPerDay}</td>
//                                 <td className="px-4 py-2">{b.status || "Booked"}</td>
//                                 <td className="px-4 py-2">{new Date(b.bookedAt).toLocaleDateString()}</td>
//                                 <td className="px-4 py-2">
//                                     <button
//                                         onClick={() => handleCancel(b._id)}
//                                         className="bg-red-600 text-white px-2 py-1 rounded"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function MyBookings() {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:3000/my-bookings/${user.email}`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(() => toast.error("Failed to fetch your bookings"));
    }, [user]);

    if (!user) return <p>Please login to see your bookings.</p>;

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure to cancel this booking?")) return;

        try {
            const res = await fetch(`http://localhost:3000/cancel-booking/${bookingId}`, {
                method: "DELETE"
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Booking canceled");
                setBookings(bookings.filter(b => b._id !== bookingId));
            } else {
                toast.error("Failed to cancel");
            }
        } catch {
            toast.error("Error canceling booking");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">My Bookings</h2>

            {/* ⭐ Mobile View → Cards (NO SCROLL) */}
            <div className="md:hidden flex flex-col gap-4">
                {bookings.map(b => (
                    <div key={b._id} className="border p-4 rounded shadow">
                        <p><strong>Car:</strong> {b.carName}</p>
                        <p><strong>Category:</strong> {b.category || "N/A"}</p>
                        <p><strong>Rent:</strong> ${b.rentPerDay}</p>
                        <p><strong>Status:</strong> {b.status || "Booked"}</p>
                        <p><strong>Date:</strong> {new Date(b.bookedAt).toLocaleDateString()}</p>

                        <button
                            onClick={() => handleCancel(b._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded mt-3 w-full"
                        >
                            Cancel Booking
                        </button>
                    </div>
                ))}
            </div>

            {/* ⭐ Desktop View → Table */}
            <table className="hidden md:table w-full border border-gray-300 text-center">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-2 py-2">Car Name</th>
                        <th className="px-2 py-2">Category</th>
                        <th className="px-2 py-2">Rent Price</th>
                        <th className="px-2 py-2">Status</th>
                        <th className="px-2 py-2">Booking Date</th>
                        <th className="px-2 py-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map(b => (
                        <tr key={b._id} className="border-b">
                            <td className="px-2 py-2">{b.carName}</td>
                            <td className="px-2 py-2">{b.category || "N/A"}</td>
                            <td className="px-2 py-2">${b.rentPerDay}</td>
                            <td className="px-2 py-2">{b.status || "Booked"}</td>
                            <td className="px-2 py-2">
                                {new Date(b.bookedAt).toLocaleDateString()}
                            </td>
                            <td className="px-2 py-2">
                                <button
                                    onClick={() => handleCancel(b._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
