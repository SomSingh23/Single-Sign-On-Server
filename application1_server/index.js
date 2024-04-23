let express = require("express");
let app = express();
let cors = require("cors");
let waitSeconds = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("resolved in 1 second");
    }, 1000);
  });
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3001, () => {
  console.log("Application1 server started on port 3001");
});
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Application1 server up and running" });
});
app.post("/api/app1/verify", async (req, res) => {
  console.log(req.body);
  await waitSeconds();
  console.log("resolved in 1 second");
  // ask sso for this token
  res.status(200).json({ value: true });
});
app.post("/api/app1/signup", async (req, res) => {
  console.log(req.body);
  await waitSeconds();
  console.log("resolved in 1 second");
  // ask sso for this token
  res.status(200).json({ value: true });
});
app.post("/api/app1/login", async (req, res) => {
  console.log(req.body);
  await waitSeconds();
  console.log("resolved in 1 second");
  // ask sso for this token
  res.status(200).json({ value: true });
});
