import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from '../src/pages/HomePage/HomePage';
import Catalog from './pages/Catalog/Catalog';
import CarDetails from './pages/CarDetails/CarDetails';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
  return (
    <div className="thumb">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CarDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
