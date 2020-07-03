const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const sreg = require("./routes/auth");
const treg = require("./routes/auth");

const app = express();

mongoose
  .connect(
    "mongodb+srv://dheeraj:dheeraj333@mycluster-4ouko.mongodb.net/eduprime?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongoose.....");
  })
  .catch((err) => {
    console.log("could not connect to db..", err);
  });
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post("/sreg", sreg);
app.post("/treg", treg);
app.post("/login", treg);

const port = 3001 || process.env.PORT;
console.log(port);

// require("./startup/prod")(app);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
