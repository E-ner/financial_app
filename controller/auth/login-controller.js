const { __find_item } = require("../../utils/find-item");
const { isEmail } = require("../../utils/isEmail");
const { bcryptCompare, createToken } = require("../../utils/token-hashing");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (isEmail(email) == true) {
      if (!email || !password || (!email && !password))
        res.status(400).json({ msg: "name and password required" });
      else {
        const _user = await __find_item("users", { email: email });

        if (_user == null) {
          res.status(401).json({ msg: "emailnotfound" });
        } else {
          const hash_compare_result = await bcryptCompare(
            password,
            _user.dataValues.password
          );

          if (hash_compare_result) {
            const refreshToken = _user.dataValues.refreshToken;
            const customToken = await createToken({ user: email });
            res.status(200).json({
              msg: "authenticated",
              __data: _user.dataValues,
              __token: customToken,
              refreshToken: refreshToken,
            });
          } else {
            res.status(401).json({ msg: "unothorized" });
          }
        }
      }
    } else {
      res.status(400).json({ msg: "the type must be email" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", err_name: error });
  }
};

module.exports = { loginController };
