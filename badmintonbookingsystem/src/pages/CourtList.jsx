import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCenters } from '../services/centerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { fetchCourtsByCenterId } from '../services/courtService';

const perPage = 9;

const CourtList = () => {
    const dispatch = useDispatch();
    const { centerId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [courtsPerPage] = useState(9);

    const [courts, setCourts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courtsData = await fetchCourtsByCenterId(centerId);
                setCourts(courtsData);
                console.log(courts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage, dispatch]);

    const indexOfLastUser = currentPage * courtsPerPage;
    const indexOfFirstUser = indexOfLastUser - courtsPerPage;
    const currentCourt = courts.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.max(Math.ceil(courts.length / courtsPerPage), 1);
    const nextPage = () => {
        if (currentPage < Math.ceil(courts.length / courtsPerPage)) {
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
            {console.log("court")}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentCourt?.map(court => (
                    <div key={court.id} className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
                        <div className="relative">
                            <Link to={`/timeslots/court/${court.id}`}>
                                <div className="bg-white flex justify-court">
                                    <img
                                        src={court.courtImgUrls[0]}
                                        alt={court.courtImgUrls[0]}
                                        className="h-48 w-full object-cover rounded-t-lg mb-4"
                                    />
                                </div>
                            </Link>
                        </div>
                        <Link to={`/timeslots/court/${court.id}`}>
                            <h2 className="text-xl font-semibold text-gray-800">{court.courtName}</h2>
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

export default CourtList;