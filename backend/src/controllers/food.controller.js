const foodModel = require('../models/food.model');
const storageService = require('../services/storage.services');
const likeModel = require('../models/likes.model')
const saveModel = require('../models/save.model')
const { v4: uuid } = require("uuid")


async function createFood(req, res) {
   const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

}

async function getFoodItems(req, res) {
  // Get all food items
  const foods = await foodModel
    .find({ foodPartner: { $ne: null } })
    .populate("foodPartner");
  // If a user is logged in, track liked/saved status
  const userId = req.user?._id;

  const foodWithStatus = await Promise.all(
    foods.map(async (food) => {
      let liked = false;
      let saved = false;

      if (userId) {
        liked = await likeModel.exists({ user: userId, food: food._id });
        saved = await saveModel.exists({ user: userId, food: food._id });
      }

      const saveCount = await saveModel.countDocuments({ food: food._id });

      return {
        ...food.toObject(),
        likeCount: food.likeCount || 0,
        liked: Boolean(liked),
        saved: Boolean(saved),
        saveCount,
      };
    })
  );

  res.status(200).json({ foodItems: foodWithStatus });
}



async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId });

  let liked;
  if (isAlreadyLiked) {
    await likeModel.deleteOne({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
    liked = false;
  } else {
    await likeModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
    liked = true;
  }

  const updatedFood = await foodModel.findById(foodId);

  res.status(200).json({
    likeCount: updatedFood.likeCount,
    liked,
  });
}


async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId });

  let saved;
  if (isAlreadySaved) {
    await saveModel.deleteOne({ user: user._id, food: foodId });
    saved = false;
  } else {
    await saveModel.create({ user: user._id, food: foodId });
    saved = true;
  }

  const food = await foodModel.findById(foodId);
  const saveCount = await saveModel.countDocuments({ food: foodId });

  res.status(200).json({
    saveCount,
    saved,
  });
}

async function getSavedFood(req,res){
  const user = req.user;
   
  const savedFoods = await saveModel
  .find({ user: user._id })
  .populate({
    path: "food",
    populate: { path: "foodPartner" }
  });

  res.status(200).json({
    savedFoods: savedFoods || [],
  });
}



module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFood
}