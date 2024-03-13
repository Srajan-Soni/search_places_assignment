import { createContext, useContext, useState } from 'react';
import dummyresp from './dummy_responce';
import axios from 'axios';
import { API_KEY,API_URL } from './api/keys';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchResults, setSearchResults] = useState([]);

  
  return (
    <GlobalContext.Provider value={{
      searchQuery,
      setSearchQuery,
      isLoading,
      setIsLoading,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      setItemsPerPage,
      totalPages,
      setTotalPages,
      limit,
      setLimit,
      searchResults,
      setSearchResults,
      
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
