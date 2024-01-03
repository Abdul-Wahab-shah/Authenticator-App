import Express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

const app = Express();

mongoose
  .connect(
    "mongodb+srv://zabihashmi:Pakistan@cluster0.i3irjlu.mongodb.net/backendconnects",
    {}
  )
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Error connecting to database:", error));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const mernStack = mongoose.model("mernStack", userSchema);

// Middleware
const isAuthemticated = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    // User is authenticated, continue to the next middleware or route
    next();
  } else {
    // User is not authenticated, redirect to login
    res.redirect("/login");
  }
};

app.use(Express.static(path.join(path.resolve(), "public")));
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

// Routes
app.get("/", isAuthemticated, (req, res) => {
  res.render("logout");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { name, email } = req.body;
  const user = await mernStack.create({
    name,
    email,
  });
  const token=jwt.sign({
    _id: user._id}, "kvbifbvduifbvifvbif" )
    console.log(token)
  // res.cookie("token", user._id);
  // res.redirect("/");
});



app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
