const pool = require("../../config/database");

module.exports = {
  getCourseDetails: callBack => {
    pool.query(
      `select * from courses where isActive = 1`,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAllCourseDetails: (data, callback)  => {
    pool.query(
      `call usp_get_courses(?,?)`,[data.qlimit, data.qoffset],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  updateCourseDetails: (data, callback)  => {
    
    pool.query(
      `call usp_upd_courses(?,?,?,?,?,?,?,?,?)`,[data.pid, data.batchid, data.paymentpage_id, data.dtdate, data.status, data.url, data.ctype,data.qlimit, data.qoffset],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  }
  ,

  addnewcourse: (data, callback)  => {
    
    pool.query(
      `call usp_ins_courses(?,?,?,?,?,?,?,?,?,?)`,
      [data.title, data.description, data.imagepath, data.type, data.paymentpage_id, data.payment_url,  data.coursefee_domestic,
      data.coursefee_international, data.currsymbol, data.batchname
      ],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  }
};
