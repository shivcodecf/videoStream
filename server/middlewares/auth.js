import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

     if (!decoded) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};



