import { useEffect, useState } from "react";
import { fetchBadmintonCenterByManager } from "../../../services/centerService";
import { fetchSearchedBookings } from "../../../services/bookingService";
import { changeBookingStatus } from "../../../services/bookingService";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [center, setCenter] = useState(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const token = localStorage.getItem("token");

    const bookingsPerPage = 5;

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                if (token) {
                    const centerData = await fetchBadmintonCenterByManager(token);
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
                    const bookingsData = await fetchSearchedBookings(center[0].id, fromDate, toDate, customerName, customerEmail, customerPhone);
                    setBookings(bookingsData);
                    setTotalPages(Math.ceil(bookingsData.length / bookingsPerPage));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchBookingsData();
        localStorage.setItem('currentPage', currentPage);
    }, [center, currentPage, fromDate, toDate, customerName, customerEmail, customerPhone]);

    const handleSearch = () => {
        setCurrentPage(1);
    };

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

    const updateStatus = async (id, status) => {
        try {
            console.log(id)
            console.log(status)
            await changeBookingStatus(id, status);
            const updatedBookings = bookings.map(booking => booking.id === id ? { ...booking, reservationStatus: status } : booking);
            setBookings(updatedBookings);
        } catch (error) {
            console.log(error);
        }
    };

    const statusOptions = [
        { value: "NotCheckedIn", label: 'NotCheckedIn' },
        { value: "CheckedIn", label: 'CheckedIn' },
        { value: "Completed", label: 'Completed' },
        { value: "Cancelled", label: 'Cancelled' },
    ];

    const getStatusLabel = (status) => {
        const option = statusOptions.find(option => option.value === status);
        return option ? option.label : '';
    };

    const startIndex = (currentPage - 1) * bookingsPerPage;
    const bookingsToDisplay = bookings.slice(startIndex, startIndex + bookingsPerPage);

    return (
        <div className='flex justify-center'>
            <div className='w-full space-y-4 p-4'>
                <div className='bg-white rounded-lg overflow-hidden shadow-lg p-4'>
                    <div className='flex justify-center items-center mb-4'>
                        <h2 className='text-xl font-bold'>Các lịch đặt sân</h2>
                    </div>
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-3 gap-4 w-full max-w-3xl'>
                            <div className='col-span-1'>
                                <label className='block text-gray-700 text-sm'>Từ ngày</label>
                                <input
                                    type='date'
                                    className='border rounded px-2 py-1 w-full'
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </div>
                            <div className='col-span-1'>
                                <label className='block text-gray-700 text-sm'>Đến ngày</label>
                                <input
                                    type='date'
                                    className='border rounded px-2 py-1 w-full'
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </div>
                            <div className='col-span-1 flex items-end'>
                                <button
                                    className='bg-blue-500 text-white px-4 py-1 rounded w-full'
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                            <div className='col-span-1'>
                                <label className='block text-gray-700 text-sm'>Tên khách hàng</label>
                                <input
                                    type='text'
                                    className='border rounded px-2 py-1 w-full'
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                            </div>
                            <div className='col-span-1'>
                                <label className='block text-gray-700 text-sm'>Email</label>
                                <input
                                    type='email'
                                    className='border rounded px-2 py-1 w-full'
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                />
                            </div>
                            <div className='col-span-1'>
                                <label className='block text-gray-700 text-sm'>Số điện thoại</label>
                                <input
                                    type='text'
                                    className='border rounded px-2 py-1 w-full'
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-lg overflow-hidden shadow-lg'>
                    <div className='grid grid-cols-9 gap-4 items-center p-4 bg-gray-200'>
                        <div className='text-center text-lg font-bold col-span-1'>Tên khách hàng</div>
                        <div className='text-center text-lg font-bold col-span-1'>Email</div>
                        <div className='text-center text-lg font-bold col-span-1'>Số điện thoại</div>
                        <div className='text-center text-lg font-bold col-span-1'>Sân</div>
                        <div className='text-center text-lg font-bold col-span-1'>Ngày đặt</div>
                        <div className='text-center text-lg font-bold col-span-1'>Bắt đầu</div>
                        <div className='text-center text-lg font-bold col-span-1'>Kết thúc</div>
                        <div className='text-center text-lg font-bold col-span-1'>Giá</div>
                        <div className='text-center text-lg font-bold col-span-1'>Trạng Thái</div>
                    </div>
                    {bookingsToDisplay.map((booking) => (
                        <div key={booking.id} className='grid grid-cols-9 gap-4 items-center p-4 border-b hover:bg-gray-100'>
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
                            <div className='text-center flex items-center justify-center col-span-1'>
                                <select
                                    value={booking.reservationStatus}
                                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                                    className='border rounded px-2 py-1'
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}

                                </select>
                            </div>
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