import React, { useEffect, useState } from "react";
import { fetchBadmintonCenterByManager } from "../../../services/centerService";
import { fetchCourtsByCenterId } from "../../../services/courtService";
import { fetchTimeSlotsByCourtId } from "../../../services/timeSlotService";
import CollapseHandMade from "../../CollapseHandMade";

export default function TimeSlots() {
    const [courts, setCourts] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});
    const [center, setCenter] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                if (token) {
                    const centerData = await fetchBadmintonCenterByManager(token);
                    console.log('Fetched Center Data:', centerData);
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
                    console.log('Fetched Courts Data:', courtsData);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchCourtsData();
    }, [center]);

    useEffect(() => {
        const fetchTimeSlotsData = async (courtId) => {
            try {
                const timeSlotsData = await fetchTimeSlotsByCourtId(courtId);
                setTimeSlots((prevTimeSlots) => ({
                    ...prevTimeSlots,
                    [courtId]: timeSlotsData.map(slot => ({
                        // courtName: courts.find(court => court.id === courtId)?.courtName,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        price: slot.price,
                    })),
                }));
                console.log(`Fetched Time Slots Data for court ${courtId}:`, timeSlotsData);
            } catch (error) {
                console.log(error);
            }
        };

        courts.forEach((court) => {
            fetchTimeSlotsData(court.id);
        });
    }, [courts]);

    useEffect(() => {
        console.log('Courts State Updated:', courts);
    }, [courts]);

    return (
        <div className="p-4 bg-gray-200 rounded-lg space-y-4">
            {courts.map((court) => (
                <CollapseHandMade
                    key={court.id}
                    title={court.courtName}
                    answers={(timeSlots[court.id] || []).map(slot =>
                        `Start Time: ${slot.startTime}, End Time: ${slot.endTime}, Price: ${slot.price}`
                    )}
                />
            ))}
        </div>
    );
}
