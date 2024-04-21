const { user } = require("../../models/models-index");
const { createToken } = require("../../utils/token-hashing");

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if(!refreshToken) res.json({msg:"refresh token required"}).status(400)
    else{
      const _user = await user.findOne({
          where: {
            refresToken: refreshToken,
          },
        });
      
        if (_user == null) {
          res.status(401).json({ msg: "token not found" });
        } 
        else {
          const token = await createToken({ user:_user.dataValues.name });
          res.status(201).json({ _data:_user.dataValues,msg:"tokenrefreshed",_token:token })
        }
    }
  } catch (error) {
    res.status(500).json({ msg:"Internal Server Error", err_name:error })
  }
};

module.exports= {refreshToken}