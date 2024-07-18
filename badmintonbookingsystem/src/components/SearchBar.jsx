import React from 'react';

const SearchBar = () => {
    return (
        <div style={styles.backgroundContainer}>
            <div style={styles.searchBarContainer}>
                <div style={styles.tabs}>
                    <a href="#hourly" style={{ ...styles.tab, ...styles.activeTab }}>Theo giờ</a>
                    <a href="#monthly" style={styles.tab}>Theo tháng</a>
                    {/* <a href="#daily" style={styles.tab}>Theo ngày</a> */}
                </div>
                <div style={styles.searchBar}>
                    <div style={styles.inputGroup}>
                        <span style={styles.icon}>📍</span>
                        <div>
                            <label style={styles.label}>Địa điểm</label>
                            <input type="text" placeholder="Bạn muốn tìm sân ở đâu?" style={styles.input} />
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <span style={styles.icon}>➡️</span>
                        <div>
                            <label style={styles.label}>Giờ hoạt động</label>
                            <input type="text" placeholder="Bất kỳ" style={styles.input} />
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <span style={styles.icon}>⬅️</span>
                        <div>
                            <label style={styles.label}>Giờ kết thúc</label>
                            <input type="text" placeholder="Bất kỳ" style={styles.input} />
                        </div>
                    </div>
                    <button style={styles.button}>Tìm kiếm</button>
                </div>
            </div>
        </div>
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