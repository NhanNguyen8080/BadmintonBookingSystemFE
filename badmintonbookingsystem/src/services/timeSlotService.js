import { getTimeSlotsByCourtId } from "../api/apiTimeSlot";

export const fetchTimeSlotsByCourtId = async (courtId) => {
    try {
        const response = await getTimeSlotsByCourtId(courtId);
        const data = response.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching time slots:', error);
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