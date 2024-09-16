import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Navbar from './Navbar';
import Footer from "./Footer";
import './Homepage.css';
import MapContainer from './MapContainer';

const Homepage = () => {
  const [dishOfTheDay, setDishOfTheDay] = useState(null);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  // Predefined recipe IDs
  const dishOfTheDayId = 41;
  const featuredRecipeIds = [5, 9, 27, 29];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the Dish of the Day
        const dishResponse = await fetch(`/api/recipes/${dishOfTheDayId}`);
        const dishData = await dishResponse.json();
        setDishOfTheDay(dishData);

        // Fetch the Featured Recipes
        const featuredPromises = featuredRecipeIds.map(id =>
          fetch(`/api/recipes/${id}`).then(response => response.json())
        );
        const featuredResults = await Promise.all(featuredPromises);
        setFeaturedRecipes(featuredResults); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="homepage">
        <section className="dish-of-the-day">
          <div className="dish-of-the-day-wrapper">
            <h2>This Week's Feature</h2>
            {dishOfTheDay ? (
              <div className="dish-of-the-day-content">
                <img src={dishOfTheDay.image} alt={dishOfTheDay.title} className="dish-image" />
                <div className="dish-details">
                  <h3>{dishOfTheDay.title}</h3>
                  <p>{dishOfTheDay.culture_desc}</p>
                  <Link to={`/recipes/${dishOfTheDay.id}`} className="view-recipe-link">
                    View the Recipe
                  </Link>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>

        <section className="featured-recipes">
          <h2>More to Love</h2>
          <div className="featured-recipes-grid">
            {featuredRecipes.length > 0 ? (
              featuredRecipes.map(recipe => (
                <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="recipe-item-link">
                  <div className="recipe-item">
                    <img src={recipe.image} alt={recipe.title} />
                    <h3>{recipe.title}</h3>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
      </div>
      <MapContainer />
      <Footer />
    </>
  );
};

export default Homepage;
