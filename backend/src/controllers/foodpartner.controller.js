const foodPartnerModel = require("../model/foodpartner.model");
const foodModel = require("../model/food.modal");

async function getFoodPartnerById(req, res) {
  const foodPartnerId = req.params.id;
  const foodPartner = await foodPartnerModel.findById(foodPartnerId);
  const foodItemsByFoodPartner = await foodModel.find({
    foodPartner: foodPartnerId,
  });
  if (!foodPartner) {
    return res.status(404).json({ message: "Food Partner not found" });
  }
  res.status(200).json({
    message: "Food Partner fetched successfully",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
    },
  });
}
module.exports = { getFoodPartnerById };
