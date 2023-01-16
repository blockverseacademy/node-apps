const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getRegisteredUsers } = require("./student.controller");

router.get("/getRegisteredUsers", checkToken, getRegisteredUsers);

module.exports = router;
