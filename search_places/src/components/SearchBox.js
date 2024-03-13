
import React from 'react';
import { useGlobalContext } from '../GlobalContext';

const SearchBox = ({ value, onChange, onSubmit }) => {

    const { setSearchQuery , setSearchResults, searchResults} = useGlobalContext(); 

    const searchQueryResult = (query)=>{
        setSearchQuery(query);
        // const data = searchResults.filter()
        console.log(query);
    }

    return (
        <div className="search-container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={value}
              onChange={(e)=>{ searchQueryResult(e.target.value) }}
              placeholder="Search Places"
              className="search-input"
            />
        
          </form>
        </div>
      );
};

export default SearchBox;
