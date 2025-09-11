const foodModel = require("../model/food.modal");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  console.log("test");
  console.log(req.foodPartner);
  console.log(req.body);

  console.log(req.file);

  const fileUpload = await storageService.uploadFile(req.file.buffer, uuid());
  console.log(fileUpload);

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
