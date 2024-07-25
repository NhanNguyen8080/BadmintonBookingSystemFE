import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { format, eachDayOfInterval, isBefore } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from "../../redux/slices/authSlice";
import { flexBooking } from "../../services/bookingService";
import { fetchTimeSlot } from "../../services/timeSlotService";

export default function FlexBooking({ isOpen, onClose, courtId }) {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [selectedTimes, setSelectedTimes] = useState([]);
    const user = useSelector(selectUser);
    const [timeslots, setTimeslots] = useState({});
    const [dates, setDates] = useState([]);

    useEffect(() => {
        setSelectedTimes([]);
        if (isOpen) {
            fetchTimeSlots();
        }
    }, [isOpen, fromDate, toDate]);

    const fetchTimeSlots = async () => {
        try {
            const allDates = eachDayOfInterval({
                start: fromDate,
                end: toDate,
            });

            const dateSlotsMap = {};

            await Promise.all(allDates.map(async date => {
                const formattedDate = format(date, 'yyyy-MM-dd');
                const slots = await fetchTimeSlot(courtId, formattedDate);
                dateSlotsMap[formattedDate] = slots;
            }));

            const sortedDates = Object.keys(dateSlotsMap).sort((a, b) => new Date(a) - new Date(b));
            setDates(sortedDates);
            setTimeslots(dateSlotsMap);
        } catch (error) {
            console.error("Failed to fetch timeslots:", error);
            alert("Failed to fetch timeslots. Please try again.");
        }
    };

    const handleTimeSlotClick = (date, timeslot) => {
        if (timeslot.isBooked) return;

        const slotId = `${date}|${timeslot.id}`;  // Use | as the delimiter

        setSelectedTimes(prevSelectedTimes => {
            if (prevSelectedTimes.includes(slotId)) {
                return prevSelectedTimes.filter(id => id !== slotId);
            } else {
                return [...prevSelectedTimes, slotId];
            }
        });
    };

    const calculateTotalPrice = () => {
        return selectedTimes.reduce((total, slotId) => {
            const [date, id] = slotId.split('|');
            const timeslot = timeslots[date]?.find(slot => slot.id === id);
            if (timeslot) {
                return total + timeslot.price;
            }
            return total;
        }, 0);
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

        // Group selected times by date
        const groupedBookings = selectedTimes.reduce((acc, slotId) => {
            const [date, id] = slotId.split('|');
            if (!acc[date]) {
                acc[date] = { bookingDate: date, listTimeSlotId: [] };
            }
            acc[date].listTimeSlotId.push(id);
            return acc;
        }, {});

        const bookings = Object.values(groupedBookings);

        try {
            await flexBooking(bookings);
            alert("Booking successful!");
            onClose();
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking failed. Please try again.");
        }
    };

    const handleFromDateChange = (e) => {
        const newFromDate = new Date(e.target.value);
        if (isBefore(newFromDate, new Date())) {
            alert("From Date cannot be in the past.");
            return;
        }
        setFromDate(newFromDate);

        if (isBefore(toDate, newFromDate)) {
            setToDate(newFromDate);
        }
    };

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
                                    Flex Booking
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
                                </div>

                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[calc(60vh-4rem)] overflow-y-auto">
                                        {dates.map(date => (
                                            <div key={date} className="p-2 border">
                                                <h4 className="text-center font-bold">{date}</h4>
                                                {timeslots[date] && timeslots[date].map(timeslot => (
                                                    <div
                                                        key={timeslot.id}
                                                        className={`p-4 border rounded-lg text-center cursor-pointer mt-2 ${timeslot.isBooked ? 'bg-gray-300' : selectedTimes.includes(`${date}|${timeslot.id}`) ? 'bg-green-500 text-white' : 'bg-white'}`}
                                                        onClick={() => handleTimeSlotClick(date, timeslot)}
                                                    >
                                                        {timeslot.startTime} - {timeslot.endTime}
                                                        <div className="text-sm text-gray-600">Price: {timeslot.price}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="text-right font-medium">
                                        Total Price: {calculateTotalPrice()} VND
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={handleBooking}
                                    >
                                        Book Now
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-4 ml-4 inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Cancel
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
