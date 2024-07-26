import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchSearchBadmintonCenter } from '../services/centerService';

const parseTime = (timeStr) => {
    if (!timeStr) {
        return '';
    }
    else {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, seconds || 0);
        return date.toTimeString().slice(0, 8);
    }

};

const onSubmit = async (data) => {
    const { location, operatingTime, closingTime } = data;

    try {
        console.log(location);
        console.log(operatingTime);
        console.log(closingTime);
        const response = await fetchSearchBadmintonCenter(location,
            parseTime(operatingTime),
            parseTime(closingTime));
        console.log(response);
        // onTimeSlotAdded(response, courtId);
    } catch (error) {
        console.error('Error creating TimeSlot:', error);
    }
};

const SearchBar = ({ onSearch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { location, operatingTime, closingTime } = data;

        try {
            const response = await fetchSearchBadmintonCenter(
                location,
                parseTime(operatingTime),
                parseTime(closingTime)
            );
            onSearch(response); // Call the parent function with the search results
        } catch (error) {
            console.error('Error creating TimeSlot:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={styles.backgroundContainer}>
                <div style={styles.searchBarContainer}>
                    <div style={styles.searchBar}>
                        <div style={styles.inputGroup}>
                            <span style={styles.icon}>📍</span>
                            <div>
                                <label style={styles.label}>Địa điểm</label>
                                <input
                                    type="text"
                                    {...register('location')}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="Bạn muốn tìm sân ở đâu?" style={styles.input} />
                            </div>
                        </div>
                        <div style={styles.inputGroup}>
                            <span style={styles.icon}>➡️</span>
                            <div>
                                <label style={styles.label}>Giờ hoạt động</label>
                                <input
                                    type="time"
                                    {...register('operatingTime')}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="Bất kỳ" style={styles.input} />
                            </div>
                        </div>
                        <div style={styles.inputGroup}>
                            <span style={styles.icon}>⬅️</span>
                            <div>
                                <label style={styles.label}>Giờ đóng cửa</label>
                                <input
                                    type="time"
                                    {...register('closingTime')}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="Bất kỳ" style={styles.input} />
                            </div>
                        </div>
                        <button type='submit' style={styles.button}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </form>

    );
};

const styles = {
    backgroundContainer: {
        backgroundImage: 'url("/images/background.jpg")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 0'
    },
    searchBarContainer: {
        margin: '0 auto',
        maxWidth: '1200px',
        backgroundColor: '#fff',
        borderRadius: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '40px'
    },
    tabs: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px'
    },
    tab: {
        padding: '10px 20px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#000'
    },
    activeTab: {
        color: '#FF6600',
        borderBottom: '2px solid #FF6600'
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '30px',
        border: '1px solid #ddd'
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        marginRight: '10px'
    },
    icon: {
        marginRight: '10px',
        fontSize: '20px'
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#333'
    },
    input: {
        width: '100%',
        padding: '5px 10px',
        border: 'none',
        outline: 'none'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#FF6600',
        color: '#fff',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer'
    }
};

export default SearchBar;