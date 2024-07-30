let instance = null;
require("dotenv").config();

class AuthController {
  static getInstance() {
    if (!instance) {
      return new AuthController();
    }
    return instance;
  }

  async getAll2(_, res) {
    res.json("torri");
  }

}
module.exports = AuthController.getInstance();
