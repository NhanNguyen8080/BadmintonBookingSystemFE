import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCenters } from '../services/centerService';
import { selectCenters, setCenters } from '../redux/slices/centerSlice';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const perPage = 9;

const CenterList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [centersPerPage] = useState(9);

    const [centers, setCenters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const centersData = await fetchCenters();
                setCenters(centersData);
                console.log(centers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage, dispatch]);

    const indexOfLastUser = currentPage * centersPerPage;
    const indexOfFirstUser = indexOfLastUser - centersPerPage;
    const currentCenter = centers.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => {
        if (currentPage < Math.ceil(centers.length / centersPerPage)) {
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
            {console.log("center")}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentCenter?.map(center => (
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
                            <p className="text-orange-500 mb-2">Giờ mở cửa: {center.operatingTime} - Giờ đóng cửa: {center.closingTime}</p>
                            <h2 className="text-xl font-semibold text-gray-800">{center.name}</h2>
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
                    Page {currentPage} of {Math.ceil(centers.length / centersPerPage)}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(centers.length / centersPerPage)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );

};

export default CenterList;