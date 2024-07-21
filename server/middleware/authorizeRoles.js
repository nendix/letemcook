const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roles[0])) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};

module.exports = authorizeRoles;
