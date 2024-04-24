let express = require("express");
let app = express();
let cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3002, () => {
  console.log("Application 2 server started on port 3002");
});
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Application 2 server up and running" });
});
// other routes of application 2 as per requirement 👇
