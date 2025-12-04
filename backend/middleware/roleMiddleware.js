// Check if req.user.role is allowed

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // TODO: implement role check
    return next();
  };
};

module.exports = { authorize };
