import React, { useEffect, useState } from "react";
import { fetchBadmintonCenterByManager } from "../../../services/centerService";
import { fetchCourtsByCenterId } from "../../../services/courtService";
import { fetchTimeSlotsByCourtId, updateTimeSlotStatus } from "../../../services/timeSlotService";
import CollapseHandMade from "../../CollapseHandMade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import AddTimeSlotModal from "./AddTimeSlotModal";

export default function TimeSlots() {
    const [courts, setCourts] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});
    const [center, setCenter] = useState(null);
    const token = localStorage.getItem("token");
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const handleChangeStatus = async (id, courtId) => {
        try {
            const updatedTimeSlot = await updateTimeSlotStatus(id);
            setTimeSlots((prevTimeSlots) => ({
                ...prevTimeSlots,
                [courtId]: prevTimeSlots[courtId].map((timeSlot) =>
                    timeSlot.id === updatedTimeSlot.id
                        ? { ...timeSlot, isActive: updatedTimeSlot.isActive }
                        : timeSlot
                ),
            }));
        } catch (error) {
            console.error('Error changing court status:', error);
        }
    };

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
        fetchCourtsData();
    }, [center]);

    const fetchTimeSlotsData = async (courtId) => {
        try {
            const timeSlotsData = await fetchTimeSlotsByCourtId(courtId);
            setTimeSlots((prevTimeSlots) => ({
                ...prevTimeSlots,
                [courtId]: timeSlotsData.map(slot => ({
                    id: slot.id,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    price: slot.price,
                    isActive: slot.isActive,
                })),
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        courts.forEach((court) => {
            fetchTimeSlotsData(court.id);
        });
    }, [courts]);

    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    const handleTimeSlotAdded = (newTimeSlot, courtId) => {
        fetchTimeSlotsData(courtId);
    };

    return (
        <div className="p-4 bg-gray-200 rounded-lg space-y-4">
            <style>
                {`
                    .time-slot-card {
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        transition: transform 0.2s;
                    }

                    .time-slot-card:hover {
                        transform: translateY(-4px);
                    }

                    .time-slot-info {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .time-slot-details {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                    }

                    .status-toggle {
                        display: flex;
                        align-items: center;
                    }

                    .status-button {
                        background: none;
                        border: none;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .status-button:hover {
                        opacity: 0.8;
                    }

                    .status-button:focus {
                        outline: none;
                    }
                `}
            </style>
            <button
                className='p-4 bg-blue-500 text-white px-2 py-1 rounded'
                onClick={handleOpenAddModal}
            >
                Tạo mới
            </button>
            {courts.map((court) => (
                <CollapseHandMade
                    key={court.id}
                    title={court.courtName}
                    answers={(timeSlots[court.id] || []).map(slot => (
                        <div key={slot.id} className="time-slot-card p-4 mb-4">
                            <div className="time-slot-info">
                                <div className="time-slot-details">
                                    <span><strong>Start Time:</strong> {slot.startTime}</span>
                                    <span><strong>End Time:</strong> {slot.endTime}</span>
                                    <span><strong>Price:</strong> {slot.price}</span>
                                </div>
                                <div className='status-toggle'>
                                    <button onClick={() => handleChangeStatus(slot.id, court.id)}
                                        title={slot.isActive ? "Active" : "Inactive"}
                                        className="status-button"
                                    >
                                        <FontAwesomeIcon
                                            icon={slot.isActive ? faToggleOn : faToggleOff}
                                            color={slot.isActive ? "#07881d" : "#8a0505"}
                                            size="2x"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                />
            ))}
            <AddTimeSlotModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onTimeSlotAdded={handleTimeSlotAdded}
            />
        </div>
    );
}