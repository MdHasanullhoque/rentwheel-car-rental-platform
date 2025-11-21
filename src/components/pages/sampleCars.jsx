import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Sample car data
const sampleCars = [
  { id: 1, name: 'Honda Civic', description: 'Reliable sedan for city driving.', price: 50, model: 'Sedan', provider: 'Alice', email: 'alice@example.com', location: 'Dhaka', imageURL: 'https://source.unsplash.com/600x400/?car,1' },
  { id: 2, name: 'Tesla Model 3', description: 'Electric car with autopilot.', price: 120, model: 'Electric', provider: 'Charlie', email: 'charlie@example.com', location: 'Dhaka', imageURL: 'https://source.unsplash.com/600x400/?car,3' },
  { id: 3, name: 'BMW X5', description: 'Luxury SUV for comfortable trips.', price: 150, model: 'SUV', provider: 'David', email: 'david@example.com', location: 'Dhaka', imageURL: 'https://source.unsplash.com/600x400/?car,4' },
];

export default function CarDetails() {
  const { id } = useParams();
  const car = sampleCars.find(c => c.id === parseInt(id));

  if (!car) return <div className="text-center py-20">Car not found!</div>;

  const handleBooking = () => {
    toast.success(`You have booked ${car.name} successfully!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={car.imageURL}
          alt={car.name}
          className="w-full h-80 object-cover rounded-md shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
          <p className="text-gray-700 mb-2">{car.description}</p>
          <p className="mb-1"><strong>Category:</strong> {car.model}</p>
          <p className="mb-1"><strong>Rent Price:</strong> ${car.price}/day</p>
          <p className="mb-1"><strong>Location:</strong> {car.location}</p>
          <p className="mb-1"><strong>Provider:</strong> {car.provider} ({car.email})</p>

          <button
            onClick={handleBooking}
            className="mt-4 py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
