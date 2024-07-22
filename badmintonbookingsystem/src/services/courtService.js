import { createCourt, getCourtsByCenterId } from "../api/apiCourt";

export const fetchCourtsByCenterId = async (centerId) => {
  try {
    const response = await getCourtsByCenterId(centerId);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching courts:', error);
    throw error;
  }
};

export const addNewCourt = async (centerData, imageFiles) => {
  try {
    const response = await createCourt(
      centerData.name,
      centerData.location,
      centerData.operatingTime,
      centerData.closingTime,
      centerData.managerId,
      imageFiles
    );
    return response.data;
  } catch (error) {
    console.error('Error creating center:', error);
    throw error;
  }
};