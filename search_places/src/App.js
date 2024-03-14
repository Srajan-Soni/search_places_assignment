import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL,API_KEY } from './api/keys';
import dummyresp from './dummy_responce';
import './App.css'

const FLAG_API_URL = 'https://www.countryflagsapi.com/png/:file_type/:country_code';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // fetchSearchResults();
    console.log(searchQuery);
    const data = searchResults.filter(curr=> curr.city===searchQuery );
    setSearchResults(data);
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
    <div className='search-container' >
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className='search-input'
          placeholder="Search Places"
        
        />
        <input type="submit" className='btn-submit' />
      </form>

      {isLoading && <div>Loading...</div>}

      {searchResults.length === 0 && !isLoading && <div>No result found</div>}
      <div className='table-container'>
      <table className='results-table'>
      <thead>
              <tr>
                <th>#</th>
                <th>Place Name</th>
                {/* <th>City</th> */}
                <th>Country</th>
                <th>Country Code</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody className='records'>
              {searchResults.map((result, index) => (
                <tr key={result.id}>
                  <td>{index + 1}</td>
                  {/* {console.log(result)} */}
                  <td>{result.city}</td>
                  <td>{result.country}</td>
                  <td>{result.countryCode}</td>
                  <td>{result.region}</td>
                
              
                </tr>
              ))}
            </tbody>
      </table>
      </div>
      {totalPages > 0 && (
        <div>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button key={pageNumber} onClick={() => handlePaginationClick(pageNumber)}>
              {pageNumber}
            </button>
          ))}
        </div>
      )}

    
    </div>
  );
};

export default App;
