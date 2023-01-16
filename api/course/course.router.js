const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getCourseDetails, getAllCourseDetails, updateCourseDetails, addnewcourse } = require("./course.controller");

router.get("/getCourseDetails", getCourseDetails);
router.post("/getAllCourseDetails", checkToken,getAllCourseDetails);
router.post("/updateCourseDetails", checkToken,updateCourseDetails);
router.post("/addnewcourse", checkToken,addnewcourse)

module.exports = router;