import { useEffect, useState } from "react";
import { fetchRoles, updateExistingUser } from "../../../services/accountService";

const UpdateAccountModal = ({ isOpen, onClose, userId, initialUserData, onAccountUpdated }) => {

    const [fullName, setfullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleIdArray, setRoleIdArray] = useState("");
    
    useEffect(() => {
        if (initialUserData) {
            console.log(initialUserData)
            setfullName(initialUserData.fullName);
            setPhoneNumber(initialUserData.phoneNumber);
            setPassword(initialUserData.password);

        } else {
            setfullName('');
            setPhoneNumber('');
            setPassword('');
            setRoleId('');
        }
    }, [initialUserData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const managerData = await fetchRoles();
                setRoleIdArray(managerData)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            const response = await updateExistingUser(
                userId, password, fullName, phoneNumber, roleId
            );
            onClose(); // Close the modal after successful update
            onAccountUpdated(response);  // Call the callback with the updated center
        } catch (error) {
            console.error('There was an error updating the account!', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/3 p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Update Center</h2>
                <form onSubmit={handleSubmit}>
                    {/* FULL NAME */}
                    <div className="mb-4">
                        <label className="block mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setfullName(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                    {/* PHONE NUMBER */}
                    <div className="mb-4">
                        <label className="block mb-1">Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                    {/* PASSWORD */}
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                        />
                    </div>
                    {/* ROLE */}
                    <div className="mb-4">
                        <select
                            id="roleId"
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                            className="tw-w-full tw-p-2 tw-border-2 tw-border-teal-950 tw-rounded"
                            required
                        >
                            <option value="">Role</option>
                            {roleIdArray.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.roleName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}
                        >
                            Trở lại
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAccountModal;