let express = require("express");
let app = express();
let cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3003, () => {
  console.log("Application 3 server started on port 3003");
});
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Application 3 server up and running" });
});
// other routes of application 3 as per requirement 👇
