const axios = require("axios");
const pool = require("../../config/database");
var nodemailer = require("nodemailer");
module.exports = {
  createSupport: (data, callBack) => {
    pool.query(
      `insert into support(name, email, number, subject, message,optionname) 
                values(?,?,?,?,?,?)`,
      [
        data.name,
        data.email,
        data.number,
        data.subject,
        data.message,
        data.optionname
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
       


        return callBack(null, results);
      }
    );
  },

  getSupportDetailsById: (id, callBack) => {
    pool.query(
      `select id,name, email, number, subject, message from support where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getSupportDetails: callBack => {
    pool.query(
      `select id,name, email, number, subject, message from support`,
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
