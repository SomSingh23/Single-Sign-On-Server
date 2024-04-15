let express = require("express");
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.get("/", (req, res) => {
  res.status(200).send("sso main route");
});

app.post("/sso/auth/generate/token", (req, res) => {
  // actual request will come
  console.log(req.body);
  // check in database for user with email id = req.body.email
  // if user don't exist generate token and save new user in database
  // else check for previous associated token and url of sever from which token is requested

  // request to delete token from previously associated server
  // if successfully token is deleted then generate new token and save in database
    // else send error message
});
