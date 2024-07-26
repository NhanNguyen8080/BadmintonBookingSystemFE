
import { changeStatusCenter, createCenter, getAllCenters, updateCenter } from "../api/apiAdminCenter";
import { getBadmintonActiveCenters, getBadmintonCenterById, getBadmintonCenterByManager, searchBadmintonCenter } from "../api/apiBadmintonCenter";
import { toast } from "react-toastify";
import { getBadmintonCenters } from "../api/apiBadmintonCenter";
export const fetchAllCenters = async (currentPage) => {
  try {
    const response = await getAllCenters(currentPage);
    return response.data;
  } catch (error) {
    console.error('No data centers:', error);
    throw error;
  }
};

export const fetchCenterById = async (id) => {
  try {
    const response = await getBadmintonCenterById(id);
    return response.data;
  } catch (error) {
    console.error('No data centers:', error);
    throw error;
  }
};

export const updateCenterStatus = async (id) => {
  try {
    const response = await changeStatusCenter(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewCenter = async (centerData, imgAvatar, imageFiles) => {
  try {
    const response = await createCenter(
      centerData.name,
      centerData.location,
      centerData.operatingTime,
      centerData.closingTime,
      centerData.managerId,
      imgAvatar,
      imageFiles
    );
    return response.data;
  } catch (error) {
    console.error('Error creating center:', error);
    throw error;
  }
};

export const updateExistingCenter = async (id, name, location, operatingTime, closingTime, managerId, imgAvatar, imageFiles) => {
  console.log(imageFiles);
  try {
    const response = await updateCenter(
      id,
      name, location, operatingTime, closingTime, managerId,
      imgAvatar,
      imageFiles
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchCenters = async () => {
  try {
    const response = await getBadmintonActiveCenters();
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching centers:', error);
    throw error;
  }
}

export const fetchBadmintonCenterByManager = async (token) => {
  try {
    const response = await getBadmintonCenterByManager(token);
    return response.data;
  } catch (error) {
    console.error('Error fetching center:', error);
    toast.error('Error fetching center');
    throw error;
  }
};

export const fetchSearchBadmintonCenter = async (location, operatingTime, closingTime) => {
  try {
    console.log(location);
    console.log(operatingTime);
    console.log(closingTime);
    const response = await searchBadmintonCenter(location, operatingTime, closingTime);
    return response.data;
  } catch (error) {
    console.error('Error fetching center:', error);
    toast.error('Error fetching center');
    throw error;
  }
};