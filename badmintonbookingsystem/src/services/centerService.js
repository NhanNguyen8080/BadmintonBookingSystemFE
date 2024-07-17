import { getBadmintonCenters } from "../api/apiBadmintonCenter";

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
};