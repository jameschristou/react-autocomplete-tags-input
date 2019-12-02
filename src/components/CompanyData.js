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

  const updateDevList = (list) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.dev = list;

    setCompanyData(newCompanyData);
  }

  const updateArchitectureList = (list) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.architecture = list;

    setCompanyData(newCompanyData);
  }

  const updateCloudList = (list) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.cloud = list;

    setCompanyData(newCompanyData);
  }

  const updateToolsList = (list) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.tools = list;

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
        <AutoCompleteTextBox label="Architecture" items={companyData.tech.architecture} updateListHandler={updateArchitectureList}/>
        <AutoCompleteTextBox label="Cloud" items={companyData.tech.cloud} updateListHandler={updateCloudList}/>
        <AutoCompleteTextBox label="Tools" items={companyData.tech.tools} updateListHandler={updateToolsList}/>
      </div>
    </div>
  );
}

export default CompanyDataComponent;