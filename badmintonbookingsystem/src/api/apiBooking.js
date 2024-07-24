import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api/bookings";
const token = localStorage.getItem('token');

export const singleBookingAPI = ( listTimeSlotId, bookingDate) => {
console.log(listTimeSlotId, bookingDate)
    const url = `${API_BASE_URL}/single-booking`;
    return axios.post(url, { token, listTimeSlotId, bookingDate }, {
        headers: {
            'accept': "*/*",
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};