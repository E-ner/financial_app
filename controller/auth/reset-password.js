const { __find_item } = require("../../utils/find-item");
const Transporter = require("nodemailer");

module.exports = async(req,res) => {
    const { email } = req.body;

    const _user = await __find_item("users",{ email:email });

    if (typeof _user === undefined) {
        res.status(400).json({ msg:"email not found" });
    }
    else{
        res.end()
    }
}