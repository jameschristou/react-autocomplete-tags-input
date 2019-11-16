import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import CompaniesListComponent from './CompaniesList';
import CompanyDataComponent from './CompanyData';

const AppComponent = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CompaniesListComponent />
        </Route>
        <Route path="/companies/:id" children={<CompanyDataComponent />} />
      </Switch>
    </Router>
  );
}

export default AppComponent;