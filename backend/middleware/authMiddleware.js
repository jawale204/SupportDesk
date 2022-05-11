const { verifyToken } = require("../service/jwtService");
const UserSchema = require("../models/User");
exports.authMiddleware = async (req, res, next) => {
  if (
    req.header("authorization") &&
    req.header("authorization").startsWith("Bearer")
  ) {
    const token = req.header("authorization").split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        err: null,
        data: {},
        message: "unauthorized",
      });
    }
    const check = verifyToken(token);
    if (!check.id) {
      return res.status(401).json({
        success: false,
        err: null,
        data: {},
        message: "unauthorized",
      });
    }
    const user = await UserSchema.findById(check.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        err: null,
        data: {},
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json({
      success: false,
      err: null,
      data: {},
      message: "unauthorized",
    });
  }
};
