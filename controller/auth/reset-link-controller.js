const { createToken } = require("../../utils/token-hashing");
const { update_data } = require("../../utils/update-data");

module.exports.resetLink = async (req, res) => {
  if (req.query.refresh_token == null) {
    res.status(403).json({ msg: "forbidden" });
  } else {
    const { refresh_token } = req.query;
    const { resetpwd, email } = req.body;

    update_data("users", { password: resetpwd }, { where: { email: email } });
    res
      .status(200)
      .json({
        _data: { email: email, refrehToken: refresh_token },
        token: await createToken({ email: email }),
      });
  }
};
