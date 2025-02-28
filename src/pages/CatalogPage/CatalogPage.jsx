import React, { useState } from 'react';
import SearchBar from '../../components/SelectBar/SelectBar';
import CarList from '../../components/CarList/CarList';
import LoadMoreBtn from '../../LoadMoreBTN/LoadMoreBtn';

const Catalog = () => {
  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });
  const [page, setPage] = useState(1);

  const handleSearch = ({ brand, rentalPrice, mileageData }) => {
    setFilters({
      brand,
      rentalPrice,
      minMileage: mileageData.minMileage,
      maxMileage: mileageData.maxMileage,
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <CarList filters={filters} page={page} />
      <LoadMoreBtn onClick={handleLoadMore} />
    </div>
  );
};

export default Catalog;
