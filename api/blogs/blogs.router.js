const router = require("express").Router();
const { getBlogs, createBlog, createCategory, getBlogCategories, CreateComments, getComments, insertreactions, getBlogreactions } = require("./blogs.controller");

router.get("/getblogs/:catID/:username/:recCount/:page", getBlogs);
router.post("/createBlog", createBlog);
router.post("/createCategory", createCategory);
router.get("/getBlogCategories", getBlogCategories);
router.post("/createcomments", CreateComments);
router.get("/getComments/:BlogID", getComments);
router.post("/insertreactions", insertreactions);
router.post("/getBlogreactions", getBlogreactions)

module.exports = router;
