const userModel = require("../model/user.model");
const foodPartnerModel = require("../model/foodpartner.model");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { fullname, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = new userModel({ fullname, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: " Invalid user name or password",
    });
  }
  const isPaasswordvalid = await bycrypt.compare(password, user.password);
  if (!isPaasswordvalid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(200).json({
    message: "user logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

async function logOutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "user logged out successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password, phone, address, contactName } = req.body;
  
  const isAccountExist = await foodPartnerModel.findOne({ email });

  if (isAccountExist) {
    return res.status(400).json({ message: "Food partner already exists" });
  }
  const hashedPassword = await bycrypt.hash(password, 10);
  const foodpartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName,
  });
  const token = jwt.sign({ id: foodpartner._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  await foodpartner.save();
  res.status(201).json({
    message: "Food partner registered successfully",
    foodpartner: {
      _id: foodpartner._id,
      name: foodpartner.name,
      email: foodpartner.email,
      phone: foodpartner.phone,
      address: foodpartner.address,
      contactName: foodpartner.contactName,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const foodpartner = await foodPartnerModel.findOne({ email });
  if (!foodpartner) {
    return res.status(400).json({ message: "Invalid email or phone number" });
  }
  const isPaasswordvalid = await bycrypt.compare(
    password,
    foodpartner.password
  );
  if (!isPaasswordvalid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ id: foodpartner._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(200).json({
    message: "Food partner logged in successfully",
    foodpartner: {
      _id: foodpartner._id,
      name: foodpartner.name,
      email: foodpartner.email,
      phone: foodpartner.phone,
    },
  });
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
