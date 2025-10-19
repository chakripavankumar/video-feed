const foodModel = require("../model/food.modal");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  console.log("test");
  console.log(req.foodPartner);
  console.log(req.body);
  console.log(req.file);

  const fileUpload = await storageService.uploadFile(req.file.buffer, uuid());

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUpload.url,
    foodPartner: req.foodPartner._id,
  });

  res
    .status(201)
    .json({ message: "Food created successfully", food: foodItem });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  res
    .status(200)
    .json({ message: "Food items retrieved successfully", foodItems });
}

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
