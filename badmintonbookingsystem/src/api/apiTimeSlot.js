import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";

export const getTimeSlotsByCourtId = (courtId) => {
    const url = `${API_BASE_URL}/timeslots/court/${courtId}`;
    return axios.get(url, {
        headers: {
            'accept': "*/*"
        }
    });
};

export const changeTimeSlotStatus = (id) => {
    return axios.put(`${API_BASE_URL}/timeslot-toggle/${id}`, {
        headers: {
            'accept': "*/*"
        }
    });
};