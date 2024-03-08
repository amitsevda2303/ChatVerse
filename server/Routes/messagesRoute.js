const {addmessage , getallmessage} = require("../controller/messagesController");


const router = require("express").Router();

router.post("/addmsg",addmessage)
router.post("/getallmsg",getallmessage)

module.exports = router;