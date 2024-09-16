import "./App.css";
import CountriesPage from "./components/CountriesPage";
import CountryPage from "./components/CountryPage";
import Homepage from "./components/Homepage";
import RecipePage from "./components/RecipePage";
import RecipesPage from "./components/RecipesPage";
import LoginPage from "./components/LoginPage";
import AddRecipePage from "./components/AddRecipePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/recipes" element={<RecipesPage />}></Route>
        <Route path="/recipes/:id" element={<RecipePage />}></Route>
        <Route path="/add-recipe" element={<AddRecipePage />}></Route>
        <Route path="/countries" element={<CountriesPage />}></Route>
        <Route path="/countries/:id" element={<CountryPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
