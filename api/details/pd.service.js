const pool = require("../../config/database");

module.exports = {
  createPD: (data, callBack) => {
    pool.query(
      `insert into personaldetails(name, email, number, address) 
                values(?,?,?,?)`,
      [data.name, data.email, data.number, data.address],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  emailPD: (email, callBack) => {
    console.log(email);
    pool.query(
      `select * from personaldetails where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getPDDetails: (data, callBack) => {
    pool.query(
      `select id,name, email, number, address from personaldetails where email=?`,
      [data.email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
