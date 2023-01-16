const router = require("express").Router();
const { createPP, getPPDetails } = require("./pp.controller");

router.get("/", getPPDetails);
router.post("/createPP", createPP);

module.exports = router;
