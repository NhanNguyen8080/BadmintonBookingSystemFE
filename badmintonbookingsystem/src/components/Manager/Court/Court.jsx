import { useEffect, useState } from "react";
import { fetchBadmintonCenterByManager, updateCenterStatus } from "../../../services/centerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faToggleOff, faToggleOn, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchCourtsByCenterId } from "../../../services/courtService";

export default function Courts() {
    const [courts, setCourts] = useState([]);
    const [center, setCenter] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                if (token) {
                    const centerData = await fetchBadmintonCenterByManager(token);
                    console.log(centerData)
                    setCenter(centerData);
                    console.log(center)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCenterData();
        const fetchData = async () => {
            try {
                const courtsData = await fetchCourtsByCenterId(center[0].id);
                setCourts(courtsData);
                console.log(courts);
                setTotalPages(10);
            } catch (error) {
                console.log(error);
            }
        };
        localStorage.setItem('currentPage', currentPage);
        fetchData();
    }, [currentPage]);

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
            const updatedCenter = await updateCenterStatus(id);
            setCourts((prevCenters) =>
                prevCenters.map((center) =>
                    center.id === updatedCenter.id ? { ...center, isActive: updatedCenter.isActive } : center
                )
            );
        } catch (error) {
            console.error('Error changing center status:', error);
        }
    };

    return (
        <>
            <div className='flex'>
                <div className='w-5/6 space-y-4 p-4'>
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
                        {courts.map((court) => (
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
                                    <button onClick={() => handleChangeStatus(center.id)}
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
                                    <button>
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#8a0505" }} size="2x" />
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
                                disabled={currentPage === 15}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}