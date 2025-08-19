const express = require("express");
const ProductModel = require("../models/Products");
const mongoose = require("mongoose");
const productRouter = express.Router();

productRouter.get("/category/:cat", async (req, res) => {
	let category = req.params.cat;
	try {
		if (category === "all") {
			const products = await ProductModel.find();
			res.status(200).json(products);
		} else {
			const products = await ProductModel.find({ category });
			res.status(200).json(products);
		}
	} catch (err) {
		res.status(500).json({ error: "خطا در دریافت محصولات" });
	}
});

productRouter.get("/:category/:id", async (req, res) => {
	let { id, category } = req.params;
	console.log(id, category);

	try {
		let product = await ProductModel.findOne({
			category,
			_id: new mongoose.Types.ObjectId(id),
		});
		if (!product) {
			return res.status(401).json({ message: "محصول مورد نظر یافت نشد" });
		}
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ error: "خطا در دریافت محصول" });
	}
});

productRouter.post("/", async (req, res) => {
	let { title, category, price, rating, colors, img, count, size } = req.body;
	try {
		const newProduct = new ProductModel({
			title,
			category,
			price,
			rating,
			colors,
			img,
			count,
			size,
		});
		await newProduct.save().then(() => {
			res.send("محصول با موفقیت اضاف شد");
		});
	} catch (err) {
		res.status(500).json({ error: "خطا در ارسال محصول" });
	}
});

productRouter.delete("/remove/:category/:id", async (req, res) => {
	let { category, id } = req.params;
	try {
		let deleteProduct = await ProductModel.findOneAndDelete({
			_id: id,
			category: category,
		});
		if (!deleteProduct) {
			return res.status(401).json({ message: "محصولی با این مشخصات یلفت نشد" });
		}
		res.status(200).json({ message: "محصول با موفقیت حذف شد", deleteProduct });
	} catch (err) {
		res.status(500).json({ error: "خطا در حذف محصول" });
	}
});

productRouter.put("/edite/:Category/:Id", async (req, res) => {
	let { Category, Id } = req.params;
	console.log(Category, Id);

	let { title, category, price, rating, colors, img, count, size } = req.body;
	try {
		const updateProduct = await ProductModel.findOneAndUpdate(
			{
				_id: Id,
				category: Category,
			},
			{
				title,
				category,
				price,
				rating,
				colors,
				img,
				count,
				size,
			},
			{
				new: true,
			}
		);
		if (!updateProduct) {
			return res
				.status(401)
				.json({ message: "محصولی با این مشخصات یافت نشد!" });
		}
		res
			.status(200)
			.json({ message: "محصول با موفقیت آپدیت شد", updateProduct });
	} catch (err) {
		res.status(500).json({ error: "خطا در آپدیت محصول" });
	}
});

module.exports = productRouter;
