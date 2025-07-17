import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  // ✅ Debug log token and env
  console.log("Received Token:", token);
  console.log("JWT_SECRET from env:", process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided in Authorization header" });
  }
  if (token.startsWith('Bearer ')) {
  token = token.split(' ')[1];
}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validate token
    req.user = decoded; // Attach decoded payload to request
    next(); // Go to next middleware or route
  } catch (error) {
    console.error("❌ JWT Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export { auth };
