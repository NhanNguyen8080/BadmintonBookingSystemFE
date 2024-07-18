import { useEffect, useState } from "react";
import AddCenterModal from "./AddCenterModal";
import { fetchAllCenters, fetchCenters, updateCenterStatus } from "../../../services/centerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faToggleOff, faToggleOn, faTrash } from "@fortawesome/free-solid-svg-icons";
import UpdateCenterModal from "./UpdateCenterModal";


export default function Centers() {
    const [centers, setCenters] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState( parseInt(localStorage.getItem('currentPage')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const centersData = await fetchAllCenters(currentPage);
                setCenters(centersData);
                setTotalPages(10);
            } catch (error) {
                console.log(error);
            }
        };
        localStorage.setItem('currentPage', currentPage);
        fetchData();
    }, [currentPage]);
    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    const handleOpenUpdateModal = (center) => {
        setUpdateModalOpen(true);
        setSelectedCenter(center);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedCenter(null);
    };

    const handleCenterAdded = (newCenter) => {
        setCenters((prevCenters) =>[...prevCenters, newCenter]);
    };

    const handleCenterUpdated = (updatedCenter) => {
        setCenters((prevCenters) =>
            prevCenters.map((center) =>
                center.id === updatedCenter.id ? updatedCenter : center,
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
            const updatedCenter = await updateCenterStatus(id);
            setCenters((prevCenters) =>
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
            <div className=''>
                <div className='w-5/6 space-y-4 p-4'>
                    <button
                        className='p-4 bg-blue-500 text-white px-2 py-1 rounded'
                        onClick={handleOpenAddModal}
                    >
                        Add New
                    </button>
                    <div className='bg-zinc-100 rounded-lg overflow-hidden shadow-lg'>
                        <div className='grid grid-cols-8 gap-4 items-center justify-between p-2 bg-zinc-300'>
                            <div className='text-center text-lg font-bold'>
                                Ảnh
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Tên trung tâm
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Chủ sỡ hữu
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Địa điểm
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Mở cửa
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Đóng cửa
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Trạng thái
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Action
                            </div>
                        </div>
                        {centers.map((center) => (
                            <div
                                key={center.id}
                                className='grid grid-cols-8 gap-4 items-center justify-between p-2 border-b hover:bg-zinc-200'
                            >
                                <div className='text-center items-center justify-center'>
                                    <img className="object-scale-down w-40 h-24" src={center.imgAvatar} alt="Badminton Center" />
                                </div>
                                <div className='text-center flex items-center justify-center'>
                                    <label className='text-gray-600'>
                                        {center.name}
                                    </label>
                                </div>
                                <div className='text-center flex items-center justify-center'>
                                    {center.managerName}
                                </div>
                                <div className='text-center flex items-center justify-center'>
                                    <label className='text-gray-600'>
                                        {center.location}
                                    </label>
                                </div>
                                <div className='text-center flex items-center justify-center'>
                                    <label className='text-gray-600'>
                                        {center.operatingTime}
                                    </label>
                                </div>
                                <div className='text-center flex items-center justify-center'>
                                    {center.closingTime}
                                </div>
                                <div className='text-center flex items-center justify-center' >
                                    <button onClick={() => handleChangeStatus(center.id)}
                                        title={center.isActive ? "Active" : "InActive"}
                                        >
                                        <FontAwesomeIcon
                                            icon={center.isActive ? faToggleOn : faToggleOff}
                                            color="#07881d"
                                        />
                                    </button>
                                </div>
                                <div className='space-x-4 flex items-center justify-center'>
                                    <button
                                    onClick={() => handleOpenUpdateModal(center)}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#B197FC", }} />
                                    </button>
                                    <button
                                    //onClick={() => handleOpenUpdateModal(user)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#8a0505" }} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='flex justify-between p-2 bg-zinc-300'>
                            <button
                                className='bg-gray-500 text-white px-2 py-1 rounded'
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className='text-lg font-bold'>
                                Page {currentPage}
                            </span>
                            <button
                                className='bg-gray-500 text-white px-2 py-1 rounded'
                                onClick={nextPage}
                                disabled={
                                    currentPage === 15
                                }
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <AddCenterModal
                    isOpen={isAddModalOpen}
                    onClose={handleCloseAddModal}
                    onCenterAdded={handleCenterAdded}
                />
                
                <UpdateCenterModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    centerId={selectedCenter?.id}
                    initialCenterData={selectedCenter}
                    onCenterUpdated={handleCenterUpdated}
                />
            </div>
        </>
    );
}