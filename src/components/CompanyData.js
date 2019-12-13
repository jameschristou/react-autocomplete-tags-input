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

  const filterOptionsHandler = (input) => {
    let options = ["ASP.NET Core", ".NET Core", "React", "Redux", "Redis", "Angular", "PHP", "Javascript", "Node", "SQL Server", "Webpack"];

    if(!input || input.length === 0){
      return options;
    }

    return options.filter(function(item) {
      return item.indexOf(input) >= 0;
    });
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
        <AutoCompleteTextBox label="Dev" items={companyData.tech.dev} updateListHandler={updateDevList} filterOptionsHandler={filterOptionsHandler}/>
        {/* <AutoCompleteTextBox label="Architecture" items={companyData.tech.architecture} updateListHandler={updateArchitectureList} filterOptionsHandler={filterOptionsHandler}/>
        <AutoCompleteTextBox label="Cloud" items={companyData.tech.cloud} updateListHandler={updateCloudList} filterOptionsHandler={filterOptionsHandler}/>
        <AutoCompleteTextBox label="Tools" items={companyData.tech.tools} updateListHandler={updateToolsList} filterOptionsHandler={filterOptionsHandler}/> */}
      </div>
    </div>
  );
}

export default CompanyDataComponent;