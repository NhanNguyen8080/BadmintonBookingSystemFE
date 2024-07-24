import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { format, addDays, subDays, isBefore } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectUser } from "../../redux/slices/authSlice";
import { fetchTimeSlot } from "../../services/timeslotService";
import { singleBooking } from "../../services/bookingService";

export default function TimeSlotModal({ isOpen, onClose, courtId }) {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const [timeslots, setTimeslots] = useState([]);
    const user = useSelector(selectUser);
    const token = localStorage.getItem('token');

    useEffect(() => {
        setSelectedTimes([]);
        fetchTimeSlots();
    }, [isOpen, currentDate]);

    const fetchTimeSlots = async () => {
        try {
            
            const response = await fetchTimeSlot(courtId,formattedDate)
            setTimeslots(response);
        } catch (error) {
            console.error("Failed to fetch timeslots:", error);
            alert("Failed to fetch timeslots. Please try again.");
        }
    };

    const handlePrevDay = () => {
        if (!isBefore(currentDate, new Date())) {
            setCurrentDate(subDays(currentDate, 1));
        }
    };

    const handleNextDay = () => {
        setCurrentDate(addDays(currentDate, 1));
    };

    const handleTimeSlotClick = (timeslot) => {
        if (timeslot.isBooked) return;

        setSelectedTimes(prevSelectedTimes => {
            if (prevSelectedTimes.includes(timeslot.id)) {
                return prevSelectedTimes.filter(id => id !== timeslot.id);
            } else {
                return [...prevSelectedTimes, timeslot.id];
            }
        });
    };

    const handleBooking = async () => {
        if (!user) {
            alert("Please log in to book a timeslot.");
            return;
        }

        if (selectedTimes.length === 0) {
            alert("Please select a timeslot.");
            return;
        }

        // const bookingData = {
        //     listTimeSlotId: selectedTimes,
        //     bookingDate: format(currentDate, 'yyyy-MM-dd')
        // };

        try {
            const response = await singleBooking(selectedTimes,formattedDate)
            alert("Booking successful!");
            onClose()
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking failed. Please try again.");
        }
    };

    const calculateTotalPrice = () => {
        const selectedSlots = timeslots.filter(slot => selectedTimes.includes(slot.id));
        return selectedSlots.reduce((total, slot) => total + slot.price, 0);
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 text-center mb-4"
                                    >
                                        Single Booking
                                    </Dialog.Title>
                                    <div className="flex justify-between items-center mb-4">
                                        <button
                                            type="button"
                                            onClick={handlePrevDay}
                                            disabled={isBefore(subDays(currentDate), new Date())}
                                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            &lt;
                                        </button>
                                        <span className="text-lg font-bold">
                                            {format(currentDate, 'dd MMMM yyyy')}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleNextDay}
                                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                    <div className="flex justify-center mb-4">
                                        <div className="flex items-center mr-4">
                                            <div className="w-4 h-4 bg-gray-300 mr-2" />
                                            <span>Already booked</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-green-500 mr-2" />
                                            <span>Selected</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        {timeslots.map(timeslot => (
                                            <div
                                                key={timeslot.id}
                                                className={`p-4 border rounded-lg text-center cursor-pointer 
                                                ${timeslot.isBooked ? 'bg-gray-300 text-black' : 
                                                (selectedTimes.includes(timeslot.id) ? 'bg-green-500 text-white' : 'bg-white hover:bg-blue-200 text-black')}
                                                `}
                                                onClick={() => handleTimeSlotClick(timeslot)}
                                            >
                                                {timeslot.startTime} - {timeslot.endTime}
                                                <div className="text-xs"><strong>Price:</strong> {timeslot.price} VND</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="text-lg font-bold">
                                            Total Price: {calculateTotalPrice()} VND
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleBooking}
                                        >
                                            Tiến hành đặt lịch
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
