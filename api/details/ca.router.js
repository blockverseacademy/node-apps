const router = require("express").Router();
const { createCA, getCADetails } = require("./ca.controller");

router.get("/", getCADetails);
router.post("/createCA", createCA);

module.exports = router;
