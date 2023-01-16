const router = require("express").Router();
const { createED, getEDDetails } = require("./ed.controller");

router.get("/", getEDDetails);
router.post("/createED", createED);

module.exports = router;
