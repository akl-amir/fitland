require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/producRoutes");
const offRouter = require("./routes/offRoutes");
const dashboardRouter = require("./routes/dashboard");
const adminRouter = require("./routes/adminRoutes");
const cartRouter = require("./routes/cartRoutes");
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
	.connect(
		process.env.MONGO_URI
	)
	.then(() => {
		console.log("connect to mongodb");
	});

// users

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/discounts", offRouter);

app.use("/api/dashboard", dashboardRouter);

app.use("/api/admin", adminRouter);

app.use("/api/cart", cartRouter);

app.listen(4000, () => {
	console.log("listen port 4000");
});
