import React, { useEffect, useState } from "react";
import "./RecipesPage.css";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, Form, Container, Row, Col } from "react-bootstrap";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [category, setCategory] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        filterRecipes();
    }, [searchParams, recipes]);

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`/api/recipes`);
            const data = await response.json();
            setRecipes(data);
            setFilteredRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const filterRecipes = () => {
        const params = Object.fromEntries(searchParams.entries());
        const category = Object.keys(params)[0];
        const searchInput = params[category] || "";

        if (!searchInput || !category) {
            setFilteredRecipes(recipes);
            return;
        }

        const filtered = recipes.filter(recipe =>
            recipe[category]?.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setSearchParams({ [category]: searchInput });
    };

    const formatRestrictions = (restrictions) => {
        return restrictions.map(res => res.restriction).join(', ');
    };

    return (
        <div className="recipes-page">
            <Navbar />
            <Container>
                <h1 className="page-title">All Recipes</h1>

                {/* Bootstrap Styled Search Form */}
                <Form className="search-form" onSubmit={handleSubmitSearch}>
                    <Row className="mb-4 align-items-center">
                        <Col md={3}>
                            <Form.Select
                                aria-label="Filter by"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-select-custom"
                            >
                                <option value="">Filter by</option>
                                <option value="title">Recipe</option>
                                <option value="country">Country</option>
                            </Form.Select>
                        </Col>

                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Search for..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="form-control-custom"
                            />
                        </Col>

                        <Col md={3} className="text-end">
                            <img
                                src="https://www.svgrepo.com/show/356535/search-button.svg"
                                alt="Search"
                                className="search-icon"
                                onClick={handleSubmitSearch}
                            />
                        </Col>
                    </Row>
                </Form>

                <div className="grid-container">
                    {filteredRecipes.length > 0 
                        ? filteredRecipes.map((recipe) => (
                            <Card key={recipe.id} className="recipe-card">
                                <div className="recipe-img">
                                    <Link to={`/recipes/${recipe.id}`}>
                                        <img src={recipe.image} alt={recipe.title} />
                                    </Link>
                                    {recipe.restrictions.length > 0 && (
                                        <div className="dietary-info-box">
                                            {formatRestrictions(recipe.restrictions)}
                                        </div>
                                    )}
                                </div>
                                <div className="card-text">
                                    <Link to={`/recipes/${recipe.id}`} className="recipe-title-link">
                                        <h3 className="recipe-title">{recipe.title}</h3>
                                    </Link>
                                    <p>from {recipe.country}</p>
                                </div>
                            </Card>
                        )) 
                        : <p>No recipes found</p>}
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default RecipesPage;
