import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCourtsByCenterId } from '../../../services/courtService';
import { fetchBadmintonCenterByManager } from '../../../services/centerService';
import { addNewTimeSlot } from '../../../services/timeSlotService';

const AddTimeSlotModal = ({ isOpen, onClose, onTimeSlotAdded }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [courts, setCourts] = useState([]);
    const [center, setCenter] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                if (token) {
                    const centerData = await fetchBadmintonCenterByManager(token);
                    setCenter(centerData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCenterData();
    }, [token]);

    useEffect(() => {
        const fetchCourtsData = async () => {
            if (center) {
                try {
                    const courtsData = await fetchCourtsByCenterId(center[0].id);
                    setCourts(courtsData);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        if (center) {
            fetchCourtsData();
        }
    }, [center]);

    const parseTime = (timeStr) => {
        const date = new Date();
        const timeParts = timeStr.split(':');
        date.setHours(timeParts[0], timeParts[1], timeParts[2] || 0);
        return date.toTimeString().slice(0, 8);
    };

    const onSubmit = async (data) => {
        const { courtId, startTime, endTime, price } = data;

        try {
            const timeSlotCreateDTO = {
                courtId,
                startTime: parseTime(startTime),
                endTime: parseTime(endTime),
                price,
            };
            const response = await addNewTimeSlot(timeSlotCreateDTO);
            onTimeSlotAdded(response, courtId);
            onClose();
        } catch (error) {
            console.error('Error creating TimeSlot:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/3 p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Tạo timeslot</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block mb-1">Court</label>
                        <select
                            {...register('courtId', { required: 'Court is required' })}
                            className="w-full border px-2 py-1 rounded"
                        >
                            <option value="">Select court</option>
                            {(courts || []).map((court) => (
                                <option key={court.id} value={court.id}>
                                    {court.courtName}
                                </option>
                            ))}
                        </select>
                        {errors.courtId && <p className="text-red-500">{errors.courtId.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Start Time</label>
                        <input
                            type="time"
                            {...register('startTime', { required: 'Start Time is required' })}
                            className="w-full border px-2 py-1 rounded"
                        />
                        {errors.startTime && <p className="text-red-500">{errors.startTime.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">End Time</label>
                        <input
                            type="time"
                            {...register('endTime', { required: 'End Time is required' })}
                            className="w-full border px-2 py-1 rounded"
                        />
                        {errors.endTime && <p className="text-red-500">{errors.endTime.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Price</label>
                        <input
                            type="number"
                            {...register('price', { required: 'Price is required' })}
                            className="w-full border px-2 py-1 rounded"
                        />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}
                        >
                            Trở lại
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTimeSlotModal;