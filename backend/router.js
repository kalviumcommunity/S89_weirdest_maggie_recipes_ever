const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

router.post('/recipes', async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).send({ msg: "Title and description are required" });
      }
      const newRecipe = new Recipe({ title, description });
      const savedRecipe = await newRecipe.save();
      res.status(201).send({ msg: "Recipe created successfully", data: savedRecipe });
    } catch (error) {
      res.status(500).send({ msg: "Failed to create recipe", error: error.message });
    }
  });
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        return res.status(200).send({ msg: "Recipes fetched successfully", data: recipes });
    } catch (error) {
        return res.status(500).send({ msg: "Something went wrong", error: error.message });
    }
});

router.put('/recipes/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecipe) {
            return res.status(404).send({ msg: "Recipe not found" });
        }
        return res.status(200).send({ msg: "Recipe updated successfully", data: updatedRecipe });
    } catch (error) {
        return res.status(500).send({ msg: "Something went wrong", error: error.message });
    }
});

router.delete('/recipes/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).send({ msg: "Recipe not found" });
        }
        return res.status(200).send({ msg: "Recipe deleted successfully", data: deletedRecipe });
    } catch (error) {
        return res.status(500).send({ msg: "Something went wrong", error: error.message });
    }
});

module.exports = router;