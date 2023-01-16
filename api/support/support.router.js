const router = require("express").Router();
const {
  createSupport,

  getSupportDetailsById,
  getSupportDetails
} = require("./support.controller");

router.get("/", getSupportDetails);
router.post("/createSupport", createSupport);
router.get("/:id", getSupportDetailsById);

module.exports = router;
 