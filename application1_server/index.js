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
  console.log("Application 1 server started on port 3001");
});
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Application 1 server up and running" });
});
// other routes of application 1 as per requirement 👇
