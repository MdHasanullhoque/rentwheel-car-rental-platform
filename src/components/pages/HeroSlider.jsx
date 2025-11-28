import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export default function HeroSlider() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // modal state

    const handleSearch = async () => {
        if (!searchTerm) {
            toast.error("Please enter a car name");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`https://rentwheels-api-server-seven.vercel.app/search-cars?title=${searchTerm}`);
            if (!res.ok) throw new Error("Search failed");

            const data = await res.json();
            setSearchResults(data);
            setModalOpen(true); // search results show modal
        } catch (err) {
            console.error(err);
            toast.error("Failed to search cars");
        }
        setLoading(false);
    };


    //  Slider Settings
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    return (
        <div className="my-6 text-center">

            {/*  Hero Slider Start */}

            <div className="hero-section my-6 max-w-6xl mx-auto">

                <Slider {...settings}>

                    <div className="h-64 md:h-96 relative">
                       
                        <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-bold bg-black bg-opacity-30">
                            Fast & Easy Car Rentals
                        </h1>
                    </div>

                    <div className="h-64 md:h-96 relative">
                       
                        <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-bold bg-black bg-opacity-30">
                            Affordable Daily Rentals
                        </h1>
                    </div>

                    <div className="h-64 md:h-96 relative">
                        
                        <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-bold bg-black bg-opacity-30">
                            24/7 Customer Support
                        </h1>
                    </div>





                </Slider>
            </div>

            {/* Hero Slider End */}


            {/* Search Input */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cars by name..."
                className="border p-2 rounded-l-md w-64"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 rounded-r-md h-11"
            >
                Search
            </button>

            {loading && <p className="mt-2">Searching...</p>}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto p-6 relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Search Results</h2>

                        {searchResults.length === 0 ? (
                            <p>No cars found for "{searchTerm}"</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {searchResults.map(car => (
                                    <div key={car._id} className="border p-4 rounded shadow">
                                        <img
                                            src={car.imageUrl}
                                            alt={car.title}
                                            className="w-full h-40 object-cover rounded mb-2"
                                        />
                                        <h3 className="font-semibold">{car.title}</h3>
                                        <p>Category: {car.category}</p>
                                        <p>Rent/day: ${car.rentPerDay}</p>
                                        <Link to={`/Featured-Cars/${car._id}`}>
                                            <button className="mt-2 py-1 px-3 bg-blue-600 text-white rounded">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
