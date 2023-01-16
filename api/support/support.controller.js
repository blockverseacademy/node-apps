const {
  createSupport,
  getSupportDetailsById,
  getSupportDetails
} = require("./support.service");

module.exports = {
  createSupport: (req, res) => {
    const body = req.body;

    createSupport(body, (err, results) => {
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

  getSupportDetailsById: (req, res) => {
    const id = req.params.id;
    getSupportDetailsById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({ success: 0, message: "Record not Found" });
      }
      results.password = undefined;
      return res.json({ success: 1, data: results });
    });
  },
  getSupportDetails: (req, res) => {
    getSupportDetails((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({ success: 1, data: results });
    });
  }
};
