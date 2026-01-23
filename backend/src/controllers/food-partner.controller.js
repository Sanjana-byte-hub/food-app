import mongoose from "mongoose";

export const getFoodPartnerById = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food partner id",
      });
    }

    const partner = await FoodPartner.findById(id).populate("foodItems");

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Food partner not found",
      });
    }

    res.json({ success: true, foodPartner: partner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
