import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";
const token = localStorage.getItem('token');

export const singleBookingAPI = (listTimeSlotId, bookingDate) => {
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

export const fixedBookingAPI = (bookingData) => {
    const url = `${API_BASE_URL}/bookings/fixed-booking`;
    return axios.post(url, bookingData, {
        headers: {
            'accept': "*/*",
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

export const flexBookingAPI = (bookings) => {
    const url = `${API_BASE_URL}/bookings/flex-booking`;
    return axios.post(url, bookings, {
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

export const searchBookings = (centerId, fromDate, toDate, customerName, customerEmail, customerPhone) => {
    const url = `${API_BASE_URL}/bookings/search-court-reservation/center/${centerId}`;
    const params = {};
    if (fromDate) {
        params.FromDate = fromDate;
    }

    if (toDate) {
        params.ToDate = toDate;
    }

    if (customerName) {
        params.CustomerName = customerName;
    }

    if (customerEmail) {
        params.CustomerEmail = customerEmail;
    }

    if (customerPhone) {
        params.CustomerPhone = customerPhone;
    }
    return axios.get(url, {
        params: params,
        headers: {
            'accept': "*/*"
        }
    });
};

export const getBookingsByBookingId = (bookingId) => {
    const url = `${API_BASE_URL}/bookings/user-booking/${bookingId}`;
    return axios.get(url, {
        headers: {
            'accept': "*/*",
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

export const getBookingsByStatus = () => {
    const params = {
        pageIndex: 1,
        pageSize: 20
    };
    const url = `${API_BASE_URL}/bookings/filter-user-bookings`;
    return axios.get(url, {
        params: params,
        headers: {
            'accept': "*/*",
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const cancleBookingDetail = (bookingDetailId) => {
    const id = bookingDetailId;
    const url = `${API_BASE_URL}/bookings/booking-detail/${id}`;
    return axios.delete(url, {
        headers: {
            'accept': "*/*",
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};
export const cancleBooking = (bookingId) => {
    const id = bookingId;
    const url = `${API_BASE_URL}/bookings/user-booking/${id}`;
    return axios.delete(url, {
        headers: {
            'accept': "*/*",
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

export const checkoutApi = (id) => {
    //console.log('checkout api:', id);
    const url = `${API_BASE_URL}/bookings/payment/${id}`;
    return axios.post(url, {
        headers: {
            'accept': "*/*",
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};