import React, {memo} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const CompaniesTableRowComponent = memo(({company}) => {
  console.log("Rendering row:" + company.name);

  return (
    <tr>
      <td className="company__name"><Link to={"/companies/" + company.name}>{company.name}</Link></td>
    </tr>
  );
});

export default CompaniesTableRowComponent;