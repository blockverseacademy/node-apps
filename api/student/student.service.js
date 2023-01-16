const pool = require("../../config/database");

module.exports = {
  getRegisteredUsers: callBack => {
    pool.query(
      `select * from tx_course_app_mapping`,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
