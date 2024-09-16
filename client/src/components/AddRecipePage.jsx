import "./AddRecipePage.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AddRecipePage = () => {
  const EmptyForm = {
    title: "",
    image: "",
    servings: "",
    instructions: "",
    culture_desc: "",
    country: "",
    region: "",
  };

  const [recipe, setRecipe] = useState(EmptyForm);
  const [ingredientList, setIngredientList] = useState([
    { ingredient: "", unit: "", quantity: "" },
  ]);
  const [restrictionList, setRestrictionList] = useState([{ restriction: "" }]);

  let navigate = useNavigate();

  const routeChange = (id) => {
    let path = `/recipes/${id}`;
    navigate(path);
  };

  const handleAddIngredient = () => {
    setIngredientList([
      ...ingredientList,
      { ingredient: "", unit: "", quantity: "" },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const list = [...ingredientList];
    list.splice(index, 1);
    setIngredientList(list);
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ingredientList];
    list[index][name] = value;
    setIngredientList(list);
  };

  const handleRestrictionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...restrictionList];
    list[index][name] = value;
    setRestrictionList(list);
  };

  const handleAddRestriction = () => {
    setRestrictionList([...restrictionList, { restriction: "" }]);
  };

  const handleRemoveRestriction = (index) => {
    const list = [...restrictionList];
    list.splice(index, 1);
    setRestrictionList(list);
  };

  const handleAddRecipe = async () => {
    try {
      let response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...recipe,
          servings: parseInt(recipe.servings) || null,
          ingredients: ingredientList.map((item) => ({
            ...item,
            quantity: parseFloat(item.quantity) || null,
          })),
          restrictions: restrictionList,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const addedRecipe = result.data;

        alert("Recipe submitted!!");
        if (addedRecipe && addedRecipe.id) {
          routeChange(addedRecipe.id);
        }
      } else {
        alert("Failed to submit recipe");
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setRecipe((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRecipe();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Add New Recipe</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mt-5 mb-3">
            <Col>
              <FloatingLabel label="Recipe name">
                <Form.Control
                  onChange={handleInputChange}
                  name="title"
                  value={recipe.title}
                  placeholder="Recipe name"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col xs={7} className="mb-3">
              <FloatingLabel label="Image URL" className="mb-3">
                <Form.Control
                  onChange={handleInputChange}
                  name="image"
                  value={recipe.image}
                  placeholder="Image URL"
                />
              </FloatingLabel>
            </Col>
            <Col className="mb-3">
              <FloatingLabel label="Servings (optional)" className="mb-3">
                <Form.Control
                  onChange={handleInputChange}
                  name="servings"
                  value={recipe.servings}
                  placeholder="Servings (optional)"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Form.Label><b>Ingredients</b></Form.Label>
          {ingredientList.map((ingredient, index) => (
            <Form.Group key={index} className="mb-2">
              <Row className="px-2">
                <Col xs={7} className="px-1 mx-0">
                  <FloatingLabel label="Ingredient">
                    <Form.Control
                      name="ingredient"
                      value={ingredient.ingredient}
                      onChange={(e) => handleIngredientChange(e, index)}
                      placeholder="Ingredient"
                    />
                  </FloatingLabel>
                </Col>
                <Col className="px-0 mx-0">
                  <FloatingLabel label="Quantity">
                    <Form.Control
                      onChange={(e) => handleIngredientChange(e, index)}
                      name="quantity"
                      value={ingredient.quantity}
                      placeholder="Quantity"
                    />
                  </FloatingLabel>
                </Col>
                <Col className="px-1">
                  <FloatingLabel label="Unit">
                    <Form.Control
                      onChange={(e) => handleIngredientChange(e, index)}
                      name="unit"
                      value={ingredient.unit}
                      placeholder="Unit"
                    />
                  </FloatingLabel>
                </Col>

                {ingredientList.length > 1 && (
                  <Col className="mx-0 px-0 py-2" sm={1}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      type="button"
                      className="py-2 btn-remove-ingredient"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      Delete
                    </Button>
                  </Col>
                )}
              </Row>
              {ingredientList.length - 1 === index && ingredientList.length < 25 && (
                <Row className="mt-2">
                  <Col style={{ display: "flex", justifyContent: "left" }}>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      type="button"
                      className="btn-add-ingredient"
                      onClick={handleAddIngredient}
                    >
                      Add more...
                    </Button>
                  </Col>
                </Row>
              )}
            </Form.Group>
          ))}

          <Row className="mb-5 mx-0">
            <Form.Label><b>Instructions</b></Form.Label>
            <Form.Control
              onChange={handleInputChange}
              name="instructions"
              value={recipe.instructions}
              as="textarea"
              rows={6}
              placeholder="Write your instructions! For example:
  1. Preheat your oven to 175°C (350°F).
  2. In a large bowl, toss the apple slices with granulated sugar, lemon juice, cinnamon, and nutmeg. 
  3. Spread the apple mixture evenly in the bottom of a baking dish.
  4. In a separate bowl, combine the oats, flour, brown sugar, salt, and cinnamon. Add the... 
etc.
"/>
          </Row>

          <Form.Label><b>Dietary Restrictions</b></Form.Label>
          {restrictionList.map((restriction, index) => (
            <Form.Group key={index}>
              <Row className="mt-1 mb-3">
                <Col className="pr-0">
                  <FloatingLabel label="Restriction">
                    <Form.Control
                      onChange={(e) => handleRestrictionChange(e, index)}
                      name="restriction"
                      value={restriction.restriction}
                      placeholder="Restriction"
                    />
                  </FloatingLabel>
                </Col>
                {restrictionList.length > 1 && (
                  <Col className="mx-0 px-0 py-2" sm={1}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      type="button"
                      className="py-2 btn-remove-restriction"
                      onClick={() => handleRemoveRestriction(index)}
                    >
                      Delete
                    </Button>
                  </Col>
                )}
              </Row>
              {restrictionList.length - 1 === index && restrictionList.length < 10 && (
                <Row>
                  <Col style={{ display: "flex", justifyContent: "left" }}>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      type="button"
                      className="btn-add-restriction"
                      onClick={handleAddRestriction}
                    >
                      Add more...
                    </Button>
                  </Col>
                </Row>
              )}
            </Form.Group>
          ))}

          <Row className="mt-5 mb-3">
            <Col>
              <FloatingLabel label="Cultural Description">
                <Form.Control
                  onChange={handleInputChange}
                  name="culture_desc"
                  value={recipe.culture_desc}
                  placeholder="Cultural Description"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <FloatingLabel label="Country" className="mb-3">
                <Form.Control
                  onChange={handleInputChange}
                  name="country"
                  value={recipe.country}
                  placeholder="Country"
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel label="Region" className="mb-3">
                <Form.Control
                  onChange={handleInputChange}
                  name="region"
                  value={recipe.region}
                  placeholder="Region"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Button
            variant="dark"
            type="submit"
            className="py-2 btn-submit"
          >
            Submit
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default AddRecipePage;
