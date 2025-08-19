const express = require("express");
const UserModel = require("../models/User");
const cartRouter = express.Router();

//! POST /add

cartRouter.post("/add", async (req, res) => {
	const { userId, productId, quantity, category } = req.body;
	console.log(userId, productId, quantity, category);

	try {
		let user = await UserModel.findById(userId);

		if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

		// بررسی کن محصول قبلاً داخل سبد خرید هست یا نه
		let item = user.cart.find(
			(item) => item.productId.toString() === productId
		);

		if (item) {
			item.quantity += quantity;
		} else {
			user.cart.push({ productId, quantity, category });
		}

		await user.save();

		res.json({ message: "محصول به سبد خرید اضافه شد", cart: user.cart });
	} catch (err) {
		res.status(500).json({ error: "خطا در افزودن محصول" });
	}
});

//! GET /:userId

cartRouter.get("/:userId", async (req, res) => {
	try {
		let user = await UserModel.findById(req.params.userId).populate(
			"cart.productId"
		);
		if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

		res.json(user.cart);
	} catch (err) {
		res.status(500).json({ error: "خطا در دریافت سبد خرید" });
	}
});

//! DELETE /remove/:userId/:productId

cartRouter.delete("/remove/:userId/:productId", async (req, res) => {
	try {
		let { userId, productId } = req.params;
		let user = await UserModel.findById(userId);
		if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

		user.cart = user.cart.filter(
			(item) => item.productId.toString() !== productId
		);

		await user.save();
		res.json({ message: "محصول از سبد خرید حذف شد", cart: user.cart });
	} catch (err) {
		res.status(500).json({ error: "خطا در حذف محصول" });
	}
});


// PUT /decrease/:userId/:productId
cartRouter.put("/decrease/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    // پیدا کردن آیتم
    let item = user.cart.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "محصول در سبد خرید نیست" });
    }

    // اگر تعداد 1 بود → حذف کن
    if (item.quantity === 1) {
      user.cart = user.cart.filter(
        (i) => i.productId.toString() !== productId
      );
    } else {
      // در غیر این صورت تعداد کم کن
      item.quantity -= 1;
    }

    await user.save();
    res.json({ message: "سبد خرید آپدیت شد", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطا در بروزرسانی سبد خرید" });
  }
});


module.exports = cartRouter;
