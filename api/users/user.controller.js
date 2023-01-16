
const {
  getUserByUserEmail,
  deleteUser,
  getAllUserDetails,
  changepassword,
  getOldPassword,
  getApplicationDetails,
  getMenuByUser,
  wheeboxAutoLogin,
  wheeboxAssignTest,
  getTestSchedule,
  scheduleTest,
  removeTestSchedule,
  lxpsso
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  
  wheeboxAutoLogin: (req, res) => {
    const body = req.body;

    wheeboxAutoLogin(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  wheeboxAssignTest: (req, res) => {
    const body = req.body;

    wheeboxAssignTest(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  changepassword: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);

    body.password = hashSync(body.password, salt);
    changepassword(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  login: (req, res) => {
    const body = req.body;
    let username = "";
    let role = "";
    let firsttimeuser = "";
    let password = "";
    let roleid ="";
    let company="";

    getUserByUserEmail({email: body.email,usertype: body.usertype, IP:body.clientIp }, (err, results) => {
      if (err) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      } else {

        
        if (results[0].username===undefined){
          return res.json({
            success: 0,
            data: "Invalid Role Selected"
          });
        }
        else {
        username = results[0].username;
        role = results[0].role;
        firsttimeuser = results[0].forcepasschange;
        password = results[0].password;
        roleid = results[0].roleid;
        company = results[0].company;
      }
      const result = compareSync(body.password, results[0].password);

      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "6000000"
        });

        const refreshToken = sign(
          { result: results },
          process.env.JWT_REFRESH_KEY,
          {
            expiresIn: "120000"
          }
        );

        return res.json({
          success: 1,
          name: username,
          role: role,
          firsttimeuser: firsttimeuser,
          data: "login successfully",
          token: jsontoken,
          refreshToken: refreshToken,
          roleid,
          company
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    }
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        data: "user deleted successfully"
      });
    });
  },
  getAllUserDetails: (req, res) => {
    getAllUserDetails((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({ success: 0, data: "Record Not Found" });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  getMenuByUser: (req, res) => {

    const data = req.params.rollid;
    getMenuByUser(data,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({ success: 0, data: "Record Not Found" });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  getUserByUserEmail: (req, res) => {
    const body = req.body;

    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "No Data found"
        });
      } else {
        return res.status(200).json({ success: 1, data: results });
      }
    });
  },

  changepassword: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);

    getOldPassword(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "No Data found"
        });
      }

      console.log(body.pass)
      console.log(results)
      const result = compareSync(body.pass, results.t_vc_Password);
      if (result) {
        body.password = hashSync(body.password, salt);
 
        changepassword(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({ success: 1, data: "updated successfully" });
        });
      } else {
   
        return res.json({
          success: 0,
          data: "Your Current Password is Incorrect"
        });
      }
    });
  },
  getApplicationDetails: (req, res) => {
    const body = req.params.data;
    let PersonalDetails = {};
    const Education = {};
    const Internship = {};
    const Computer = {};
    const pp = {};

    getApplicationDetails(body, (err, results) => {
      if (err) {
      }
      if (!results) {
        return res.json({ success: 0, data: "No Data found" });
      } else {
        return res.status(200).json({
          success: 1,
          data: [
            {
              PersonalDetails: [
                {
                  name: "name",
                  value: results.name
                },
                { name: "email", value: results.email },
                { name: "number", value: results.number },
                { name: "address", value: results.address }
              ],
              Computer: [
                { name: "css", value: results.css },
                { name: "html", value: results.html },
                { name: "Networking", value: results.Networking },
                {
                  name: "Data_Structures_and_Algorithms",
                  value: results.Data_Structures_and_Algorithms
                }
              ],
              Education: [
                { name: "description", value: results.description },
                {
                  name: "year_addmisssion",
                  value: results.year_addmisssion
                },
                { name: "degree", value: results.degree },
                { name: "branch", value: results.branch },
                {
                  name: "batch_st_year",
                  value: results.batch_st_year
                },
                {
                  name: "batch_ed_year",
                  value: results.batch_ed_year
                }
              ],
              Internship: [
                { name: "internship1", value: results.internship1 },
                { name: "internship2", value: results.internship2 },
                { name: "internship3", value: results.internship3 },
                { name: "internship4", value: results.internship4 }
              ],
              PP: [
                { name: "Python", value: results.Python },
                { name: "Cplusplus", value: results.Cplusplus },
                { name: "Chash", value: results.Chash },
                { name: "Golang", value: results.Golang },
                { name: "rust", value: results.rust },
                { name: "Solidity", value: results.Solidity },
                { name: "Solana", value: results.Solana },
                { name: "Ethereum", value: results.Ethereum },
                { name: "React", value: results.React },
                { name: "Vuejs", value: results.Vuejs },
                { name: "Angular", value: results.Angular },
                { name: "Nodejs", value: results.Nodejs },
                { name: "Web3js", value: results.Web3js }
              ]
            }
          ]
        });
      }
    });
  },
  scheduleTest: (req, res) => {
    const body = req.body;

    scheduleTest(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  getTestSchedule: (req, res) => {
   
    const emailaddress = req.params.emailaddress;
    getTestSchedule(emailaddress, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }
     
      if(results.length > 0) {
        return res.status(200).json({ success: 1, data: results });
        }
        else
        {
          return res.status(200).json({ success: 0, data: "NA" });
        }
    });
  },
  removeTestSchedule: (req, res) => {

    const emailaddress = req.params.emailaddress;
    removeTestSchedule(emailaddress, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }
     
      return res.status(200).json({ success: 1, data: results });
    });
  },
  lxpsso: (req, res) => {
    
    const username = req.params.username;
    lxpsso(username, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }
     
      return res.status(200).json({ success: 1, data: results });
    });
  },
};
