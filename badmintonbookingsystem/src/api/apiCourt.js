import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";

export const getCourtsByCenterId = (centerId) => {
    const url = `${API_BASE_URL}/courts/center/${centerId}`;
    return axios.get(url, {
        headers: {
            'accept': "*/*"
        }
    });
};

export const createCourt = (courtName, centerId, imageFiles) => {
    const formData = new FormData();
    formData.append('CourtName', courtName);
    formData.append('CenterId ', centerId);
    imageFiles.forEach(file => {
        formData.append('ImageFiles', file);
    });
    return axios.post(`${API_BASE_URL}/badminton-centers`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};