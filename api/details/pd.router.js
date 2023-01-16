const router = require("express").Router();
const { createPD, emailPD, getPDDetails } = require("./pd.controller");
// router.get("/", checkToken, getUsers);
// router.post("/", checkToken, createUser);
// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

router.get("/getPDDetails", getPDDetails);
router.post("/createPD", createPD);
router.get("/emailPD/:email", emailPD);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;
