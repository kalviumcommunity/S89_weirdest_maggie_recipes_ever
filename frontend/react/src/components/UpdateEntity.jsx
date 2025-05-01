import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateEntity = () => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [updatedEntity, setUpdatedEntity] = useState({ title: '', description: '' });

  // Fetch entities from the server
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setEntities(response.data.data);
      } catch (error) {
        console.error('Failed to fetch entities:', error);
      }
    };

    fetchEntities();
  }, []);

  // Handle update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/recipes/${selectedEntity._id}`, updatedEntity);
      setEntities((prevEntities) =>
        prevEntities.map((entity) =>
          entity._id === selectedEntity._id ? response.data.data : entity
        )
      );
      setSelectedEntity(null); // Reset the selected entity
      setUpdatedEntity({ title: '', description: '' }); // Reset the form
    } catch (error) {
      console.error('Failed to update entity:', error);
    }
  };

  return (
    <div className="update-entity-container">
      <h1>Update Entity</h1>
      <div className="entity-list">
        <h2>Entities</h2>
        {entities.map((entity) => (
          <div key={entity._id} className="entity-card">
            <h3>{entity.title}</h3>
            <p>{entity.description}</p>
            <button onClick={() => setSelectedEntity(entity)}>Edit</button>
          </div>
        ))}
      </div>

      {selectedEntity && (
        <form onSubmit={handleUpdate} className="update-form">
          <h2>Update {selectedEntity.title}</h2>
          <input
            type="text"
            placeholder="Updated Title"
            value={updatedEntity.title}
            onChange={(e) => setUpdatedEntity({ ...updatedEntity, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Updated Description"
            value={updatedEntity.description}
            onChange={(e) => setUpdatedEntity({ ...updatedEntity, description: e.target.value })}
            required
          ></textarea>
          <button type="submit">Update Entity</button>
        </form>
      )}
    </div>
  );
};

export default UpdateEntity;