const { register , login ,setavatar , allusers} = require("../controller/usersController");


const router = require("express").Router();

router.post("/register",register)
router.post("/login",login)
router.post("/setavatar",setavatar)
router.get("/allusers/:username",allusers)

module.exports = router;