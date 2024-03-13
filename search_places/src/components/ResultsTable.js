
import React from 'react';

const ResultsTable = ({ searchResults }) => {
    return (
        <div className="table-container">
          <table className="results-table">
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
                
                  {/* <td>
                    <img src={flagUrl.replace(':file_type', 'png').replace(':country_code', result.countryId)} alt={`Flag of ${result.country}`} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    
};

export default ResultsTable;
