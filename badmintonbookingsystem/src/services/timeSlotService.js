import { getTimeSlotsByCourtId, getTimeSlotbyCourtId, changeTimeSlotStatus, addTimeSlot } from "../api/apiTimeSlot";

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

export const updateTimeSlotStatus = async (id) => {
    try {
        const response = await changeTimeSlotStatus(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addNewTimeSlot = async (timeSlotCreateDTO) => {
    try {
        const response = await addTimeSlot(
            timeSlotCreateDTO
        );
        return response.data;
    } catch (error) {
        console.error('Error creating center:', error);
        throw error;
    }
};
