import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './components/RecipeCard';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/recipes', newRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, response.data.data]); 
      setNewRecipe({ title: '', description: '' }); 
    } catch (error) {
      console.error('Failed to create recipe:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Recipe List</h1>

      <form onSubmit={handleSubmit} className="recipe-form">
        <input
          type="text"
          placeholder="Recipe Title"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Recipe Description"
          value={newRecipe.description}
          onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">Add Recipe</button>
      </form>

      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.title}
            description={recipe.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;