const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
	},
	category: {
		type: String,
		trim: true,
		required: true,
		enum: ["men", "women", "kid", "equipment", "shaker"],
	},
	price: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	colors: [String],
	img: {
		type: String,
		required: true,
		trim: true,
	},
	count: {
		type: Number,
		required: true,
		max: 50,
	},
	size: {
		type: String,
		required: true,
		trim: true,
	},
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
