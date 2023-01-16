const axios = require("axios");
const pool = require("../../config/database");
const store = require("store2");
var nodemailer = require("nodemailer");
module.exports = {
  createUserLogin: (data, callBack) => {
    pool.query(
      `call usp_tx_userlogin(?,?,?,?,?)`,
      [data.username, data.password, data.usertype, data.companyid, data.name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        var transporter = nodemailer.createTransport({
          host: "mail.blockverseacademy.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAILUSERNAME,
            pass: process.env.EMAILPASSWORD
          }
        });

        var mailOptions = {
          from: "support.@blockverseacademy.com",
          to: "support.@blockverseacademy.com",
          subject: "Welcome to BlockVerse Academy",
          html: `<div class="read-content-body"><h5 class="mb-4">Dear Applicant ,</h5><p class="mb-2"> thank you for applying for a course at BlockVerse Academy. We would like to invite you to take a test for the course and subject to your results would get back to you with the next steps.<br /> Please find your credentials to login to BlockVerse Academy Site <hr><br /><strong>Username: </strong> ${data.username} <br /> <strong>Password :</strong>${data.password} </p><br /> Website: <a href='https://www.blockverseacademy.com'>https://www.blockverseacademy.com</a><h5 class="pt-3">Kind Regards</h5><p>BlockVerse Academy</p><hr></div>
`
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return callBack(null, results);
      }
    );
  },

  lxpsso: (username, callBack) => {
    var results = "";
    username = "madhavi@potentia.in";

    axios
      .get("https://vconnect.potentia.in/getuseraccesskey?client=" + process.env.LXPKEY + "&UserName=" + username, {
        headers: {}
      })
      .then(function (response) {
        //Register User


        if (response.data.status === 1) {
          let accesskey = response.data.accesskey;
          
          return callBack(null, accesskey);

        }

        // Ends Here
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  wheeboxAutoLogin: (data, callBack) => {
    var results = "";
    var body =
      "{'loginId':'" +
      data.username +
      "','firstName':'" +
      data.name +
      "','lastName':'" +
      data.name +
      "','dob':'1900-01-01', 'state':'maharashtra', 'gender':'male','country':'india', 'city':'pune', 'assignTests': [34073]}";


    axios
      .post("https://blockverseacademy.com/index.php", body, {
        headers: { "Content-Type": "application/json" }
      })
      .then(function (response) {
        //Register User
    

        var config = {
          method: "post",
          url:
            "https://uat.wheebox.com/wheeboxAPI_v2/registration/0275000?val=" +
            response.data,
          headers: { accessToken: "1mEiNZI1LSNvCU2" }
        };

        axios(config)
          .then(function (response) {
            results = JSON.stringify(response.data);

            //Authenticate Useer

            var body = data.username;

            axios
              .post("https://blockverseacademy.com/index.php", body, {
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(function (response) {
                // Get Token for Autologin

                var config = {
                  method: "post",
                  url:
                    "https://uat.wheebox.com/wheeboxAPI_v2/authenticate/0275000/" +
                    response.data +
                    "/1mEiNZI1LSNvCU2",
                  headers: {}
                };

                axios(config)
                  .then(function (response) {
     
                    results = response.data.token;
                    return callBack(null, results);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                // Ends Here
              })
              .catch(function (error) {
                console.log(error);
              });

            // Ends Here
          })
          .catch(function (error) {
            console.log(error);
          });

        // Ends Here
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  wheeboxAssignTest: (data, callBack) => {
    var body = data.username;

    axios
      .post("https://blockverseacademy.com/index.php", body, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function (response) {
        // Get Token for Autologin
        var results = response.data;
        var body =
          "{'retainTest': [34074], 'updateTest': {'34074': {'startDate': '2022-09-01 10:25:00', 'endDate': '2022-09-11 11:25:00', 'centerState': '', 'centerCity': ''}}}";

        axios
          .post("https://blockverseacademy.com/index.php", body, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(function (response) {
          

            var config = {
              method: "post",
              url:
                "https://uat.wheebox.com/wheeboxAPI_v2/candidateRoster/update/0275000/" + results + "?val=" +
                response.data,
              headers: { "accessToken": "1mEiNZI1LSNvCU2" }
            };
            axios(config)
              .then(function (response) {
        

              })
              .catch(function (error) {
                console.log(error);
              });

          })
          .catch(function (error) {
            console.log(error);
          });

        // Ends Here
      })
      .catch(function (error) {
        console.log(error);
      });



  },

  getUserByUserEmail: (data, callBack) => {
   
    pool.query(
      `call usp_getLoginDetails(?,?,?)`,
      [data.email, data.usertype, data.IP],
      (error, results, fields) => {
        if (error) {
          
          callBack(error);
        }

        return callBack(null, results[0]);
      }
    );
  },
  getAllUserDetails: callBack => {
    pool.query(`select * from tx_login`, (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `update tx_login set t_bo_active =0 where t_vc_Username = ?`,
      [data.username],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getMenuByUser: (data, callBack) => {
    pool.query(
      `call usp_GetLeftMenuByUserIDv2(?)`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  changepassword: (data, callBack) => {
    pool.query(
      `update tx_login set t_vc_Password=?, t_bo_FirstTimeLogin=0 where t_vc_Username = ?`,
      [data.password, data.email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getOldPassword: (data, callBack) => {
    pool.query(
      `select t_vc_Password from tx_login where t_vc_Username = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        return callBack(null, results[0]);
      }
    );
  },

  getApplicationDetails: (email, callBack) => {
    pool.query(
      `select pd.name, pd.email, pd.number, pd.address, case when cs.CSS=0 then 'No understanding' when cs.css=1 then 'Awareness (Understanding of concepts)' when cs.css=2 then 'Beginner (Write simple codes/ programs)' when cs.css=3 then 'Proficient (Write complex codes/ programs)' end as css, 
case when cs.html=0 then 'No understanding' when cs.html=1 then 'Awareness (Understanding of concepts)' when cs.html=2 then 'Beginner (Write simple codes/ programs)' when cs.html=3 then 'Proficient (Write complex codes/ programs)' end as html, 
case when cs.Networking=0 then 'No understanding' when cs.Networking=1 then 'Awareness (Understanding of concepts)' when cs.Networking=2 then 'Beginner (Write simple codes/ programs)' when cs.Networking=3 then 'Proficient (Write complex codes/ programs)' end as Networking, 
case when cs.Data_Structures_and_Algorithms=0 then 'No understanding' when cs.Data_Structures_and_Algorithms=1 then 'Awareness (Understanding of concepts)' when cs.Data_Structures_and_Algorithms=2 then 'Beginner (Write simple codes/ programs)' when cs.Data_Structures_and_Algorithms=3 then 'Proficient (Write complex codes/ programs)' end as Data_Structures_and_Algorithms, ed.description, ed.year_addmisssion, ed.degree, ed.branch, ed.batch_st_year, ed.batch_ed_year, i.internship1, i.internship2, i.internship3, i.internship4, case when 	pp.	Python	  =  	0	then  	'No understanding'		 when 	pp.Python	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.Python	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.Python	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	Python, 
case when 	pp.Cplusplus	  =  	0	then  	'No understanding'		 when 	pp.Cplusplus	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.Cplusplus	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.Cplusplus	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	Cplusplus, 
case when 	pp.Chash	  =  	0	then  	'No understanding'		 when 	pp.Chash	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.Chash	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.Chash	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	Chash, 
case when 	pp.Golang	  =  	0	then  	'No understanding'		 when 	pp.Golang	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.Golang	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.Golang	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	Golang, 
case when 	pp.rust	  =  	0	then  	'No understanding'		 when 	pp.rust	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.rust	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.rust	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	rust, 
case when 	pp.Solidity	  =  	0	then  	'No understanding'		 when 	pp.Solidity	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.Solidity	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.Solidity	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	Solidity, 
case  when 	pp.Solana	  =  	0	then  	'No understanding'		 when 	pp.Solana	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.Solana	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.Solana	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	Solana, 
 case when 	pp.Ethereum	  =  	0	then  	'No understanding'		 when 	pp.Ethereum	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.Ethereum	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.Ethereum	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	Ethereum, 
case when 	pp.React	  =  	0	then  	'No understanding'		 when 	pp.React	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.React	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.React	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	React, 
case when 	pp.Vuejs	  =  	0	then  	'No understanding'		 when 	pp.Vuejs	  =  	1	then  	'Awareness (Understanding of concepts)'		 when 	pp.Vuejs	  =  	2	then  	'Beginner (Write simple codes/ programs)'		 when 	pp.Vuejs	  =  	3	then  	'Proficient (Write complex codes/ programs)' end as 	  	Vuejs, 
case when pp.Angular  =  0  then  'No understanding' when pp.Angular  =  1  then  'Awareness (Understanding of concepts)' when pp.Angular  =  2  then  'Beginner (Write simple codes/ programs)' when pp.Angular  =  3  then  'Proficient (Write complex codes/ programs)' end as   Angular, 
case when pp.Nodejs  =  0  then  'No understanding' when pp.Nodejs  =  1  then  'Awareness (Understanding of concepts)' when pp.Nodejs  =  2  then  'Beginner (Write simple codes/ programs)' when pp.Nodejs  =  3  then  'Proficient (Write complex codes/ programs)' end as   Nodejs, 
case when pp.Web3js  =  0  then  'No understanding' when pp.Web3js  =  1  then  'Awareness (Understanding of concepts)' when pp.Web3js  =  2  then  'Beginner (Write simple codes/ programs)' when pp.Web3js  =  3  then  'Proficient (Write complex codes/ programs)' end as   Web3js, 
case when pp.Ethersjs  =  0  then  'No understanding' when pp.Ethersjs  =  1  then  'Awareness (Understanding of concepts)' when pp.Ethersjs  =  2  then  'Beginner (Write simple codes/ programs)' when pp.Ethersjs  =  3  then  'Proficient (Write complex codes/ programs)' end as Ethersjs 
from personaldetails pd left outer join computer_science cs on pd.email= cs.email left outer join educationaldetails ed on pd.email= ed.email left outer join internship i on pd.email = i.email left outer join  programming_proficiency pp on pd.email= pp.email 
where pd.email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  scheduleTest: (data, callBack) => {
    console.log(data)
    pool.query(
      `call usp_ins_student_test_schedule(?,?)`,
      [data.emailaddress, data.datescheduled],
      (error, results, fields) => {
        if (error) {

          callBack(error);
        }

        return callBack(null, results[0]);
      }
    );
  },
  getTestSchedule: (data, callBack) => {

    pool.query(
      `call usp_get_student_test_schedule(?)`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  removeTestSchedule: (data, callBack) => {

    pool.query(
      `call usp_remove_student_test_schedule(?)`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
