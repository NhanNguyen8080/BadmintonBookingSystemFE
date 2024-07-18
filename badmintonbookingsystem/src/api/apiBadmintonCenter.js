import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";
const size = 9;

export const getBadmintonCenters = (pageIndex) => {
    const url = `${API_BASE_URL}/badminton-centers`;
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