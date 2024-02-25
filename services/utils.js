class Utils {
  isValidParam(body, key) {
    if (typeof body[key] === "undefined" || body[key] === "") {
      return false;
    }
    return true;
  }
}

const utils = new Utils();
module.exports = utils;
