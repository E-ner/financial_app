require("./dotenv.config")
module.exports={
    app_port:process.env.PORT,
    __jwtk:process.env.APP_WEBTOKEN_KEY
}
