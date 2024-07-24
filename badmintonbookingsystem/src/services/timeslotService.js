import { getTimeSlotbyCourtId } from "../api/apiTimeSlot";

export const fetchTimeSlot = async (courtId, chosenDate) => {
  try {
    const response = await getTimeSlotbyCourtId(courtId, chosenDate);
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching time slot:', error);
    throw error;
  }
};