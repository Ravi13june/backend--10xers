const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

exports.authenticate = async (req, res, next) => {
  try {
  console.log('Authorization header:', req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('No token found');
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Decoded token:', decoded);

 
  const user = await User.findByPk(decoded.id);
  if (!user) {
    console.log('User not found in database');
    return res.status(401).json({ message: "User not found" });
  }

  console.log('Authenticated user:', user.id, user.role);
  req.user = user;
  next();
  } catch {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};
