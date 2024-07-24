import { getBookingsByCenterId } from "../api/apiBooking";

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