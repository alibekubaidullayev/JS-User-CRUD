const data = require("../../data");
const validators = require("../validators");
const url = require("url");

module.exports = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const [user, error_msg] = validators.isValidUserCreate(parsedUrl.query);
  if (!user) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: error_msg }));
    return;
  }

  try {
    const newUser = await data.addUser(user);
    res.writeHead(201);
    res.end(JSON.stringify(newUser));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
  return res;
};
