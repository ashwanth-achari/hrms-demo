const admin = require("../config/firebase");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    // Find user in MongoDB
    const mongoUser = await User.findOne({ firebaseUid: decoded.uid });

    if (!mongoUser) {
      return res.status(401).json({ message: "User not found in database" });
    }

    req.user = mongoUser; // attach user to backend request
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { protect };
