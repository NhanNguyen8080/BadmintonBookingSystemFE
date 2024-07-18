import BannerSection from '../components/BannerSection';
import SearchBar from '../components/SearchBar';
import CenterList from './CenterList';

function HomePage() {
    return (
        <div>
            <SearchBar />
            <CenterList />
        </div>
    );
}

export default HomePage;