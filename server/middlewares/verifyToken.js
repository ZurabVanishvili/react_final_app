const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { headers } = req;

  if (!headers.authorization) {
    return res.status(400).send({ msg: "No Authorization header passed" });
  }

  const [type, token] = headers.authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).send({ msg: "Incorrect token or no token passed" });
  }
  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return res.status(401).send({ msg: "Invalid authorization info" });
  }
  return next();
};

module.exports = verifyToken;