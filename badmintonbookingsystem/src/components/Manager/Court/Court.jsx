import { useEffect, useState } from "react";
import { fetchBadmintonCenterByManager, updateCenterStatus } from "../../../services/centerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faToggleOff, faToggleOn, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchCourtsByCenterId, updateCourtStatus } from "../../../services/courtService";
import AddCourtModal from "./AddCourtModal";
import UpdateCourtModal from "./UpdateCourtModal";

export default function Courts() {
    const [courts, setCourts] = useState([]);
    const [center, setCenter] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const token = localStorage.getItem("token");

    const courtsPerPage = 5; // Adjust the number of courts to display per page as needed

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                if (token) {
                    const centerData = await fetchBadmintonCenterByManager(token);
                    console.log('Fetched Center Data:', centerData);
                    setCenter(centerData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCenterData();
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            if (center) {
                try {
                    const courtsData = await fetchCourtsByCenterId(center[0].id);
                    setCourts(courtsData);
                    console.log('Fetched Courts Data:', courtsData);
                    setTotalPages(Math.ceil(courtsData.length / courtsPerPage));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData();
        localStorage.setItem('currentPage', currentPage);
    }, [center, currentPage]);

    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    const handleCourtAdded = (newCourt) => {
        setCourts((prevCourts) => [...prevCourts, newCourt]);
        setTotalPages(Math.ceil((courts.length + 1) / courtsPerPage)); // Update total pages after adding a new court
    };

    const handleOpenUpdateModal = (court) => {
        setUpdateModalOpen(true);
        setSelectedCourt(court);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedCourt(null);
    };

    const handleCourtUpdated = (updatedCourt) => {
        setCourts((prevCourts) =>
            prevCourts.map((court) =>
                court.id === updatedCourt.id ? updatedCourt : court,
            ),
        );
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            const page = currentPage + 1;
            setCurrentPage(page);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleChangeStatus = async (id) => {
        try {
            console.log(id);
            const updatedCourt = await updateCourtStatus(id);
            setCourts((prevCourts) =>
                prevCourts.map((court) =>
                    court.id === updatedCourt.id ? { ...court, isActive: updatedCourt.isActive } : court
                )
            );
        } catch (error) {
            console.error('Error changing court status:', error);
        }
    };

    // Calculate the courts to display on the current page
    const startIndex = (currentPage - 1) * courtsPerPage;
    const courtsToDisplay = courts.slice(startIndex, startIndex + courtsPerPage);

    return (
        <>
            <div className='flex'>
                <div className='w-5/6 space-y-4 p-4'>
                    <button
                        className='p-4 bg-blue-500 text-white px-2 py-1 rounded'
                        onClick={handleOpenAddModal}
                    >
                        Thêm sân
                    </button>
                    <div className='bg-white rounded-lg overflow-hidden shadow-lg'>
                        <div className='grid grid-cols-8 gap-4 items-center p-2 bg-gray-200'>
                            <div className='text-center text-lg font-bold col-span-2'>
                                Ảnh
                            </div>
                            <div className='text-center text-lg font-bold col-span-2'>
                                Tên sân
                            </div>
                            <div className='text-center text-lg font-bold col-span-2'>
                                Tên trung tâm
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Trạng thái
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Action
                            </div>
                        </div>
                        {courtsToDisplay.map((court) => (
                            <div
                                key={court.id}
                                className='grid grid-cols-8 gap-4 items-center p-2 border-b hover:bg-gray-100'
                            >
                                <div className='flex justify-center col-span-2'>
                                    <img className="object-contain w-40 h-24" src={court.courtImgUrls[0]} alt="Court" />
                                </div>
                                <div className='text-center flex items-center justify-center col-span-2'>
                                    <label className='text-gray-600'>
                                        {court.courtName}
                                    </label>
                                </div>
                                <div className='text-center flex items-center justify-center col-span-2'>
                                    {court.centerName}
                                </div>
                                <div className='text-center flex items-center justify-center' >
                                    <button onClick={() => handleChangeStatus(court.id)}
                                        title={court.isActive ? "Active" : "InActive"}
                                    >
                                        <FontAwesomeIcon
                                            icon={court.isActive ? faToggleOn : faToggleOff}
                                            color={court.isActive ? "#07881d" : "#8a0505"}
                                            size="2x"
                                        />
                                    </button>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <button onClick={() => handleOpenUpdateModal(court)}>
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            style={{ color: "#B197FC" }}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='flex justify-between p-2 bg-gray-200'>
                            <button
                                className='bg-gray-500 text-white px-3 py-2 rounded disabled:opacity-50'
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className='text-lg font-bold'>
                                Page {currentPage}
                            </span>
                            <button
                                className='bg-gray-500 text-white px-3 py-2 rounded disabled:opacity-50'
                                onClick={nextPage}
                                disabled={currentPage >= totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <AddCourtModal
                    isOpen={isAddModalOpen}
                    onClose={handleCloseAddModal}
                    onCourtAdded={handleCourtAdded}
                />
                <UpdateCourtModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    courtId={selectedCourt?.id}
                    initialCourtData={selectedCourt}
                    onCourtUpdated={handleCourtUpdated}
                />
            </div>
        </>
    );
}