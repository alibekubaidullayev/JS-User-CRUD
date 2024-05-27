const url = require("url");
const data = require("../../data");
const utils = require("../utils");
const validators = require("../validators");

module.exports = async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const [id, error_msg] = validators.isValidId(utils.getInt(parsedUrl.path));
    if (!id) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: error_msg }));
      return;
    }
    const deletedUser = await data.deleteUser(id)
    res.writeHead(202);
    res.end(JSON.stringify(deletedUser));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error }));
  }
};
