const pool = require("../../config/database");

module.exports = {
  createCA: (data, callBack) => {
    pool.query(
      `insert into tx_course_app_mapping(
email,
course
) 
                values(?,?)`,
      [data.email, data.course],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCADetails: callBack => {
    pool.query(
      `select id,email,
course,
date from tx_course_app_mapping`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
