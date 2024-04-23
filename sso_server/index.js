let express = require("express");
let app = express();
let cors = require("cors");
let mongoose = require("mongoose");
let User = require("./user");
const generateRandomString = require("./randomSecret");
let jwt = require("jsonwebtoken");
mongoose
  .connect("mongodb://127.0.0.1:27017/sso_server_user_data_db")
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
    res.status(200).json({ token: token });
  } else {
    console.log("User not found");
    res.status(404).json({ message: "User not found" });
  }
});
app.post("/sso/api/signup", async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email });
    if (data) {
      throw new Error("User already exists");
    }
    let user = new User({
      email: req.body.email,
      password: req.body.password,
      jwt_secret: generateRandomString(20),
    });
    await user.save();
    console.log("User created");
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.post("/sso/api/verify", async (req, res) => {
  console.log(req.body);

  res.status(200).json({ value: false });
});
