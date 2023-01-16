const { createCA, getCADetails } = require("./ca.service");

module.exports = {
  createCA: (req, res) => {
    const body = req.body;
    createCA(body, (err, results) => {
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

  getCADetails: (req, res) => {
    getCADetails((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({ success: 1, data: results });
    });
  }
};
