import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SelectBar/SelectBar';
import CarList from '../../components/CarList/CarList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { PropagateLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

const Catalog = () => {
  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (prevPath === location.pathname) {
      setFilters({
        brand: '',
        rentalPrice: '',
        minMileage: '',
        maxMileage: '',
      });
      setPage(1);
    }
    setPrevPath(location.pathname);
  }, [location.key]);

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

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [filters, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0',
          }}
        >
          <PropagateLoader color="#3470ff" size={15} />
        </div>
      ) : (
        <>
          <CarList
            filters={filters}
            page={page}
            setTotalPages={setTotalPages}
          />
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
        </>
      )}
    </div>
  );
};

export default Catalog;
