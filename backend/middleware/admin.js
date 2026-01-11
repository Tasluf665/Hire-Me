
module.exports = function (req, res, next) {
  // Check if the authenticated user is an admin. If not, deny access with a 403 Forbidden response.
  if (!req.user.isAdmin)
    return res.status(403).send({ error: "Access Denied" });

  // If the user is an admin, allow them to proceed to the next middleware or route handler.
  next();
};
