import './CountryPage.css';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';

// Define the CountryPage component as a functional component using an arrow function
const CountryPage = () => {
  // State to hold the country data (starts as null)
  const [countryData, setCountryData] = useState(null);
  // Get the "id" from the URL (like if URL is "/countries/1", id is "1")
  const { id } = useParams();
  // So you can navigate to different pages
  const navigate = useNavigate();

  // Fetch country data when the component loads or when "id" changes
  useEffect(() => {
    // Async function to get data from the backend
    const fetchCountryData = async () => {
      try {
        // Fetch data for the country with the given "id"
        const response = await fetch(`/api/countries/${id}`);
        // Convert the response to JSON and save it to state
        const data = await response.json();
        setCountryData(data);
        // Log any errors to the console
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    // Call the function to start fetching data
    fetchCountryData();
    // Runs again if "id" changes
  }, [id]);

  // Show msg until data is fetched
  if (!countryData) return <p>Loading...</p>;

  // Get location and recipes from the fetched country data
  const { location, recipes } = countryData;

  // Navigate to a recipe's page when clicked
  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <>
      <Navbar />
    <div className="country-page">
    <h1 className="country-page-title">{location.country}</h1>
      <img src={location.image} alt={location.country} className="country-image" />
      <div className="country-description">
        <p>{location.culture}</p>
      </div>

      <h2>Recipes from {location.country}</h2>
      {recipes.length > 0 ? 
      (<div className="recipes-container">
        {/* Map through each recipe and display its details */}
        {recipes.map((recipe) => (
          // Handle click event to show details of the recipe
            <div key={recipe.id} className="recipe-item" onClick={() => handleRecipeClick(recipe.id)}>
              <img src={recipe.image} alt={recipe.title}/>
              <div className="recipe-title">{recipe.title}</div>
            </div>
          ))}</div>) 
      : (<p>No recipes found.</p>)}
    </div>
    <Footer />
    </>
  );
};

export default CountryPage;
