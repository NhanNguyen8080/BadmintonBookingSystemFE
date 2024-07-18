import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";
const size = 9;

export const getBadmintonActiveCenters = (pageIndex) => {
    const url = `${API_BASE_URL}/badminton-centers-active`;
    const params = {
        pageIndex: pageIndex,
        size: size,
    };
    console.log(params);
    return axios.get(url, {
        headers: {
            'accept': "*/*"
        }
    });
};

export const getBadmintonCenterByManager = (token) => {

    return axios.get(`${API_BASE_URL}/badminton-centers/manager`, {
        headers: {
            'Accept': '*/*',
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
};