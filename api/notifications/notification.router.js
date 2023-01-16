const router = require("express").Router();
const { getNotifications } = require("./notification.controller");

router.get("/getNotifications", getNotifications);

module.exports = router;
