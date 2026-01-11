// Import the JWT library for token operations. Source: Mosh -> NodeJS course -> 10. Authentication -> 9- Generating, 10- Storing Secrets, 11- Setting, 12- Encapsulating and 13- Authorization
const jwt = require("jsonwebtoken");
// Config for configuration management. Source: Mosh -> NodeJS course -> 5. Express -> 7 - Configuration
const config = require("config");


function auth(req, res, next) {
  // Extract the JWT from the 'x-auth-token' header.
  const token = req.header("x-auth-token");

  // If no token is provided, return a 401 Unauthorized response.
  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided" });

  try {
    // Verify the token using the configured JWT private key.
    const decoded = jwt.verify(token, config.get("JWT_PRIVATE_KEY"));

    // Attach the decoded user information to the request object for further processing.
    req.user = decoded;

    // Continue to the next middleware or route handler.
    next();
  } catch (ex) {
    // If the token is invalid, return a 400 Bad Request response.
    res.status(400).send({ error: "Invalid token" });
  }
}

module.exports = auth;
