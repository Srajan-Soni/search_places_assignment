import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from './GlobalContext';
import SearchBox from './components/SearchBox';
import ResultsTable from './components/ResultsTable';
import Pagination from './components/Pagination';
import LimitSelector from './components/LimitSelector';
import { API_KEY, API_URL } from './api/keys';
import './App.css';
import dummyresp from './dummy_responce';

const FLAG_API_URL = 'https://www.countryflagsapi.com/png/:file_type/:country_code';

const App = () => {
  const { searchQuery, setSearchQuery, isLoading, setIsLoading, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, totalPages, setTotalPages, limit, setLimit } = useGlobalContext();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery, currentPage, limit]);

  const fetchSearchResults = async () => {
    
    try {
      const response = await axios.get(API_URL, {
        params: {
          countryIds: 'IN',
          namePrefix: searchQuery,
          limit: limit
        },
        headers: {
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
      });
      console.log(searchQuery);

      setSearchResults(response.data);
      setTotalPages(Math.ceil(response.data.metadata.totalCount / itemsPerPage));
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults(dummyresp.data);
    } 
  };
  // console.log(searchQuery);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    if (newLimit > 10) {
      alert('Maximum limit allowed is 10');
    } else {
      setLimit(newLimit);
    }
  };

  return (
    <div className='search-container'>
      <SearchBox
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSubmit={handleSearchSubmit}
      />

      {isLoading && <div>Loading...</div>}

      {searchResults.length === 0 && !isLoading && <div>No result found</div>}

      <ResultsTable
        searchResults={searchResults}
        flagUrl={FLAG_API_URL}
      />

      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          onClick={handlePaginationClick}
        />
      )}

      <LimitSelector
        limit={limit}
        onChange={handleLimitChange}
      />
    </div>
  );
};

export default App;
