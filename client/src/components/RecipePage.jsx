import "./RecipePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecipePage = () => {
  const [recipeData, setRecipeData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        setRecipeData(data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };
    fetchRecipeData();
  }, [id]);

  if (!recipeData) return <p>Loading...</p>;

  const {
    title,
    image,
    servings,
    ingredients,
    instructions,
    restrictions,
    culture_desc,
    country,
    region,
  } = recipeData;

  return (
    <>
      <Navbar />
      <div className="recipe-page-container">
        <div className="back-to-all">
          <Link to="/recipes">
            <h3 className="fontawesome-icon">
              <FontAwesomeIcon icon={faCircleChevronLeft} /> All Recipes
            </h3>
          </Link>
        </div>

        <div className="recipe-header">
          <h1 className="recipe-title">{title}</h1>
        </div>

        <div className="recipe-image-container">
          <div className="dietary-info-box">
            {restrictions.map((res) => (
              <div className="restriction" key={res.id}>
                {res.restriction}
              </div>
            ))}
          </div>
          <div className="image-wrapper">
            <img className="recipe-image" src={image} alt={title} />
          </div>
        </div>

        <div className="recipe-meta">
          <div className="region">{region}</div>
          <div className="country">{country}</div>
        </div>

        <div className="recipe-description">
        <div className="ingredients-instructions">
        <h3 className="servings">
            {servings} Servings
          </h3>
            <div className="ingredients">
              <h3 className="ing-title">Ingredients</h3>
              <ul className="ingredients-list">
                {ingredients.map((ing) => (
                  <li key={ing.id}>
                    {ing.quantity} {ing.unit} {ing.ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="instructions">
              <h3 className="inst-title">Instructions</h3>
              <p>{instructions}</p>
            </div>
          </div>
          </div>
          <p className="culture-desc">
           <b> Did you know...?</b><p></p>
            {culture_desc}</p>
        </div>
     
      <Footer />
    </>
  );
};

export default RecipePage;
