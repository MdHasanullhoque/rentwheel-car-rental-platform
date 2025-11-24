// import React from 'react';
// import { useLoaderData } from 'react-router-dom';


// const CarDetails = () => {

//     const car = useLoaderData();


//     return (
//         <div>
//             <div className="max-w-4xl mx-auto p-6">
//                 <h2 className="text-3xl font-bold mb-4">{car.title}</h2>
//                 <img src={car.imageUrl} className="w-full h-64 object-cover rounded mb-4" />

//                 <h3 className="text-lg md:text-xl font-semibold">{car.title}</h3>
//                 <p className="text-gray-600 text-sm md:text-base">{car.description}</p>
//                 <p className="mt-1 text-sm md:text-base">Category: {car.category}</p>
//                 <p className="text-sm md:text-base">Rent per day: ${car.rentPerDay}</p>
//                 <p className="text-sm md:text-base">Location: {car.location}</p>
//                 <p className="text-sm md:text-base">Provider: {car.providerName}</p>
//                 <p className="text-sm md:text-base">Status: {car.status}</p>
//             </div>
//         </div>
//     );
// };

// export default CarDetails;


import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function CarDetails() {
    const car = useLoaderData();

    if (!car) return <p>Loading car details...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">{car.title}</h2>
            <img src={car.imageUrl} alt={car.title} className="w-full h-64 object-cover rounded mb-4" />
            <p className="mb-2">{car.description}</p>
            <p className="mb-2"><strong>Category:</strong> {car.category}</p>
            <p className="mb-2"><strong>Rent/day:</strong> ${car.rentPerDay}</p>
            <p className="mb-2"><strong>Provider:</strong> {car.providerName}</p>
            <p className="mb-2"><strong>Status:</strong> {car.status}</p>
        </div>
    );
}
