
import { changeStatusCenter, createCenter, getAllCenters, manageCenters, updateCenter } from "../api/apiAdminCenter";
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

export const updateExistingCenter= async (id, name, location, operatingTime, closingTime, managerId, imgAvatar, imageFiles) => {
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
        const response = await getBadmintonCenters();
        const data = response.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
  }