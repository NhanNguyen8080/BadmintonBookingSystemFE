import React, { useEffect, useState } from 'react';
import { fetchAccounts, updateUserStatus } from '../../../services/accountService';
import { faPenToSquare, faToggleOff, faToggleOn, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddAccountModal from './AddAccountModal';
import UpdateAccountModal from './UpdateAccountModal';

export default function Accounts() {
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await fetchAccounts(currentPage);
                setUsers(usersData);
                setTotalPages(10);
            } catch (error) {
                console.log(error);
            }
        };
        localStorage.setItem('currentPage', currentPage);
        fetchData();
    }, [currentPage]);


    const handleChangeStatus = async (id) => {
        try {
            const updatedUser = await updateUserStatus(id);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === updatedUser.id ? { ...user, isActive: updatedUser.isActive } : user
                )
            );
        } catch (error) {
            console.error('Error changing center status:', error);
        }
    };
    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    const onAccountAdded = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleOpenUpdateModal = (user) => {
        setSelectedUser(user);
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedUser(null);
    };



    const handleUserUpdated = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user,
            ),
        );
    };


    const nextPage = () => {
        if (currentPage < totalPages) {
            const page = currentPage + 1;
            setCurrentPage(page);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <>
            <div className=''>
                <div className='w-5/6 space-y-4 p-4'>
                    <button
                        className='p-4 bg-blue-500 text-white px-2 py-1 rounded'
                        onClick={handleOpenAddModal}
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
                                    <button onClick={() => handleChangeStatus(user.id)}
                                        title={user.isActive ? "Active" : "InActive"}
                                    >
                                        <FontAwesomeIcon
                                            icon={user.isActive ? faToggleOn : faToggleOff}
                                            color="#07881d"
                                        />
                                    </button>
                                </div>
                                <div className='space-x-4 flex items-center justify-center'>
                                    <button
                                        onClick={() => handleOpenUpdateModal(user)}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#B197FC", }} />
                                    </button>
                                    <button
                                    //onClick={() => handleOpenUpdateModal(user)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#8a0505" }} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='flex justify-between p-2 bg-zinc-300'>
                            <button
                                className='bg-gray-500 text-white px-2 py-1 rounded'
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className='text-lg font-bold'>
                                Page {currentPage}
                            </span>
                            <button
                                className='bg-gray-500 text-white px-2 py-1 rounded'
                                onClick={nextPage}
                                disabled={
                                    currentPage === 15
                                }
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <AddAccountModal
                    isOpen={isAddModalOpen}
                    onClose={handleCloseAddModal}
                    onAccountAdded={onAccountAdded}
                />
                <UpdateAccountModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    userId={selectedUser?.id}
                    initialUserData={selectedUser}
                    onAccountUpdated={handleUserUpdated}
                />
            </div>
        </>
    );
}