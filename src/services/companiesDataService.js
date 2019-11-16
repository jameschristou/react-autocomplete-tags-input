const CompaniesDataService = {
  getCompaniesList:[
    {
      name:"carsales",
      id: "E04B9FFC-3F23-49F0-92BA-64B8C6853DD0"
    },
    {
      name: "seek",
      id: "151F91C3-9088-46DF-892B-3A989E88137A"
    },
    {
      name: "REA",
      id: "0E822201-BB5F-4ECE-B5A6-A94743331C6C"
    }
  ],
  getCompanyData:{
    name: "carsales",
    locations:[{
      "city": "Richmond",
      "state": "Victoria",
      "postcode": "3121"
    }],
    jobsPageUrl: "https://www.carsales.com.au/work-with-us/join-our-team",
    skills:{
      dev: [".NET", "ASP.NET", ".NET Core", "ASP.NET Core", "Javascript", "Angular", "React", "Redux", "AWS", "PHP", "Wordpress", "SQL Server", "DynamoDB", "AWS ECS", "Redis"],
      classifications: [".NET", "AWS", "Javascript"],
      cloud: ["AWS"],
      architecture: ["Microservices"]
    }
  }
}

export default CompaniesDataService;