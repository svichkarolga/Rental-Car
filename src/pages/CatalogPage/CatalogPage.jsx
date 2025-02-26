import React from 'react';
import SearchBar from '../../components/SelectBar/SelectBar';
import CarList from '../../components/CarList/CarList';

const Catalog = () => {
  const handleSearch = data => {
    console.log('Search data:', data);
  };
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <CarList />
    </div>
  );
};

export default Catalog;
