const router = require("express").Router();

const {
    uploadfile
} = require("./upload.controller");


router.post("/uploadfile", uploadfile);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;
