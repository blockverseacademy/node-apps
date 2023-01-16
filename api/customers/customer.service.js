const axios = require("axios");
const pool = require("../../config/database");
const store = require("store2");
var nodemailer = require("nodemailer");
module.exports = {

  createUserLogin: (data, password,callBack) => {
    console.log(password)
    pool.query(
      `call usp_tx_userlogin(?,?,?,?,?)`,
      [data.username, password, data.usertype, data.companyid, data.name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }

        // var transporter = nodemailer.createTransport({
         
        //   host: "smtp.gmail.com",
        //   port: 587,
        //   auth: {
        //     user: process.env.EMAILUSERNAME,
        //     pass: process.env.EMAILPASSWORD
        //   }
        // });

        // var mailOptions = {
        //   from: "autoreply@blockverseacademy.com",
        //   to: "support@blockverseacademy.com; amit.kittur@gmail.com",
        //   subject: "Welcome to BlockVerse Academy",
        //  html: `<div class="read-content-body"><h5 class="mb-4">Dear Applicant ,</h5><p class="mb-2"> thank you for applying for a course at BlockVerse Academy. We would like to invite you to take a test for the course and subject to your results would get back to you with the next steps.<br /> Please find your credentials to login to BlockVerse Academy Site <hr><br /><strong>Username: </strong> ${data.username} <br /> <strong>Password :</strong>${password} </p><br /> Website: <a href='https://www.blockverseacademy.com'>https://www.blockverseacademy.com</a><h5 class="pt-3">Kind Regards</h5><p>BlockVerse Academy</p><hr></div>`
        //  //html:'hi'
        // };
        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("Email sent: " + info.response);
        //   }
        // });

         
        return callBack(null, 'Success');
      }
    );
  },

  razorPayGetAllCustomers: (callBack) => {
   
    var config = {
      method: 'get',
      url: 'https://api.razorpay.com/v1/customers',
      headers: {
        'Authorization': 'Basic ' + process.env.RAZORPAYTESTKEY
      }
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data)
        return callBack(null, response.data);
      })
      .catch(function (error) {
        return callBack(null, error);
      });


  },
  razorPayGetAllRefunds: (callBack) => {
   
    var config = {
      method: 'get',
      url: 'https://api.razorpay.com/v1/refunds',
      headers: {
        'Authorization': 'Basic ' + process.env.RAZORPAYTESTKEY
      }
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data)
        return callBack(null, response.data);
      })
      .catch(function (error) {
        return callBack(null, error);
      });


  },
  razorPayGetAllOrders: (callBack) => {
   
    var config = {
      method: 'get',
      url: 'https://api.razorpay.com/v1/orders',
      headers: {
        'Authorization': 'Basic ' + process.env.RAZORPAYTESTKEY
      }
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data)
        return callBack(null, response.data);
      })
      .catch(function (error) {
        return callBack(null, error);
      });


  },
  razorPayGetAllPayments: (callBack) => {
   
    var config = {
      method: 'get',
      url: 'https://api.razorpay.com/v1/payments/',
      headers: {
        'Authorization': 'Basic ' + process.env.RAZORPAYTESTKEY
      }
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data)
        return callBack(null, response.data);
      })
      .catch(function (error) {
        return callBack(null, error);
      });


  },
  razorPayUpdateCustomer: async (id,data,callBack) => {
  
    console.log(id, data)
  
    var config = {
      method: 'put',
      url: 'https://api.razorpay.com/v1/customers/' + id,
      headers: {
        'Authorization': 'Basic ' + process.env.RAZORPAYTESTKEY
      },
      data : data
    };
   
    axios(config)
      .then(function (response) {
        console.log(response.data)
        return callBack(null, response.data);
      })
      .catch(function (error) {
        console.log(error)
        //return callBack(null, error);
      });

   
  

  },

  InsertNewCustomer: (data, callback) => {

    pool.query(
      `call usp_ins_customers(?,?,?,?,?,?,?)`,
      [
        data.rzPayID,
        data.entity,
        data.customername,
        data.customerEmail,
        data.customerPhonenumber,
        data.gstin,
        data.status
      ],
      (error, results) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  InsertCustomerInformation: (data, callback) => {

    pool.query(
      `call usp_ins_custinfo(?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.customerID,
        data.firstname,
        data.lastname,
        data.email,
        data.phone,
        data.address,
        data.facebook,
        data.twitter,
        data.linkedin,
        data.instagram,
        data.pPhoto
      ],
      (error, results) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  InsertPaymentDetails: (data, callback) => {

    pool.query(
      `call usp_ins_paymentdetails(?,
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.paymentid 
        ,data.entity 
        ,data.amount 
        ,data.currency 
        ,data.status 
        ,data.order_id 
        ,data.invoice_id 
        ,data.international 
        ,data.method 
        ,data.amount_refunded 
        ,data.refund_status 
        ,data.captured 
        ,data.description 
        ,data.card_id 
        ,data.bank 
        ,data.wallet 
        ,data.vpa 
        ,data.email 
        ,data.contact 
        ,data.fee 
        ,data.tax 
        ,data.error_code 
        ,data.error_description 
        ,data.error_source 
        ,data.error_step 
        ,data.error_reason 
        ,data.created_at 
        ,data.card_trans_id 
        ,data.name
        ,data.last4 
        ,data.network 
        ,data.type 
        ,data.issuer 
        ,data.emi 
        ,data.sub_type 
        ,data.token_iin 
        ,data.notes_id 
        ,data.phone 
        ,data.courseid 
      ],
      (error, results) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  InsertRefundDetails: (data, callback) => {

    pool.query(
      `call usp_ins_refunddetails(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.id ,
        data.entity,
        data.amount ,
        data.currency ,
        data.payment_id,
        data.comment,
        data.receipt,
        data.arn,
        data.created_at,
        data.batch_id,
        data.status,
        data.speed_processed,
        data.speed_requested
      ],
      (error, results) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  InsertOrderDetails: (data, callback) => {

    pool.query(
      `call usp_ins_orderdetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.id ,
        data.entity ,
        data.amount ,
        data.amount_paid ,
        data.amount_due ,
        data.currency ,
        data.receipt  ,
        data.offer_id  ,
        data.status ,
        data.attempts ,
        data.notes_name ,
        data.notes_email ,
        data.notes_phone ,
        data.notes_course_id ,
        data.created_at 
      ],
      (error, results) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getAllCustomers: (data,callBack) => {
   
    pool.query(
      `call usp_get_customers(?,?,?,?)`,
      [data.rzPayID,
      data.qlimit,
      data.qoffset, data.search],
      (error, results) => {
        if (error) {
          console.log(error)
          callBack(error);
        }
        console.log(results)
        return callBack(null, results[0]);
      }
    );
  },
  getPaymentDetailsByEmail: (data,callBack) => {
   
    pool.query(
      `call usp_get_paymentdetails(?,?,?)`,
      [data.email,
      data.qlimit,
      data.qoffset],
      (error, results) => {
        if (error) {
          console.log(error)
          callBack(error);
        }
        console.log(results)
        return callBack(null, results[0]);
      }
    );
  },
  getRefundDetailsByEmail: (data,callBack) => {
   
    pool.query(
      `call usp_get_refunddetails(?,?,?)`,
      [data.email,
      data.qlimit,
      data.qoffset],
      (error, results) => {
        if (error) {
          console.log(error)
          callBack(error);
        }
        console.log(results)
        return callBack(null, results[0]);
      }
    );
  },
  getRegisteredCourseDetailsByEmail: (data,callBack) => {
   
    pool.query(
      `call usp_get_registeredcourses(?,?,?)`,
      [data.email,
      data.qlimit,
      data.qoffset],
      (error, results) => {
        if (error) {
          console.log(error)
          callBack(error);
        }
        console.log(results)
        return callBack(null, results[0]);
      }
    );
  },
  UpdateCustomerStatus: (data, callback) => {

    pool.query(
      `call usp_upd_customer_status(?,?)`,
      [
        data.rzPayID,
       data.status
      ],
      (error, results) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCustomerInformation: (data,callBack) => {
   
    pool.query(
      `call usp_get_custinfo(?)`,
      [data.email],
      (error, results) => {
        if (error) {
          console.log(error)
          callBack(error);
        }
        console.log(results)
        return callBack(null, results[0]);
      }
    );
  },
};
