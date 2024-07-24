import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";
const token = localStorage.getItem('token');

export const singleBookingAPI = ( listTimeSlotId, bookingDate) => {
// console.log(listTimeSlotId, bookingDate)
    const url = `${API_BASE_URL}/bookings/single-booking`;
    return axios.post(url, { listTimeSlotId, bookingDate }, {
        headers: {
            'accept': "*/*",
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

export const fixedBookingAPI  = ( bookingData) => {
        const url = `${API_BASE_URL}/bookings/fixed-booking`;
        return axios.post(url, bookingData, {
            headers: {
                'accept': "*/*",
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    };

export const getBookingsByCenterId = (centerId) => {
    const url = `${API_BASE_URL}/bookings/court-reservation/center/${centerId}`;
    return axios.get(url, {
        headers: {
            'accept': "*/*"
        }
    });
};