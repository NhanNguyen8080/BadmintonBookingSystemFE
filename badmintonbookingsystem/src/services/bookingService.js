import { singleBookingAPI } from "../api/apiBooking";

export const singleBooking = async (listTimeSlotId, bookingDate) => {
  try {
    const response = await singleBookingAPI(listTimeSlotId, bookingDate);
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};