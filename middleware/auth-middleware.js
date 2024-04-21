const { verifyToken } = require("../utils/token-hashing");

const authMiddleware = async (req, res, next) => {
  try {
    const token = String(req.headers['authorization']).replace("Bearer ","")

    const verify_token = await verifyToken(token);
  
    if (verify_token == null) {
      res.json({ msg: "token expired" }).status(401);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ msg:"Internal Server Error", err_name:error })
  }
};

module.exports = { authMiddleware };
