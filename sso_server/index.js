let express = require("express");
let app = express();
let mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/sso/server/user/data/db")
  .then((p) => console.log("local mongodb connected"))
  .catch((e) => console.log("error in connecting to local mongodb"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log("Application1 server started on port 3000");
});
app.get("/", (req, res) => {
  return res.status(200).json({ message: "SSO Server Up and Running" });
});
app.post("/sso/api/login", async (req, res) => {
  res.send("cool");
});
app.post("/sso/api/signup", async (req, res) => {
  res.send("cool");
});

app.post("/sso/api/verify", async (req, res) => {
  res.send("cool");
});
