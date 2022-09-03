import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipe";

const LoggedInHome = () => {
  const [recipies, setRecipies] = useState([]);
  useEffect(() => {
    fetch("/recipe/recipies")
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        setRecipies(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="recipies">
      <h1>List of Recipies</h1>
      {recipies.map((recipe) => (
        <Recipe title={recipe.title} description={recipe.description} />
      ))}
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
    <div>{logged ? <LoggedInHome /> : <LoggedOutHome />}</div>
  );
};

export default HomePage;
