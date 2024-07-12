import React from 'react';

const Banner = ({ imageSrc, altText }) => {
    return (
        <div style={styles.banner}>
            <img src={imageSrc} alt={altText} style={styles.image} />
        </div>
    );
};

const styles = {
    banner: {
        width: '30%',
        margin: '10px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
};

export default Banner;