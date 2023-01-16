const router = require("express").Router();
const { createCS, getCSDetails } = require("./cs.controller");

router.get("/", getCSDetails);
router.post("/createCS", createCS);

module.exports = router;
