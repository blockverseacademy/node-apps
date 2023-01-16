const pool = require("../../config/database");

module.exports = {
  createCS: (data, callBack) => {
    pool.query(
      `insert into computer_science(
email,
CSS,
HTML,
Networking,
Data_Structures_and_Algorithms
) 
                values(?,?,?,?,?)`,
      [
        data.email,
        data.CSS,
        data.HTML,
        data.Networking,
        data.Data_Structures_and_Algorithms
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCSDetails: callBack => {
    pool.query(
      `select id,email,
CSS,
HTML,
Networking,
Data_Structures_and_Algorithms
 from computer_science`,
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
