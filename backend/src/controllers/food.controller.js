const foodModel = require("../model/food.modal");

async function createFood(req, res) {
  console.log("test");
  console.log(req.foodPartner);
  console.log(req.body);

  console.log(req.file);

  res.status(201).json({ message: "Food created successfully" });
}

async function getFoodItems(req, res) {}

async function likeFood(req, res) {}

async function saveFood(req, res) {}

async function getSavedFoodItems(req, res) {}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFoodItems,
};
