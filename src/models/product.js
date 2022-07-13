const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product must have a title"],
      maxlength: [50, "Max length to the prodct title is 50 characters"],
      minlength: [3, "Min length to the prodct title is 50 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    brand: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "cross"],
        message: "{VALUE} is not supported.",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
