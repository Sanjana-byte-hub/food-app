const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    contactName:{
      type:String,
    
    },
    phone:{
      type:String,
     
    },
    address:{
       type:String,
      
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
       require: true,
    },
  
})

const foodPartnerModel = mongoose.model("foodPartner",foodPartnerSchema );
module.exports = foodPartnerModel ;
