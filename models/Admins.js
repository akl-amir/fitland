const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
