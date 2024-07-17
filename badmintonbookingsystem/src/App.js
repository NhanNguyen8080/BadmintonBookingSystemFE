import logo from './logo.svg';
import './App.css';
import Header from './layouts/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourtPage from './pages/CourtPage';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/badminton-centers/:centerId' element={<CourtPage />} />
      </Routes>


    </div>
  );
}

export default App;
