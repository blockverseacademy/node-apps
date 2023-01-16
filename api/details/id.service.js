const pool = require("../../config/database");

module.exports = {
  createID: (data, callBack) => {
    pool.query(
      `insert into internship(email, internship1,internship2,internship3,internship4) 
                values(?,?,?,?,?)`,
      [
        data.email,
        data.Internship1,
        data.Internship2,
        data.Internship3,
        data.Internship4
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getIDDetails: callBack => {
    pool.query(
      `select id, email, internship1,internship2,internship3,internship4 from internship`,
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
