const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  login,
  getAllUserDetails,
  getUserByUserEmail,
  changepassword,
  // updateUsers,
  getMenuByUser,
  deleteUser,
  getApplicationDetails,
  wheeboxAutoLogin, 
  wheeboxAssignTest,
  scheduleTest,
  getTestSchedule,
  removeTestSchedule,
  lxpsso
} = require("./user.controller");

router.get("/getAllUsers", checkToken, getAllUserDetails);

router.get("/getuserdetails", checkToken, getUserByUserEmail);
router.get("/getApplicationDetails/:data", checkToken, getApplicationDetails);
router.post("/login", login);
router.post("/changepassword", checkToken, changepassword);

router.delete("/", checkToken, deleteUser);
router.get("/getMenuByUser/:rollid", checkToken, getMenuByUser);
router.post("/wheeboxAutoLogin", wheeboxAutoLogin);
router.post("/wheeboxAssignTest", wheeboxAssignTest);
router.post("/scheduletest",checkToken,scheduleTest);
router.get("/getTestSchedule/:emailaddress",checkToken,getTestSchedule)
router.post("/removeTestSchedule/:emailaddress",checkToken,removeTestSchedule)
router.get("/lxpsso/:username", lxpsso);


module.exports = router;
