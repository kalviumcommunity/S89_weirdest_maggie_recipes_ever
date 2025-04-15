import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './components/RecipeCard';
import './App.css';
import './About'

function App() {
  const recipes = [
    {
      title: "Maggi Pizza",
      description: "A creative fusion of Maggi noodles and pizza toppings."
    },
    {
      title: "Butter Garlic Maggi",
      description: "Maggi noodles tossed in butter and garlic for a rich, aromatic flavor."
    },
    {
      title: "Maggi Sandwich",
      description: "A crispy sandwich stuffed with spicy Maggi noodles."
    },
    {
      title: "Chocolate Maggi",
      description: "A bizarre yet delicious combination of Maggi noodles and chocolate syrup."
    },
    {
      title: "Cheese Burst Maggi",
      description: "Maggi noodles loaded with gooey melted cheese for a rich flavor."
    },
    {
      title: "Spicy Masala Maggi",
      description: "A fiery twist to Maggi with extra spices and chili."
    },
    {
      title: "Maggi Pizza",
      description: "A creative fusion of Maggi noodles and pizza toppings."
    },
    {
      title: "Butter Garlic Maggi",
      description: "Maggi noodles tossed in butter and garlic for a rich, aromatic flavor."
    },
    {
      title: "Maggi Sandwich",
      description: "A crispy sandwich stuffed with spicy Maggi noodles."
    }
  ];

  return (
    <div className="app-container">
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} title={recipe.title} description={recipe.description} />
        ))}
      </div>
    </div>
  );
}

export default App;