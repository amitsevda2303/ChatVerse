const { register , login ,setavatar } = require("../controller/usersController");


const router = require("express").Router();

router.post("/register",register)
router.post("/login",login)
router.post("/setavatar",setavatar)

module.exports = router;