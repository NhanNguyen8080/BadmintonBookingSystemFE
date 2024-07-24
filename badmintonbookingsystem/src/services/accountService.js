import {changeStatusAccount, createAccount, manageAccounts, manageAllManagers, manageRoles, updateAccount} from "../api/apiAdminAccount";

export const fetchAccounts = async (currentPage) => {
    try {
        const response = await manageAccounts(currentPage);
        return response.data;
    } catch (error) {
        console.error('No data accounts:', error);
        throw error;
    }
};

export const fetchManagers = async () => {
    try {
        const response = await manageAllManagers();
        return response.data;
    } catch (error) {
        console.error('No data accounts:', error);
        throw error;
    }
};
export const fetchRoles = async () => {
  try {
      const response = await manageRoles();
      return response.data;
  } catch (error) {
      console.error('No data accounts:', error);
      throw error;
  }
};

export const updateUserStatus = async (id) => {
    try {
      const response = await changeStatusAccount(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const addNewAccount = async (email, password, confirmedPassword, fullName, phoneNumber, roleId) => {
    try {
      const response = await createAccount(
        email, password, confirmedPassword, fullName, phoneNumber, roleId
      );
      return response.data;
    } catch (error) {
      console.error('Error creating center:', error);
      throw error;
    }
  };
  
  export const updateExistingUser= async (userId, password, fullName, phoneNumber, roleId) => {
    try {
      console.log(userId, password, fullName, phoneNumber, roleId);
      const response = await updateAccount(
        userId, password, fullName, phoneNumber, roleId
      );
      return response.data; 
    } catch (error) {
      throw error;
    }
  }