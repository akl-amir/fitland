const express = require("express");
const UserModel = require("../models/User");
const ProductModel = require("../models/Products");

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", async (req, res) => {
	try {
		const users = await UserModel.countDocuments();
		const products = await ProductModel.countDocuments();
		const womenCounts = await ProductModel.countDocuments({
			category: "women",
		});
		const menCounts = await ProductModel.countDocuments({ category: "men" });
		const kidCounts = await ProductModel.countDocuments({ category: "kid" });

		res.json({
			users,
			products,
			womenCounts,
			menCounts,
			kidCounts
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = dashboardRouter;
