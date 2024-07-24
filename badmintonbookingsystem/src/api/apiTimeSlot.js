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