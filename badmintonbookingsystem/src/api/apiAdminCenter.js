import axios from "axios";

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";
const perPage = 5;
export const getAllCenters = (currentPage) => {
  const params = {
    size : perPage,
    pageIndex: currentPage
  };
    return axios.get(`${API_BASE_URL}/badminton-centers`, {
        params,
        headers: {
            'accept': "*/*"
        }
    });
  };

  export const changeStatusCenter = (id) => {
    return axios.put(`${API_BASE_URL}/badminton-centers-toggle/${id}`, {
        headers: {
            'accept': "*/*"
        }
    });
  };

export const createCenter = (name, location, operatingTime, closingTime, managerId, imgAvatar, imageFiles) => {
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Location', location);
    formData.append('OperatingTime', operatingTime);
    formData.append('ClosingTime', closingTime);
    formData.append('ManagerId', managerId);
    formData.append('ImgAvatar', imgAvatar);
    imageFiles.forEach(file => {
      formData.append('ImageFiles', file);
    });
    return axios.post(`${API_BASE_URL}/badminton-centers`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  export const updateCenter = (id, name, location, operatingTime, closingTime, managerId, imgAvatar, imageFiles) => {
    
    
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Location', location);
    formData.append('OperatingTime', operatingTime);
    formData.append('ClosingTime', closingTime);
    formData.append('ManagerId', managerId);
    formData.append('ImgAvatar', imgAvatar);
    
    imageFiles.forEach(file => {
      formData.append('ImageFiles', file);
    });
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    return axios.put(`${API_BASE_URL}/badminton-centers/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };