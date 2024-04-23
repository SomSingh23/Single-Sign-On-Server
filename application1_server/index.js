let express = require("express");
let app = express();
let cors = require("cors");
app.use(cors());
app.listen(3000, () => {
  console.log("Application1 server started on port 3000");
});
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Application1 server up and running" });
});
