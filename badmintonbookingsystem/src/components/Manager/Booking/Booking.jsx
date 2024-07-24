import { useEffect, useState } from "react";
import { fetchBadmintonCenterByManager, updateCenterStatus } from "../../../services/centerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faToggleOff, faToggleOn, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchBookingsByCenterId } from "../../../services/bookingService";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [center, setCenter] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const token = localStorage.getItem("token");

    const bookingsPerPage = 5; // Adjust the number of courts to display per page as needed

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
        const fetchBookingsData = async () => {
            if (center) {
                try {
                    const bookingsData = await fetchBookingsByCenterId(center[0].id);
                    setBookings(bookingsData);
                    console.log('Fetched Bookings Data:', bookingsData);
                    setTotalPages(Math.ceil(bookingsData.length / bookingsPerPage));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchBookingsData();
        localStorage.setItem('currentPage', currentPage);
    }, [center, currentPage]);

    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    const handleBookingAdded = (newBooking) => {
        setBookings((prevBookings) => [...prevBookings, newBooking]);
        setTotalPages(Math.ceil((bookings.length + 1) / bookingsPerPage)); // Update total pages after adding a new booking
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
            setBookings((prevCenters) =>
                prevCenters.map((center) =>
                    center.id === updatedCenter.id ? { ...center, isActive: updatedCenter.isActive } : center
                )
            );
        } catch (error) {
            console.error('Error changing center status:', error);
        }
    };

    // Calculate the courts to display on the current page
    const startIndex = (currentPage - 1) * bookingsPerPage;
    const bookingsToDisplay = bookings.slice(startIndex, startIndex + bookingsPerPage);

    return (
        <div className='flex justify-center'>
            <div className='w-full space-y-4 p-4'>
                {/* New Header and Search Filter Section */}
                <div className='bg-white rounded-lg overflow-hidden shadow-lg p-4'>
                    <div className='flex justify-center items-center mb-4'>
                        <h2 className='text-xl font-bold'>Các lịch đặt sân</h2>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='flex space-x-60'>
                            <div className='mr-4'>
                                <label className='block text-gray-700'>Từ ngày</label>
                                <input type='date' className='border rounded px-4 py-1' />
                            </div>
                            <div className='mr-4'>
                                <label className='block text-gray-700'>Đến ngày</label>
                                <input type='date' className='border rounded px-4 py-1' />
                            </div>
                            <button className='bg-blue-500 text-white px-8 py-1 rounded'>Search</button>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-lg overflow-hidden shadow-lg'>
                    <div className='grid grid-cols-8 gap-4 items-center p-4 bg-gray-200'>
                        <div className='text-center text-lg font-bold col-span-1'>Tên khách hàng</div>
                        <div className='text-center text-lg font-bold col-span-1'>Email</div>
                        <div className='text-center text-lg font-bold col-span-1'>Số điện thoại</div>
                        <div className='text-center text-lg font-bold col-span-1'>Sân</div>
                        <div className='text-center text-lg font-bold col-span-1'>Ngày đặt</div>
                        <div className='text-center text-lg font-bold col-span-1'>Bắt đầu</div>
                        <div className='text-center text-lg font-bold col-span-1'>Kết thúc</div>
                        <div className='text-center text-lg font-bold col-span-1'>Giá</div>
                        {/* <div className='text-center text-lg font-bold col-span-1'>Action</div> */}
                    </div>
                    {bookingsToDisplay.map((booking) => (
                        <div key={booking.id} className='grid grid-cols-8 gap-4 items-center p-4 border-b hover:bg-gray-100'>
                            <div className='text-center flex items-center justify-center col-span-1'>
                                <label className='text-gray-600'>{booking.customerName}</label>
                            </div>
                            <div className='text-center flex items-center justify-center col-span-1'>{booking.customerEmail}</div>
                            <div className='text-center flex items-center justify-center col-span-1'>{booking.customerPhone}</div>
                            <div className='text-center flex items-center justify-center col-span-1'>{booking.courtName}</div>
                            <div className='text-center flex items-center justify-center col-span-1'>{booking.bookingDate}</div>
                            <div className='text-center flex items-center justify-center col-span-1'>{booking.startTime}</div>
                            <div className='text-center flex items-center justify-center col-span-1'>{booking.endTime}</div>
                            <div className='text-center flex items-center justify-center col-span-1'>{booking.slotPrice}</div>
                            {/* <div className='flex items-center justify-center'>
                                <button>
                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#8a0505" }} size="2x" />
                                </button>
                            </div> */}
                        </div>
                    ))}
                    <div className='flex justify-between p-4 bg-gray-200'>
                        <button
                            className='bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50'
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className='text-lg font-bold'>Page {currentPage}</span>
                        <button
                            className='bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50'
                            onClick={nextPage}
                            disabled={currentPage >= totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}