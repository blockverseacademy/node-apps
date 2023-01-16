const pool = require("../../config/database");

module.exports = {
  createED: (data, callBack) => {
    pool.query(
      `insert into educationaldetails(email, description, year_addmisssion, year_graduation,degree,branch,batch_st_year,batch_ed_year) 
                values(?,?,?,?,?,?,?,?)`,
      [
        data.email,
        data.eddescription,
        data.edadyear,
        data.edyg,
        data.radio,
        data.radiobr,
        data.bsy,
        data.bey
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEDDetails: callBack => {
    pool.query(
      `select id,email, description, year_addmisssion, year_graduation,degree,branch,batch_st_year,batch_ed_year from educationaldetails`,
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
