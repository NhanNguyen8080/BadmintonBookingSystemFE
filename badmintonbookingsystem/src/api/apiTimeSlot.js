import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";

export const getTimeSlotbyCourtId = (courtId, chosenDate) => {
    const url = `${API_BASE_URL}/timeslots-table/court/${courtId}?chosenDate=${chosenDate}`;
    return axios.get(url, {
        headers: {
            'accept': "*/*"
        }
    });
};


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

export const addTimeSlot = (timeSlotDTO) => {
    console.log(timeSlotDTO.courtId);
    console.log(timeSlotDTO.startTime);
    console.log(timeSlotDTO.endTime);
    console.log(timeSlotDTO.price);

    return axios.post(`${API_BASE_URL}/timeslots`, timeSlotDTO, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};