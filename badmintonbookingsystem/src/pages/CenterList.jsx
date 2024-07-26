import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCenters } from '../services/centerService';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CenterList = ({ centers }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [centersPerPage] = useState(9);


    const indexOfLastCenter = currentPage * centersPerPage;
    const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
    const currentCenters = centers.slice(indexOfFirstCenter, indexOfLastCenter);

    const totalPages = Math.max(Math.ceil(centers.length / centersPerPage), 1);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentCenters.map(center => (
                    <div key={center.id} className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
                        <div className="relative">
                            <Link to={`/badminton-centers/${center.id}`}>
                                <div className="bg-white flex justify-center">
                                    <img
                                        src={center.imgAvatar}
                                        alt={center.imgAvatar}
                                        className="h-48 w-full object-cover rounded-t-lg mb-4"
                                    />
                                </div>
                            </Link>
                        </div>
                        <Link to={`/badminton-centers/${center.id}`}>
                            <p className="text-center text-orange-500 mb-2">Giờ mở cửa: {center.operatingTime} - Giờ đóng cửa: {center.closingTime}</p>
                            <h2 className="text-center text-xl font-semibold text-gray-800">{center.name}</h2>
                            <p className="text-center">{center.location}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span className='text-lg font-bold text-gray-800'>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default CenterList;