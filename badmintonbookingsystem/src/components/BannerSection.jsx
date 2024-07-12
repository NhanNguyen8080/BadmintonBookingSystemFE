import React from 'react';
import Banner from './Banner';

const BannerSection = () => {
    const banners = [
        { src: '/images/banner1.jpg', alt: 'Banner 1' },
        { src: '/images/banner2.jpg', alt: 'Banner 2' },
        { src: '/images/banner3.jpg', alt: 'Banner 3' },
    ];

    return (
        <div style={styles.bannerSection}>
            {banners.map((banner, index) => (
                <Banner key={index} imageSrc={banner.src} altText={banner.alt} />
            ))}
        </div>
    );
};

const styles = {
    bannerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        padding: '0 20px',
    },
};

export default BannerSection;