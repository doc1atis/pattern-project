const mongoose = require("mongoose");

const objectsCharacteristicsTemplate = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 20,
    lowercase: true
  },

  location: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 20,
    lowercase: true
  },

  size: {
    type: String,
    required: true,
    enum: ["sm", "md", "lg", "xs", "xl"],
    lowercase: true
  },

  nsn: {
    type: Number,
    max: 999999999999999,
    min: 1000000000000,
    required: true
  }
});

const Product = mongoose.model(
  "ProductsBasket",
  objectsCharacteristicsTemplate
);

exports.Product = Product;
exports.mongoose = mongoose;
