import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CenterList from './CenterList';
import { fetchCenters } from '../services/centerService';

function HomePage() {
    const [initialCenters, setInitialCenters] = useState([]);
    const [filterdCenters, setFilterdCenters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const centersData = await fetchCenters();
                setInitialCenters(centersData);
                setFilterdCenters(centersData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleSearchResults = (searchResults) => {
        setFilterdCenters(searchResults);
    };
    return (
        <div>
            <SearchBar onSearch={handleSearchResults} />
            <CenterList centers={filterdCenters ? filterdCenters : initialCenters} />
        </div>
    );
}

export default HomePage;