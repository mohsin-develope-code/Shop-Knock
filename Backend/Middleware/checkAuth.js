const { getUserToken } = require("../Utils/jwt");

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthenticated User", status: false });
  }

  const checkToken = getUserToken(token);
  // console.log("Hey bro =====> ",checkToken);

  if (!checkToken) {
    return res
      .status(401)
      .json({ message: "Unauthenticated User", status: false });
  }

  req.user = checkToken;

  next();
};

const checkAuthorization = (req, res, next) => {
  checkAuth(req, res, () => {
    console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed for that...");
    }
  });
};

module.exports = {
  checkAuth,
  checkAuthorization,
};
