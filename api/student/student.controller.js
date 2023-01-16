const { getRegisteredUsers } = require("./student.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  getRegisteredUsers: (req, res) => {
    getRegisteredUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({ success: 0, message: "Record Not Found" });
      }

      return res.status(200).json({ success: 1, data: results });
    });
  }
};
