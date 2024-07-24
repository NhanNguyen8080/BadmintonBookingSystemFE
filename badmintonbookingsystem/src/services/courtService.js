import { changeStatusCourt, createCourt, getCourtsByCenterId } from "../api/apiCourt";

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

export const updateCourtStatus = async (id) => {
  try {
    const response = await changeStatusCourt(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewCourt = async (courtName, centerId, imageFiles) => {
  try {
    const response = await createCourt(
      courtName,
      centerId,
      imageFiles
    );
    return response.data;
  } catch (error) {
    console.error('Error creating center:', error);
    throw error;
  }
};