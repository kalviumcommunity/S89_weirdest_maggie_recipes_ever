import React, { useState } from 'react';
import axios from 'axios';
import './AddEntity.css';

const AddEntity = () => {
  const [entity, setEntity] = useState({ title: '', description: '' });
  const [entities, setEntities] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/recipes', entity);
      setEntities((prevEntities) => [...prevEntities, response.data.data]); // Add the new entity to the list
      setEntity({ title: '', description: '' }); // Reset the form
    } catch (error) {
      console.error('Failed to add entity:', error);
    }
  };

  return (
    <div className="add-entity-container">
      <h1>Add New Entity</h1>
      <form onSubmit={handleSubmit} className="entity-form">
        <input
          type="text"
          placeholder="Entity Title"
          value={entity.title}
          onChange={(e) => setEntity({ ...entity, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Entity Description"
          value={entity.description}
          onChange={(e) => setEntity({ ...entity, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">Add Entity</button>
      </form>

      <div className="entity-list">
        <h2>Entities</h2>
        {entities.map((item, index) => (
          <div key={index} className="entity-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEntity;