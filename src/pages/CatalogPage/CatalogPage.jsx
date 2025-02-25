import React from 'react';
import SearchBar from '../../components/SelectBar/SelectBar';

const Catalog = () => {
  const handleSearch = data => {
    console.log('Search data:', data);
  };
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
    </div>
  );
};

export default Catalog;
