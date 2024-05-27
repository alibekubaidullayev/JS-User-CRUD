const url = require("url");
const data = require("../../data");
const utils = require("../utils");
const validators = require("../validators");

module.exports = async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const [id, error_msg_id] = validators.isValidId(
      utils.getInt(parsedUrl.path),
    );
    if (!id) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: error_msg_id }));
      return;
    }
    const [user, error_msg_user] = validators.isValidUserUpdate(
      parsedUrl.query,
    );
    if (!user) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: error_msg_user }));
      return;
    }
    const updatedUser = await data.updateUser(id, user);
    res.writeHead(200);
    res.end(JSON.stringify(updatedUser));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error }));
  }
};
