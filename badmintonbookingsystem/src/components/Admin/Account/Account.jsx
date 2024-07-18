import React, { useEffect, useState } from 'react';
import { fetchAccounts } from '../../../services/accountService';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Accounts() {
    const [users, setUsers] = useState([]);
    // const [isAddModalOpen, setAddModalOpen] = useState(false);
    // const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await fetchAccounts();
                setUsers(usersData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // const handleDeleteUser = async (id) => {
    //     if (id === userId) {
    //         alert('You cannot delete yourself!');
    //         return;
    //     }

    //     if (window.confirm('Are you sure you want to delete this user?')) {
    //         try {
    //             await deleteExistingUser(id);
    //             setUsers((prevUsers) =>
    //                 prevUsers.filter((user) => user._id !== id),
    //             );
    //         } catch (error) {
    //             console.error('There was an error deleting the user!', error);
    //         }
    //     }
    // };

    // const handleOpenAddModal = () => {
    //     setAddModalOpen(true);
    // };

    // const handleCloseAddModal = () => {
    //     setAddModalOpen(false);
    // };

    // const handleOpenUpdateModal = (user) => {
    //     setSelectedUser(user);
    //     setUpdateModalOpen(true);
    // };

    // const handleCloseUpdateModal = () => {
    //     setUpdateModalOpen(false);
    //     setSelectedUser(null);
    // };

    // const handleUserAdded = (newUser) => {
    //     setUsers((prevUsers) => [...prevUsers, newUser]);
    // };

    // const handleUserUpdated = (updatedUser) => {
    //     setUsers((prevUsers) =>
    //         prevUsers.map((user) =>
    //             user._id === updatedUser._id ? updatedUser : user,
    //         ),
    //     );
    // };

    // const indexOfLastUser = currentPage * usersPerPage;
    // const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // const nextPage = () => {
    //     if (currentPage < Math.ceil(users.length / usersPerPage)) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };

    // const prevPage = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    return (
        <>
            <div className=''>
                <div className='w-5/6 space-y-4 p-4'>
                    <button
                        className='p-4 bg-blue-500 text-white px-2 py-1 rounded'
                    //onClick={handleOpenAddModal}
                    >
                        Add New
                    </button>
                    <div className='bg-zinc-100 rounded-lg overflow-hidden shadow-lg'>
                        <div className='grid grid-cols-6 gap-4 items-center justify-between p-2 bg-zinc-300'>
                            {/* <div className='text-center text-lg font-bold'>
                                UserId
                            </div> */}
                            <div className='text-center text-lg font-bold'>
                                FullName
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Email
                            </div>
                            <div className='text-center text-lg font-bold'>
                                PhoneNumber
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Role
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Status
                            </div>
                            <div className='text-center text-lg font-bold'>
                                Action
                            </div>
                        </div>
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className='grid grid-cols-6 gap-4 items-center justify-between p-2 border-b hover:bg-zinc-200'
                            >
                                <div className='text-center flex items-center justify-center'>
                                    <label className='text-gray-600'>
                                        {user.fullName}
                                    </label>
                                </div>
                                <div className='text-center flex items-center justify-center'>
                                    {user.email}
                                </div>
                                <div className='text-center flex items-center justify-center'>
                                    {user.phoneNumber}
                                </div>
                                <div className='text-center'>
                                    {user.authorities}
                                </div>
                                <div className='text-center'>
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        beat
                                        style={{ color: user.isActive ? "#63E6BE" : "#FF6B6B" }}
                                    />
                                </div>
                                <div className='space-x-4 flex items-center justify-center'>
                                    <button
                                        // onClick={() =>
                                        //     handleOpenUpdateModal(user)
                                        // }
                                        className='bg-blue-500 text-white px-2 py-1 rounded'>
                                        Update
                                    </button>
                                    <button
                                        className='bg-red-500 text-white px-2 py-1 rounded'
                                    // onClick={() =>
                                    //     handleDeleteUser(user._id)
                                    // }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* <div className='flex justify-between p-2 bg-zinc-300'>
                            <button
                                className='bg-gray-500 text-white px-2 py-1 rounded'
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className='text-lg font-bold'>
                                Page {currentPage} of{' '}
                                {Math.ceil(users.length / usersPerPage)}
                            </span>
                            <button
                                className='bg-gray-500 text-white px-2 py-1 rounded'
                                onClick={nextPage}
                                disabled={
                                    currentPage ===
                                    Math.ceil(users.length / usersPerPage)
                                }
                            >
                                Next
                            </button>
                        </div> */}
                    </div>
                </div>
                {/* <AddUserModal
                    isOpen={isAddModalOpen}
                    onClose={handleCloseAddModal}
                    onUserAdded={handleUserAdded}
                />
                <UpdateUserModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    userId={selectedUser?._id}
                    initialUserData={selectedUser}
                    onUserUpdated={handleUserUpdated}
                /> */}
            </div>
        </>
    );
}