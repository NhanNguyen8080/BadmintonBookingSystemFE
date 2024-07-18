import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";

export const manageUsers = () => {
  return axios.get(`${API_BASE_URL}/users`, {
      headers: {
          'accept': "*/*"
      }
  });
};


