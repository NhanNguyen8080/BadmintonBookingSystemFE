import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";

export const manageAccounts = (currentPage) => {
  const params = {
    pageIndex: currentPage,
    pageSize : 5
  };
  return axios.get(`${API_BASE_URL}/users`, {
      params,
      headers: {
          'accept': "*/*"
      }
  });
};
export const manageRoles = () => {
  return axios.get(`${API_BASE_URL}/roles`, {
      headers: {
          'accept': "*/*"
      }
  });
};

export const manageAllManagers = () => {
  return axios.get(`${API_BASE_URL}/users/managers`, {
      headers: {
          'accept': "*/*"
      }
  });
};

export const changeStatusAccount = (id) => {
  return axios.put(`${API_BASE_URL}/users/deactive/${id}`, {
      headers: {
          'accept': "*/*"
      }
  });
};

export const createAccount = (email, password, confirmedPassword, fullName, phoneNumber, roleId) => {
  console.log(email + "-", password+ "-", confirmedPassword+ "-", fullName+ "-", phoneNumber+ "-", roleId)
  return axios.post(`${API_BASE_URL}/users/add`, {email, password, confirmedPassword, fullName, phoneNumber, roleId}, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateAccount = (userId, password, fullName, phoneNumber, roleId) => {
  return axios.put(`${API_BASE_URL}/users/update/${userId}`, {fullName, phoneNumber, password, roleId}, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

