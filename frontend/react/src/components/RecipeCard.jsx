import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ title, description }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default RecipeCard;