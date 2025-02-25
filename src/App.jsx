import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from '../src/pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CarDetailsPage from './pages/CarDetailsPage/CarDetailsPage';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
  return (
    <div className="thumb">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
