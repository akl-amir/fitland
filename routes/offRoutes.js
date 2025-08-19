const express = require("express");
const OffModel = require("../models/Offs");
const offRouter = express.Router();

offRouter.get("/", async (req, res) => {
	const { code } = req.query;
	if (!code) {
		return res.status(400).json({ message: "code is required" });
	}
	try {
		const discount = await OffModel.findOne({ code: code.trim() });
		if (!discount) {
			return res.status(404).json({ message: "code not found" });
		}
		res.json(discount);
	} catch (err) {
		res.status(500).json({ message: "کد تخفیف یافت نشد" });
	}
});

module.exports = offRouter;
