import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";

const LoggedInHome = () => {
  return (
    <div className="recipies">
      <h1>List of Recipies</h1>
    </div>
  );
};
const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="heading">Welcome to the Recipies</h1>
      <Link to="/signup" className="btn btn-primary  btn-lg">
        Getting Started
      </Link>
    </div>
  );
};

const HomePage = () => {
  const [logged] = useAuth();
  return (
    //  {logged?<loggedInHome/>:<loggedOutHome/>}
    <div>{logged?<LoggedInHome/>:<LoggedOutHome/>}</div>
  );
};

export default HomePage;
