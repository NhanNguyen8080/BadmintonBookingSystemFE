import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { format, eachDayOfInterval, isBefore } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from "../../redux/slices/authSlice";
import { fixedBooking } from "../../services/bookingService";
import { fetchTimeSlot } from "../../services/timeslotService";

export default function FixedBookingModal({ isOpen, onClose, courtId }) {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [dayOfAWeek, setDayOfAWeek] = useState(1);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const user = useSelector(selectUser);
    const [timeslots, setTimeslots] = useState([]);
    const [week, setWeek] = useState([]);

    useEffect(() => {
        setSelectedTimes([]);
        if (isOpen) {
            fetchTimeSlots();
        }
    }, [isOpen, fromDate, toDate, dayOfAWeek]);

    const fetchTimeSlots = async () => {
        try {
            const allMondays = eachDayOfInterval({
                start: fromDate,
                end: toDate,
            }).filter(date => date.getDay() === dayOfAWeek);

            // Create an object to accumulate the dates and slots
            const dateSlotsMap = {};

            const allSlots = await Promise.all(allMondays.map(async date => {
                const formattedDate = format(date, 'yyyy-MM-dd');
                const slots = await fetchTimeSlot(courtId, formattedDate);

                // Group slots by date
                dateSlotsMap[formattedDate] = slots;
                return slots;
            }));

            // Sort dates in descending order and set the week and grouped slots
            const sortedDates = Object.keys(dateSlotsMap).sort((a, b) => new Date(a) - new Date(b));
            setWeek(sortedDates);
            setTimeslots(dateSlotsMap);
        } catch (error) {
            console.error("Failed to fetch timeslots:", error);
            alert("Failed to fetch timeslots. Please try again.");
        }
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

        const bookingData = {
            listTimeSlotId: selectedTimes,
            fromDate: format(fromDate, 'yyyy-MM-dd'),
            toDate: format(toDate, 'yyyy-MM-dd'),
            dayOfAWeek,
        };
        try {
            const response = await fixedBooking(bookingData);
            alert("Fixed booking successful!");
            onClose();
        } catch (error) {
            console.error("Fixed booking failed:", error);
            alert("Fixed booking failed. Please try again.");
        }
    };

    const calculateTotalPrice = () => {
        // Set to store unique slot prices based on their IDs
        const slotPrices = {};
    
        selectedTimes.forEach(id => {
            for (const date of week) {
                const slot = timeslots[date].find(slot => slot.id === id);
                if (slot) {
                    // Store the price in the object, ensuring it's the same for all occurrences of the same ID
                    slotPrices[slot.id] = slot.price;
                    break; // Exit loop once the slot is found
                }
            }
        });
    
        // Calculate total price for one week
        const totalPricePerWeek = Object.values(slotPrices).reduce((sum, price) => sum + price, 0);
    
        // Calculate the number of weeks in the date range
        const weeksCount = eachDayOfInterval({
            start: fromDate,
            end: toDate
        }).filter(date => date.getDay() === dayOfAWeek).length;
    
        // Total price is the price per week multiplied by the number of weeks
        return totalPricePerWeek * weeksCount;
    };

    // Handler to update fromDate
    const handleFromDateChange = (e) => {
        const newFromDate = new Date(e.target.value);
        if (isBefore(newFromDate, new Date())) {
            alert("From Date cannot be in the past.");
            return;
        }
        setFromDate(newFromDate);

        // Ensure toDate is not before new fromDate
        if (isBefore(toDate, newFromDate)) {
            setToDate(newFromDate);
        }
    };

    // Handler to update toDate
    const handleToDateChange = (e) => {
        const newToDate = new Date(e.target.value);
        if (isBefore(newToDate, fromDate)) {
            alert("To Date cannot be before From Date.");
            return;
        }
        setToDate(newToDate);
    };

    return (
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
                    <div className="flex min-h-fit items-center justify-center p-4 text-center">
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
                                    Fixed Booking
                                </Dialog.Title>
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
                                <div className="flex justify-between">
                                    <div className="flex space-x-5">
                                        <div className="mb-4">
                                            <label htmlFor="from-date" className="block text-sm font-medium text-gray-700">
                                                From Date
                                            </label>
                                            <input
                                                type="date"
                                                id="from-date"
                                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={format(fromDate, 'yyyy-MM-dd')}
                                                onChange={handleFromDateChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="to-date" className="block text-sm font-medium text-gray-700">
                                                To Date
                                            </label>
                                            <input
                                                type="date"
                                                id="to-date"
                                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={format(toDate, 'yyyy-MM-dd')}
                                                onChange={handleToDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="day-of-week" className="block text-sm font-medium text-gray-700">
                                            Day of Week
                                        </label>
                                        <select
                                            id="day-of-week"
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={dayOfAWeek}
                                            onChange={(e) => setDayOfAWeek(parseInt(e.target.value))}
                                        >
                                            <option value={0}>Sunday</option>
                                            <option value={1}>Monday</option>
                                            <option value={2}>Tuesday</option>
                                            <option value={3}>Wednesday</option>
                                            <option value={4}>Thursday</option>
                                            <option value={5}>Friday</option>
                                            <option value={6}>Saturday</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[calc(60vh-4rem)] overflow-y-auto">
                                        {week.map(date => (
                                            <div key={date} className="p-2 border">
                                                <h4 className="text-center font-bold">{date}</h4>
                                                {timeslots[date] && timeslots[date].map(timeslot => (
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
                                        ))}
                                    </div>
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
                                        Confirm Booking
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
