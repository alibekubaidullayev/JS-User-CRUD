const url = require("url");
const data = require("../../data");
const validators = require("../validators");
const utils = require("../utils");

module.exports = async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const [id, error_msg] = validators.isValidId(utils.getInt(parsedUrl.path));
    if (!id) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: error_msg }));
      return;
    }
    const user = await data.getUser(id);
    res.writeHead(200);
    res.end(JSON.stringify(user));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error }));
  }
};
