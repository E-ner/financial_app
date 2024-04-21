const { user } = require("../../models/models-index");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/token-hashing");
const { isEmail } = require("../../utils/isEmail");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (isEmail(email) == true) {
      if (!email || !password || (!email && !password))
        res.status(400).json({ msg: "email and password required" });
      else {
        const _user = await user.findOne({
          where: {
            email: email,
          },
        });

        if (_user == null) {
          const hashed_pwd = await hash(password);

          const refreshToken = await createToken({
            user_email: email,
          });

          const data = {
            email: email,
            password: hashed_pwd,
            refresToken: refreshToken,
          };
          user.create(data);
          res.status(201).json({ msg: "created", _data: data });
        } else {
          res.status(403).json({ msg: "email found try another email" });
        }
      }
    } else {
      res.status(400).json({ msg: "type must be email" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", err_name: error });
  }
};

const hash = (password) => {
  const salt = 10;
  const the_hash = bcrypt.hash(password, salt);
  return the_hash;
};

module.exports = { registerUser, hash };
