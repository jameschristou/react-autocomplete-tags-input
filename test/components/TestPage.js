import React, {useState, useEffect} from "react";
import ReactAutoCompleteTagsInput from '../../src/ReactAutoCompleteTagsInput';

const TestPageComponent = () => {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setCompanyData(CompaniesDataService.getCompanyData);
    };

    fetchData();
  }, []);

  const addItemToDevList = (item) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.dev.push(item);

    setCompanyData(newCompanyData);
  }

  const deleteItemFromDevList = (itemToRemove) => {
    let newCompanyData = Object.assign({}, companyData); 
    
    newCompanyData.tech.dev = newCompanyData.tech.dev.filter(item => item != itemToRemove);

    setCompanyData(newCompanyData);
  }

  const addItemToToolsList = (item) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.tools.push(item);

    setCompanyData(newCompanyData);
  }

  const deleteItemFromToolsList = (itemToRemove) => {
    let newCompanyData = Object.assign({}, companyData); 
    
    newCompanyData.tech.tools = newCompanyData.tech.tools.filter(item => item != itemToRemove);

    setCompanyData(newCompanyData);
  }

  const filterDevOptionsHandler = (input) => {
    let options = ["ASP.NET Core", ".NET Core", "React", "Redux", "Redis", "Angular", "PHP", "Javascript", "Node", "SQL Server", "Webpack"];

    if(!input || input.length === 0){
      return options;
    }

    return options.filter(function(item) {
      return item.indexOf(input) >= 0;
    });
  }

  const filterToolsOptionsHandler = (input) => {
    let options = ["Jenkins", "Bamboo", "Octopus", "Elastic APM", "Sumologic", "Bitbucket", "Github", "Stash", "Jira", "Confluence", "New Relic", "Team City"];

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
      <div>
        <h3>Tech</h3>
        <label>Dev</label>
        <ReactAutoCompleteTagsInput items={companyData.tech.dev} addItemHandler={addItemToDevList} deleteItemHandler={deleteItemFromDevList} filterOptionsHandler={filterDevOptionsHandler}/>
        <label>Tools</label>
        <ReactAutoCompleteTagsInput items={companyData.tech.tools} addItemHandler={addItemToToolsList} deleteItemHandler={deleteItemFromToolsList} filterOptionsHandler={filterToolsOptionsHandler}/>
      </div>
    </div>
  );
}

const CompaniesDataService = {
  getCompanyData:{
    tech:{
      dev: ["ASP.NET Core", ".NET Core", "React", "Redux", "Javascript", "Node", "SQL Server", "Webpack"],
      classifications: [".NET", "AWS"],
      cloud: ["AWS"],
      architecture: ["Microservices"],
      tools: ["Jenkins", "Bamboo", "Octopus", "Elastic APM", "Sumologic", "Bitbucket", "Github", "Stash", "Jira", "Confluence"],
      analytics: ["Google Analytics"]
    }
  }
}

export default TestPageComponent;