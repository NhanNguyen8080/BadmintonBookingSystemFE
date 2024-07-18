import { manageUsers } from "../api/apiManageUser";

export const fetchAccounts = async () => {
    try {
        const response = await manageUsers();
        return response.data;
    } catch (error) {
        console.error('No data accounts:', error);
        throw error;
    }
};