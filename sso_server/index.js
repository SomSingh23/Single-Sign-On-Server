require("dotenv").config();
let express = require("express");
let app = express();
let cors = require("cors");
let mongoose = require("mongoose");
let User = require("./user");
const generateRandomString = require("./randomSecret");
let jwt = require("jsonwebtoken");
mongoose
  .connect(process.env.db)
  .then((p) => console.log("local mongodb connected"))
  .catch((e) => console.log("error in connecting to local mongodb"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3031, () => {
  console.log("Application1 server started on port 3031");
});
app.get("/", (req, res) => {
  return res.status(200).json({ message: "SSO Server Up and Running" });
});
app.post("/sso/api/login", async (req, res) => {
  console.log(req.body);
  let userdata = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(userdata);
  if (userdata) {
    console.log("User found");
    let newSecret = generateRandomString(20);
    let token = jwt.sign({ email: userdata.email }, newSecret);
    await User.findOneAndUpdate(
      { email: userdata.email },
      { jwt_secret: newSecret }
    );
    res.status(200).json({ success: true, token: token });
  } else {
    console.log("User not found");
    res.status(404).json({ success: false, message: "User not found" });
  }
});
app.post("/sso/api/signup", async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email });
    if (data) {
      throw new Error("User already exists");
    }
    let newSecret = generateRandomString(20);
    let user = new User({
      email: req.body.email,
      password: req.body.password,
      jwt_secret: newSecret,
    });
    await user.save();
    console.log("User created");
    let token = jwt.sign({ email: user.email }, newSecret);
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.post("/sso/api/verify", async (req, res) => {
  try {
    let token = req.body.token;
    if (token === undefined || token === null)
      throw new Error("Token not found");
    let data = jwt.decode(token);
    let user = await User.findOne({
      email: data.email,
    });
    if (!user) {
      throw new Error("User not found");
    }
    let ans = jwt.verify(token, user.jwt_secret);
    console.log(ans);
    if (ans) {
      res.status(200).json({ value: true });
    } else {
      throw new Error("Token not verified");
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ value: false });
  }
});
