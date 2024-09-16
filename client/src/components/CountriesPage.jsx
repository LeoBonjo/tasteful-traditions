import './CountriesPage.css';
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";  
import Navbar from './Navbar';
import Footer from './Footer';

// Define the CountriesPage component as a functional component using an arrow function
const CountriesPage = () => {
  // State to store the list of countries (starts as an empty list)
  const [countries, setCountries] = useState([]);
  // State to store the search term entered by the user (starts as an empty string)
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect runs the fetchCountries function when the component loads
  useEffect(() => {
    // Async function to fetch country data from the backend
    const fetchCountries = async () => {
      try {
        // Request the list of countries from the backend
        const response = await fetch("/api/countries"); 
        // Convert the response to JSON format
        const data = await response.json(); 

        // Save the list of countries in state
        setCountries(data); 
        // Log errs and err msg
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };
    // Call the function to start fetching data
    fetchCountries();
    // Empty array = runs only once
  }, []); 

// Function to handle changes in the search input field
// Updates the searchTerm state with the new text entered by the user
// This searchTerm is then used to filter the list of countries
  const handleSearchChange = (e) => {
    // Update searchTerm with the new input value
    setSearchTerm(e.target.value);
  };

  // Filter the countries list based on the searchTerm
  // Only countries whose names include the searchTerm are shown
  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="countries-page">
      <Navbar />
    <Container>
    <h1 className="countries-page-title">Countries</h1>

      {/* Form.Group = Bootstrap component that groups form elements together */}
      <Form.Group className="mt-4 mb-4">
        {/* Form.Control = Bootstrap component that styles form controls like input fields */}
        <Form.Control type="text" placeholder="Search for a country..." value={searchTerm} onChange={handleSearchChange}/>
      </Form.Group>

      <div className="card-grid">
        {filteredCountries.map((country) => (
          <Card key={country.id}>
            <Link to={`/countries/${country.id}`}>
              <Card.Img variant="top" src={country.image} alt={country.country}/>
              <Card.Body>
                <Card.Title className="text-center">{country.country}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </div>
    </Container>
    <Footer />
    </div>
  );
};

export default CountriesPage;
