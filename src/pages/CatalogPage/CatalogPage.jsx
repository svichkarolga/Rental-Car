import React, { useState } from 'react';
import SearchBar from '../../components/SelectBar/SelectBar';
import CarList from '../../components/CarList/CarList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

const Catalog = () => {
  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const handleSearch = ({ brand, rentalPrice, mileageData }) => {
    setFilters({
      brand,
      rentalPrice,
      minMileage: mileageData.minMileage,
      maxMileage: mileageData.maxMileage,
    });
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <CarList filters={filters} page={page} setTotalPages={setTotalPages} />
      {totalPages && page >= totalPages ? (
        <p
          style={{
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '20px',
            color: '#3470ff',
          }}
        >
          Sorry, end of the collection!
        </p>
      ) : (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default Catalog;
