const url = require("url");
const createUser = require("./createUser");
const getUser = require("./getUser");
const listUsers = require("./listUsers");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");

const UserRoutes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  res.setHeader("Content-Type", "application/json");

  if (path === "/users") {
    if (method === "GET") {
      return listUsers(req, res);
    }
    if (method === "POST") {
      return createUser(req, res);
    }
  }

  if (path.startsWith("/users/")) {
    if (method === "GET") {
      return getUser(req, res);
    }
    if (method === "PATCH") {
      return updateUser(req, res);
    }
    if (method === "DELETE") {
      return deleteUser(req, res);
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
};

module.exports = UserRoutes;
