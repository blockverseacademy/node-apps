const pool = require("../../config/database");

module.exports = {
  createPP: (data, callBack) => {
    pool.query(
      `insert into programming_proficiency(email,
Python,
Cplusplus,
Chash,
Golang,
Rust,
Solidity,
Solana,
Ethereum,
React,
Vuejs,
Angular,
Nodejs,
Web3js,
Ethersjs) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.email,
        data.Python,
        data.Cplusplus,
        data.Chash,
        data.Golang,
        data.Rust,
        data.Solidity,
        data.Solana,
        data.Ethereum,
        data.React,
        data.Vuejs,
        data.Angular,
        data.Nodejs,
        data.Web3js,
        data.Ethersjs
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPPDetails: (data, callBack) => {
    pool.query(
      `select id,email,
Python,
Cplusplus,
Chash,
Golang,
Rust,
Solidity,
Solana,
Ethereum,
React,
Vuejs,
Angular,
Nodejs,
Web3js,
Ethersjs from programming_proficiency`,
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
