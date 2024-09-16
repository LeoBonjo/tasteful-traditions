// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      const filteredSuggestions = recipes.filter(recipe =>
        recipe.title.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/recipes/${id}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/"><img src="https://i.imgur.com/Qzr2uJJ.png" alt="Tasteful Traditions Logo" className="navbar-logo" /></Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/countries">Countries</Link>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search for a recipe..." value={searchTerm} onChange={handleSearchChange} />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((recipe) => (
              <li key={recipe.id} onClick={() => handleSuggestionClick(recipe.id)}>
                {recipe.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="navbar-right">
        <Link to="/add-recipe">Add Recipe</Link>
        <Link to="/login">Log In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
