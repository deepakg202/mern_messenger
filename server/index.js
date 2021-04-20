require("dotenv-flow").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
// const path = require('path');
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize DB
require("./utils/initDB")();
app.use(cors())

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET]
  })
);

// API Routes
app.use("/api", require("./controller/routes.js"));

// app.use(express.static(path.join(__dirname, "..", "build")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});