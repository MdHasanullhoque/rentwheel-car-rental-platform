import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import FeaturedCard from './FeaturedCard';
import HeroSlider from './HeroSlider';

// Sample cars for UI preview


export default function HomePage() {


    const data = useLoaderData()
    console.log(data)

    return (

        <div className="space-y-20">

            {/* Hero Banner */}
            <section className="relative h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">RentWheels - Your Trusted Car Rental</h1>
                    <p className="text-gray-700 mb-6">Book cars quickly, easily, and safely from local providers.</p>
                    <Link to="/browse-cars" className="py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700">Browse Cars</Link>
                </div>
            </section>


            {/* hero slider */}

            <HeroSlider />


            {/* Featured Cars */}


            <section className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Featured Cars</h2>

                {data.length === 0 ? (
                    <p className="text-center">Loading Featured Cars...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {data.slice(0, 6).map(car => (
                            <div key={car._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                                <img
                                    src={car.imageUrl}
                                    alt={car.title}
                                    className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-cover rounded mb-2"
                                />
                                <h3 className="text-lg md:text-xl font-semibold">{car.title}</h3>
                                {/* <p className="text-gray-600 text-sm md:text-base">{car.description}</p> */}
                                <p className="mt-1 text-sm md:text-base">Category: {car.category}</p>
                                {/* <p className="text-sm md:text-base">Rent per day: ${car.rentPerDay}</p> */}
                                <p>Rent/day: $<span className="font-semibold">{car.rentPerDay}</span></p>
                                <p className="text-sm md:text-base">Location: {car.location}</p>
                                <p className="text-sm md:text-base">Provider: {car.providerName}</p>
                                {/* <p className="text-sm md:text-base">Status: {car.status}</p> */}
                                <p className={`mb-2 font-semibold ${car.status === "Unavailable" ? "text-red-400" : "text-green-600"
                                    }`}>
                                    <span>Status:</span> {car.status}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">

                                    {car.tags.map(tag => (
                                        <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs md:text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* <button>view details</button> */}

                                <Link to={`/Featured-Cars/${car._id}`}>
                                    <button className="mt-3 py-2 px-4 bg-blue-600 text-white rounded">
                                        View Details
                                    </button>
                                </Link>




                            </div>
                        ))}
                    </div>
                )}
            </section>



            {/* Why Rent With Us */}
            <section className="bg-gray-50 py-12 px-4 md:px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-10 border-b-2 border-indigo-500 inline-block pb-1">
                        Why Rent With Us?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Easy Booking */}
                        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col items-center">
                            {/* <span className="text-5xl mb-3 text-blue-500">img</span> */}
                            <h3 className="font-semibold mb-2 text-lg sm:text-xl">Easy Booking</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Book cars in minutes with a simple interface.</p>
                        </div>

                        {/* Affordable Rates */}
                        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col items-center">
                            {/* <span className="text-5xl mb-3 text-green-500">img</span> */}
                            <h3 className="font-semibold mb-2 text-lg sm:text-xl">Affordable Rates</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Get the best prices for top-quality cars.</p>
                        </div>

                        {/* Trusted Providers */}
                        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col items-center">
                            {/* <span className="text-5xl mb-3 text-yellow-500">img</span> */}
                            <h3 className="font-semibold mb-2 text-lg sm:text-xl">Trusted Providers</h3>
                            <p className="text-gray-600 text-sm sm:text-base">We work only with verified car owners.</p>
                        </div>

                        {/* 24/7 Support */}
                        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col items-center">
                            {/* <span className="text-5xl mb-3 text-red-500">img</span> */}
                            <h3 className="font-semibold mb-2 text-lg sm:text-xl">24/7 Support</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Always here to help you anytime, anywhere.</p>
                        </div>

                    </div>
                </div>
            </section>





            {/* Extra Section 1 - Top Rated Cars */}
            {/* Top Rated Cars */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center border-b-2 border-indigo-500 inline-block pb-1">
                    Top Rated Cars
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.slice(0, 3).map(car => (
                        <div
                            key={car._id}
                            className="border rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-white"
                        >
                            <img
                                src={car.imageUrl}
                                alt={car.title}
                                className="w-full h-48 sm:h-56 object-cover rounded-t-xl"
                            />
                            <div className="p-4">
                                <h3 className="text-lg sm:text-xl font-bold mb-1">{car.title}</h3>
                                <p className="text-gray-600 text-sm sm:text-base mb-1">{car.description}</p>
                                <p className="text-sm sm:text-base mb-1">
                                    <span className="font-semibold">Rent/day:</span> ${car.rentPerDay}
                                </p>
                                <p className="text-sm sm:text-base mb-1">
                                    <span className="font-semibold">Category:</span> {car.category}
                                </p>
                                <p className="text-sm sm:text-base">
                                    <span className="font-semibold">Provider:</span> {car.providerName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>






            {/* Extra Section 2 - Customer Testimonials */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded shadow">"Great service and smooth booking!" - Sarah ALi</div>
                        <div className="p-6 bg-white rounded shadow">"Affordable rates and reliable cars." - John</div>
                        <div className="p-6 bg-white rounded shadow">"Highly recommend RentWheels!" - Priya</div>
                    </div>
                </div>
            </section>

        </div>
    );
}
