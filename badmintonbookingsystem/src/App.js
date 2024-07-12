import logo from './logo.svg';
import './App.css';
import Header from './layouts/Header';
import SearchBar from './components/SearchBar';
import BannerSection from './components/BannerSection';

function App() {
  return (
    <div>
      <Header />
      <SearchBar />
      <BannerSection />
    </div>
  );
}

export default App;
