import { getCourtsByCenterId } from "../api/apiCourt";

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