import React, { useState } from 'react';
import SearchBar from '../../components/SelectBar/SelectBar';
import CarList from '../../components/CarList/CarList';

const Catalog = () => {
  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });

  const handleSearch = ({ brand, rentalPrice, mileageData }) => {
    setFilters({
      brand,
      rentalPrice,
      minMileage: mileageData.minMileage,
      maxMileage: mileageData.maxMileage,
    });
  };
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <CarList filters={filters} />
    </div>
  );
};

export default Catalog;
