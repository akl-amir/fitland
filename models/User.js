const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
		minLength: 3,
		maxLength: 100,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		maxLength: 100,
	},
	username: {
		type: String,
		minLength: 5,
		maxLength: 100,
		trim: true,
		// unique: true,
	},
	password: {
		type: String,
		minLength: 6,
		maxLength: 100,
		trim: true,
	},
	cart: [
		{
			productId: { type: mongoose.Types.ObjectId, ref: "Product" },
			quantity: { type: Number },
			category: { type: String },
		},
	],
});

let User = mongoose.model("User", userSchema);

module.exports = User;
