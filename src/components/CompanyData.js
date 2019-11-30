import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import CompaniesDataService from '../services/CompaniesDataService';
import AutoCompleteTextBox from './AutoCompleteTextBox';

const CompanyDataComponent = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { name } = useParams();

  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setCompanyData(CompaniesDataService.getCompanyData);
    };

    fetchData();
  }, []);

  const updateDevList = (devList) => {
    console.log('Updating dev list');
    console.log(devList);
    let newCompanyData = companyData;
    newCompanyData.tech.dev = devList;

    setCompanyData(newCompanyData);
  }

  if(companyData == null){
    return (
      <div>Loading.....</div>
    );
  }
  
  return (
    <div>
      <h2>Company Details: {companyData.name}</h2>
      <div>Name: {companyData.name}</div>
      <div>Id: {companyData.id}</div>
      <div>Jobs Page Url: {companyData.jobsPageUrl}</div>
      <div>
        <h3>Tech</h3>
        <AutoCompleteTextBox label="Dev" items={companyData.tech.dev} updateListHandler={updateDevList}/>
        <AutoCompleteTextBox label="Architecture" items={companyData.tech.architecture}/>
        <AutoCompleteTextBox label="Cloud" items={companyData.tech.cloud}/>
        <AutoCompleteTextBox label="Tools" items={companyData.tech.tools}/>
      </div>
    </div>
  );
}

export default CompanyDataComponent;