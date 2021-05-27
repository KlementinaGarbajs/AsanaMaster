const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var router = express.Router();

// parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/api", router);

router.use((request, response, next) => {
  console.log('middleware');
  next();
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

