import { useEffect, useState } from "react";
import { checkout, fetchBookingsByBookingId } from "../../services/bookingService";
import { useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClipboardList, faDollarSign, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";


const CheckoutBooking = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
  useEffect(() => {
    // Fetch booking details by bookingId
    const fetchBookingDetails = async () => {
      try {
        const response = await fetchBookingsByBookingId(bookingId);
        setBookingDetails(response);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handlePayment = async () => {
    try {

      const response = await checkout(bookingId);

      window.location.href = response;

    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (!bookingDetails) {
    return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Booking Details</h2>
        <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow-inner">
          <p className="mb-4 text-gray-700"><FontAwesomeIcon icon={faUser} className="mr-3 text-blue-500"/>Customer: <span className="font-semibold">{bookingDetails.bookingHeader.customerName}</span></p>
          <p className="mb-4 text-gray-700"><FontAwesomeIcon icon={faPhone} className="mr-3 text-blue-500"/>Phone: <span className="font-semibold">{bookingDetails.bookingHeader.customerPhone}</span></p>
          <p className="mb-4 text-gray-700"><FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-blue-500"/>From Date: <span className="font-semibold">{bookingDetails.bookingHeader.fromDate}</span></p>
          <p className="mb-4 text-gray-700"><FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-blue-500"/>To Date: <span className="font-semibold">{bookingDetails.bookingHeader.toDate}</span></p>
          <p className="mb-4 text-gray-700"><FontAwesomeIcon icon={faClipboardList} className="mr-3 text-blue-500"/>Booking Type: <span className="font-semibold">{bookingDetails.bookingHeader.bookingType}</span></p>
          <p className="mb-4 text-gray-700"><FontAwesomeIcon icon={faDollarSign} className="mr-3 text-blue-500"/>Total Price: <span className="font-semibold">{bookingDetails.bookingHeader.totalPrice}</span></p>
        </div>
        <div className="flex justify-center mb-4">
          <img src="data:image/png;base64,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"/>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 font-semibold shadow-md"
        >
          Checkout
        </button>

        {paymentStatus === 'success' && (
          <div className="mt-6 p-6 bg-green-100 text-green-800 rounded-lg shadow-inner">
            Payment successful!
          </div>
        )}
        {paymentStatus === 'failed' && (
          <div className="mt-6 p-6 bg-red-100 text-red-800 rounded-lg shadow-inner">
            Payment failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutBooking;