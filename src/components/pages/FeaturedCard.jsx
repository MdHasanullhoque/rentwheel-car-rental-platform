import React from 'react';

const FeaturedCard = ({ car }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold">{car.name}</h3>
            <p>Model: {car.model}</p>
            <p>Price: ${car.price}/day</p>
            <p>Provider: {car.provider}</p>
            {car.image && (
                <img
                    src={car.image}
                    alt={car.name}
                    className="mt-2 w-full h-48 object-cover rounded"
                />
            )}
        </div>
    );
};

export default FeaturedCard;
