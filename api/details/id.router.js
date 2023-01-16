const router = require("express").Router();
const { createID, getIDDetails } = require("./id.controller");

router.get("/", getIDDetails);
router.post("/createID", createID);

module.exports = router;
