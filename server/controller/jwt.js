const jwt = require("jsonwebtoken");

module.exports = {

  generateToken: function (data, expiry) {
    let token = jwt.sign(data, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: expiry,
    });
    return token;
  },

  jwtVerify: function (req, res, next) {
    if (typeof req.session.token !== "undefined") {
      let token = req.session.token;
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        { algorithm: "HS256" },
        (err, user) => {
          if (err) {
            res
              .status(403)
              .send({ message: "Not Authorized", status: "NOT OK" });
          }
          res.locals.user = user;
          return next();
        }
      );
    } else {
      res.status(404).send({ message: "Token Not Provided", status: "NOT OK" });
    }
  },

  getSession: function (req, res) {
    if (typeof req.session.token !== "undefined") {
      let token = req.session.token;
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        { algorithm: "HS256" },
        (err, user) => {
          if (err) {
            res
              .status(403)
              .send({ user: null, message: "Not Authorized", status: "NOT OK" });
          } else {
            res
              .status(200)
              .send({ message: "User Fetched", user: user, status: "OK" });
          }
        }
      );
    } else {
      res.status(200).send({ user: null, message: "No Session Found", status: "NOT OK" });
    }
  },

  removeSession: function (req, res) {
    if (typeof req.session.token !== "undefined") {
      req.session = null;
      res.status(200).send({ message: "Session Destroyed", status: "OK" });
    } else {
      res.status(200).send({ message: "No Session", status: "OK" });
    }
  },
};
