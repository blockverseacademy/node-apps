const { createCS, getCSDetails } = require("./cs.service");

module.exports = {
  createCS: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    createCS(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getCSDetails: (req, res) => {
    getCSDetails((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({ success: 1, data: results });
    });
  }
};
