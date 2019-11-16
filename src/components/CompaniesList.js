import React, {useState, useEffect } from 'react';
import CompaniesDataService from '../services/CompaniesDataService';
import CompaniesTableRowComponent from './CompaniesTableRow';

const CompaniesListComponent = (props) => {
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCompaniesList(CompaniesDataService.getCompaniesList);
    };

    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {companiesList.map(
                (company, index) => {
                  return (
                    <CompaniesTableRowComponent
                      key={index}
                      company={company}
                    />
                  );
                }
              )}
        </tbody>
      </table>
    </div>
  );
}

export default CompaniesListComponent;