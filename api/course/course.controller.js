const { getCourseDetails,getAllCourseDetails, updateCourseDetails, addnewcourse } = require("./course.service");

module.exports = {
  getCourseDetails: (req, res) => {
    getCourseDetails((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  getAllCourseDetails: (req, res) => {
    const body = req.body;
  
    getAllCourseDetails(body,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  updateCourseDetails: (req, res) => {
    const body = req.body;
    console.log(body)
    updateCourseDetails(body,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  addnewcourse: (req, res) => {
    const body = req.body;
    console.log(body)
    addnewcourse(body,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({ success: 1, data: results });
    });
  }
};
