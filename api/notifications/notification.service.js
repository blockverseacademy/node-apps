const pool = require("../../config/database");

module.exports = {
    getNotifications: callBack => {
    pool.query(
      `call usp_get_notifications()`,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
