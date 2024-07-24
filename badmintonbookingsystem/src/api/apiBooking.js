import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";

export const getBookingsByCenterId = (centerId) => {
    const url = `${API_BASE_URL}/bookings/court-reservation/center/${centerId}`;
    return axios.get(url, {
        headers: {
            'accept': "*/*"
        }
    });
};