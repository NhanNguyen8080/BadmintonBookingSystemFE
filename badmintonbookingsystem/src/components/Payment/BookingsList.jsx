import { useEffect, useState } from "react";
import { cancelBookingById, cancelBookingDetailById, fetchBookingsByStatus } from "../../services/bookingService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar, faXmark } from "@fortawesome/free-solid-svg-icons";
import ConfirmCancelPopup from "./ConfirmCancelPopup";
import { useNavigate } from "react-router-dom";

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [expandedBookingId, setExpandedBookingId] = useState(null);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [currentBookingId, setCurrentBookingId] = useState(null);
    const [currentDetailId, setCurrentDetailId] = useState(null);
    const [popupMessage, setPopupMessage] = useState("");

    // const handleCheckoutClick = (bookingId) => {
    //     
    //   }; 

      const navigate = useNavigate();

      const handleCheckoutClick = (bookingId) => {
        console.log('Booking ID:', bookingId); 
        navigate(`/checkout/${bookingId}`);
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBookingsByStatus();
                setBookings(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleToggle = (bookingId) => {
        if (expandedBookingId === bookingId) {
            setExpandedBookingId(null);
        } else {
            setExpandedBookingId(bookingId);
        }
    };
    const handleCancel = async () => {
        if (currentDetailId) {
            try {
                await cancelBookingDetailById(currentDetailId);
                const updatedBookings = bookings.map(booking => 
                    booking.bookingHeader.id === currentBookingId ? 
                    { ...booking, bookingDetails: booking.bookingDetails.map(detail => 
                        detail.id === currentDetailId ? 
                        { ...detail, status: "Cancelled" } : 
                        detail
                    ) } : 
                    booking
                );
                setBookings(updatedBookings);
                closePopup();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await cancelBookingById(currentBookingId);
                const updatedBookings = bookings.map(booking => 
                    booking.bookingHeader.id === currentBookingId ? 
                    { ...booking, bookingHeader: { ...booking.bookingHeader, paymentStatus: "Cancelled" } } : 
                    booking
                );
                setBookings(updatedBookings);
                closePopup();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const openPopup = (bookingId, detailId = null) => {
        setCurrentBookingId(bookingId);
        setCurrentDetailId(detailId);
        setPopupMessage(detailId ? "Are you sure you want to cancel this booking detail?" : "Are you sure you want to cancel this booking?");
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setCurrentBookingId(null);
        setCurrentDetailId(null);
    };

    return (
        <div className=''>
          <div className='w-5/6 space-y-4 p-4'>
            <div className='bg-zinc-100 rounded-lg overflow-hidden shadow-lg'>
              <div className='grid grid-cols-9 gap-4 items-center justify-between p-2 bg-zinc-300'>
                <div className='text-center text-lg font-bold'>Customer</div>
                <div className='text-center text-lg font-bold'>Phone</div>
                <div className='text-center text-lg font-bold'>From Date</div>
                <div className='text-center text-lg font-bold'>To Date</div>
                <div className='text-center text-lg font-bold'>Booking Type</div>
                <div className='text-center text-lg font-bold'>Total Price</div>
                <div className='text-center text-lg font-bold'>Status</div>
                <div className='text-center text-lg font-bold'>Checkout</div>
                <div className='text-center text-lg font-bold'>Action</div>
              </div>
              {bookings.map((booking) => (
                <div key={booking.bookingHeader.id}>
                  <div
                    onClick={() => handleToggle(booking.bookingHeader.id)}
                    className='grid grid-cols-9 gap-4 items-center justify-between p-2 border-b hover:bg-zinc-200 cursor-pointer'
                  >
                    <div className='text-center flex items-center justify-center'>
                      <label className='text-gray-600'>
                        {booking.bookingHeader.customerName}
                      </label>
                    </div>
                    <div className='text-center flex items-center justify-center'>
                      {booking.bookingHeader.customerPhone}
                    </div>
                    <div className='text-center flex items-center justify-center'>
                      {booking.bookingHeader.fromDate}
                    </div>
                    <div className='text-center'>{booking.bookingHeader.toDate}</div>
                    <div className='text-center'>{booking.bookingHeader.bookingType}</div>
                    <div className='text-center'>{booking.bookingHeader.totalPrice}</div>
                    <div
                      className={`text-center inline-block p-2 rounded-full 
                        ${booking.bookingHeader.paymentStatus === 'Completed'
                          ? 'text-gray-500 border rounded-full w-fit px-2 border-gray-500'
                          : booking.bookingHeader.paymentStatus === 'Pending'
                          ? 'text-gray-500 border rounded-full w-fit px-2 border-gray-500'
                          : booking.bookingHeader.paymentStatus === 'NotPaid'
                          ? 'text-gray-500 border rounded-full w-fit px-2 border-gray-500'
                          : booking.bookingHeader.paymentStatus === 'Cancelled'
                          ? 'text-gray-500 border rounded-full w-fit px-2 border-gray-500'
                          : 'text-gray-500 border rounded-full w-fit px-2 border-gray-500'
                        }`}
                    >
                      {booking.bookingHeader.paymentStatus}
                    </div>
                    <div className='text-center'>
                      {booking.bookingHeader.paymentStatus === 'NotPaid' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckoutClick(booking.bookingHeader.id);
                          }}
                          className='bg-orange-500 text-white px-4 py-2 rounded'
                        >
                          <FontAwesomeIcon icon={faMoneyCheckDollar} />
                          <p></p>
                          Checkout
                        </button>
                      )}
                    </div>
                    <div className='text-center'>
                      {booking.bookingHeader.paymentStatus !== 'Cancel' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openPopup(booking.bookingHeader.id);
                          }}
                          className='bg-green-500 text-white px-4 py-2 rounded'
                        >
                          <FontAwesomeIcon icon={faXmark} />
                          <p></p>
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  {expandedBookingId === booking.bookingHeader.id && (
                    <div className='bg-gray-100 p-4'>
                      <div className='grid grid-cols-7 gap-4'>
                        <div className='text-center text-lg font-bold'>Center</div>
                        <div className='text-center text-lg font-bold'>Court</div>
                        <div className='text-center text-lg font-bold'>Book Date</div>
                        <div className='text-center text-lg font-bold'>Time</div>
                        <div className='text-center text-lg font-bold'>Slot Price</div>
                        <div className='text-center text-lg font-bold'>Status</div>
                        <div className='text-center text-lg font-bold'>Action</div>
                      </div>
                      {booking.bookingDetails.map((detail) => (
                        <div key={detail.id} className='grid grid-cols-7 gap-4 p-2 border-b'>
                          <div className='text-center'>{detail.centerName}</div>
                          <div className='text-center'>{detail.courtName}</div>
                          <div className='text-center'>{detail.bookingDate}</div>
                          <div className='text-center'>
                            {detail.startTime} : {detail.endTime}
                          </div>
                          <div className='text-center'>{detail.slotPrice}</div>
                          <div
                            className={`text-center inline-block p-2 rounded-full 
                              ${detail.reservationStatus === 'Completed'
                                ? 'text-green-500 border rounded-full w-fit px-2 border-green-500'
                                : detail.reservationStatus === 'Pending'
                                ? 'text-red-500 border rounded-full w-fit px-2 border-red-500'
                                : detail.reservationStatus === 'NotPaid'
                                ? 'text-gray-500 border rounded-full w-fit px-2 border-gray-500'
                                : detail.reservationStatus === 'NotCheckedIn'
                                ? 'text-gray-500 border rounded-full w-fit px-2 border-gray-500'
                                : 'text-gray-500 border rounded-full w-fit px-2 border-gray-500'
                              }`}
                          >
                            {detail.reservationStatus}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <ConfirmCancelPopup
            title='Confirm to cancel'
            message={popupMessage}
            isVisible={isPopupVisible}
            onConfirm={handleCancel}
            onCancel={closePopup}
          />
         {/* {selectedBookingId && <CheckoutBooking bookingId={selectedBookingId} />} */}
        </div>
      );
}