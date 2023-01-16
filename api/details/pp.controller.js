const { createPP, getPPDetails } = require("./pp.service");

module.exports = {
  createPP: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    createPP(body, (err, results) => {
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

  getPPDetails: (req, res) => {
    getPPDetails((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({ success: 1, data: results });
    });
  }
};
