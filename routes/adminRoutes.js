const express = require("express");
const AdminModel = require("../models/Admins");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
// POST

adminRouter.post("/register", async (req, res) => {
	try {
		const { firstname, lastname, username, password } = req.body;
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = new AdminModel({
			firstname,
			lastname,
			username,
			password: hashPassword,
		});
		await newUser.save().then(() => {
			res.send("کاربر با موفقیت ثبت شد");
		});
	} catch (err) {
		res.status(500).json({ error: "خطا در ثبت کاربر", err });
	}
});

adminRouter.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await AdminModel.findOne({ username });
		if (!user) return res.status(401).json({ error: "ادمین یافت نشد" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ error: "رمزعبور اشتباه است" });

		const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
		res.status(200).json({ message: "ورود موفق", token });
	} catch (err) {
		res.status(500).json({ error: "خطا در ورود ادمین" });
	}
});

// GET
adminRouter.get("/", async (req, res) => {
	try {
		const token = req.headers.authorization;
		if (!token) return res.status(401).json({ error: "توکن موجود نیست" });

		const decoded = jwt.verify(token, SECRET_KEY);

		const user = await AdminModel.findById(decoded.id).select("-password");
		if (!user) return res.status(401).json({ error: "ادمین یافت نشد" });
		res.status(200).json({ user });
	} catch (err) {
		res.status(500).json({ error: "خطا در دریافت ادمین", err });
	}
});

adminRouter.get("/all", async (req, res) => {
	try {
		const allUsers = await AdminModel.find();
		res.status(200).json(allUsers);
	} catch (err) {
		res.status(500).json({ error: "خطا در دریافت ادمین" });
	}
});
// DEL
adminRouter.delete("/remove/:id", async (req, res) => {
	let id = req.params.id;
	try {
		const deleteUser = await AdminModel.findByIdAndDelete(id);
		if (!deleteUser) {
			return res.status(401).json({ message: "ادمین مورد نظر یافت نشد" });
		}
		res.status(200).json({ message: "ادمین با موفقیت حذف شد" });
	} catch (err) {
		res.status(500).json({ error: "خطا در حذف ادمین" });
	}
});

// PUT

module.exports = adminRouter;
