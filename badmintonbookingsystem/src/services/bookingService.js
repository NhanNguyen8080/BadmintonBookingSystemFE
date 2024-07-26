import { cancleBooking, cancleBookingDetail, checkoutApi, fixedBookingAPI, flexBookingAPI, getBookingsByBookingId, getBookingsByCenterId, getBookingsByStatus, searchBookings } from "../api/apiBooking";
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

export const fixedBooking = async (bookingData) => {
  try {
    const response = await fixedBookingAPI(bookingData);
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

export const flexBooking = async (bookings) => {
  try {
    const response = await flexBookingAPI(bookings);
    return response.data;
  } catch (error) {
    console.error('Error booking:', error);
    throw error;
  }
};

export const fetchBookingsByCenterId = async (centerId) => {
  try {
    const response = await getBookingsByCenterId(centerId);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const fetchSearchedBookings = async (centerId, fromDate, toDate, customerName, customerEmail, customerPhone) => {
  try {
    const response = await searchBookings(centerId, fromDate, toDate, customerName, customerEmail, customerPhone);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const fetchBookingsByBookingId = async (bookingId) => {
  try {
    const response = await getBookingsByBookingId(bookingId);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};
//   export const addNewCourt = async (centerData, imageFiles) => {
//     try {
//       const response = await createCourt(
//         centerData.name,
//         centerData.location,
//         centerData.operatingTime,
//         centerData.closingTime,
//         centerData.managerId,
//         imageFiles
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error creating center:', error);
//       throw error;
//     }
//   };
export const fetchBookingsByStatus = async () => {
  try {
    const response = await getBookingsByStatus();
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const cancelBookingById = async (bookingId) => {
  try {
    const response = await cancleBooking(bookingId);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const cancelBookingDetailById = async (bookingDetailId) => {
  try {
    const response = await cancleBookingDetail(bookingDetailId);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const checkout = async (id) => {
  try {
    const response = await checkoutApi(id);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

