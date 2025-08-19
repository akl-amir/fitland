const mongoose = require("mongoose");
const offSchema = mongoose.Schema({
	code: {
		type: String,
		trim: true,
	},
	percentag: {
		type: Number,
	},
});

const Offs = mongoose.model("Offs", offSchema);

module.exports = Offs;
