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

export const changeStatusCourt = (id) => {
    return axios.put(`${API_BASE_URL}/courts-toggle/${id}`, {
        headers: {
            'accept': "*/*"
        }
    });
};

export const createCourt = (CourtName, CenterId, ImageFiles) => {
    const formData = new FormData();
    console.log(CourtName);
    console.log(CenterId);
    console.log(ImageFiles);
    formData.append('CourtName', CourtName);
    formData.append('CenterId', CenterId);
    ImageFiles.forEach(file => {
        formData.append('ImageFiles', file);
    });

    return axios.post(`${API_BASE_URL}/courts`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const apiUpdateCourt = (id, courtName, imageFiles) => {


    const formData = new FormData();
    formData.append('CourtName', courtName);

    imageFiles.forEach(file => {
        formData.append('ImageFiles', file);
    });
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    return axios.put(`${API_BASE_URL}/courts/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};