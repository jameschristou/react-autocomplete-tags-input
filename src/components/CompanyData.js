import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const CompanyDataComponent = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { name } = useParams();

  return (
    <div>
      <h3>Name: {name}</h3>
    </div>
  );
}

export default CompanyDataComponent;