import React, {useState, useEffect} from "react";
import ReactAutoCompleteTagsInput from "@jchristou/react-autocomplete-tags-input"

const TestPageComponent = () => {
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
        <ReactAutoCompleteTagsInput label="Dev" items={companyData.tech.dev} updateListHandler={updateDevList} filterOptionsHandler={filterDevOptionsHandler}/>
        {/* <AutoCompleteTextBox label="Architecture" items={companyData.tech.architecture} updateListHandler={updateArchitectureList} filterOptionsHandler={filterOptionsHandler}/>
        <AutoCompleteTextBox label="Cloud" items={companyData.tech.cloud} updateListHandler={updateCloudList} filterOptionsHandler={filterOptionsHandler}/> */}
        {/* <AutoCompleteTagsInput label="Tools" items={companyData.tech.tools} updateListHandler={updateToolsList} filterOptionsHandler={filterToolsOptionsHandler}/> */}
      </div>
    </div>
  );
}

const CompaniesDataService = {
  getCompanyData:{
    tech:{
      dev: [".NET", "ASP.NET", ".NET Core", "ASP.NET Core", "Javascript", "Angular", "React", "Redux", "AWS", "PHP", "Wordpress", "SQL Server", "DynamoDB", "AWS ECS", "Redis", "RabbitMQ"],
      classifications: [".NET", "AWS"],
      cloud: ["AWS"],
      architecture: ["Microservices"],
      tools: ["Jenkins", "Bamboo", "Octopus", "Elastic APM", "Sumologic", "Bitbucket", "Github", "Stash", "Jira", "Confluence"],
      analytics: ["Google Analytics"]
    }
  }
}

export default TestPageComponent;