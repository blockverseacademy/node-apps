const { createPD, emailPD, getPDDetails } = require("./pd.service");

module.exports = {
  createPD: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    createPD(body, (err, results) => {
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

  emailPD: (req, res) => {
    const email = req.params.email;

    emailPD(email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({ success: 0, message: "Record not Found" });
      }

      return res.json({ success: 1, data: results });
    });
  },
  getPDDetails: (req, res) => {
    const body = req.body;

    getPDDetails(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({ success: 1, data: results });
    });
  }
};
