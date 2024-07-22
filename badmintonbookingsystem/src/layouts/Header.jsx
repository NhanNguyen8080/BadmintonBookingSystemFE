import React from 'react';
import SignInModal from '../components/Auth/SignInModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice';
import Logout from '../components/Auth/Logout';

const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();


    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                <img src="/images/logo.png" alt="Logo" style={styles.logoImage} />
            </div>
            <nav style={styles.nav}>
                <a href="#offers" style={styles.navLink}>Ưu đãi</a>
                <a href="#hotels" style={styles.navLink}>Danh mục khách sạn</a>
            </nav>
            {user ? (
                <>
                    {/* {console.log(user)} */}
                    <div className="user-info">
                        <i className="user-icon">👤</i>
                        <span>Xin chào! {user.unique_name}  </span>
                        <Logout />
                        {/* <button
                            className="logout-button text-gray-700 transition-colors duration-300 rounded-md hover:text-black hover:bg-gray-100 py-2 px-4"
                            style={styles.logoutButton}
                        >
                            Logout
                        </button> */}
                    </div>
                </>
            ) : (
                <div className="auth-buttons">
                    <SignInModal />
                </div>
            )}
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    logoImage: {
        maxWidth: '100px',
        height: '70px'
    },
    nav: {
        display: 'flex',
        gap: '20px'
    },
    navLink: {
        color: '#333',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s',
    },
    userActions: {
        display: 'flex',
        gap: '15px'
    },
    login: {
        padding: '10px 20px',
        borderRadius: '30px',
        border: '2px solid #FF6600',
        color: '#FF6600',
        backgroundColor: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'all 0.3s',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    register: {
        padding: '10px 20px',
        borderRadius: '30px',
        color: '#fff',
        backgroundColor: '#FF6600',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'all 0.3s',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    loginHover: {
        backgroundColor: '#FF6600',
        color: '#fff',
    },
    registerHover: {
        backgroundColor: '#e55d00',
    },
};

export default Header;
