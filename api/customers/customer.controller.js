const {
  razorPayGetAllCustomers, InsertNewCustomer, razorPayUpdateCustomer, createUserLogin, getAllCustomers, UpdateCustomerStatus, InsertPaymentDetails,
  razorPayGetAllPayments,razorPayGetAllRefunds, InsertRefundDetails, InsertOrderDetails, razorPayGetAllOrders,
  getPaymentDetailsByEmail, getRefundDetailsByEmail, getRegisteredCourseDetailsByEmail,
  getCustomerInformation, InsertCustomerInformation
} = require("./customer.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

function randomDNA(len) {
  let s = '';
  while (s.length < len) s += Math.random().toString(36).substr(2, len - s.length);
  return s;
}

module.exports = {
  createUserLogin: (req, res) => {

    const body = req.body;

    const salt = genSaltSync(10);

    var password = '';

    password = randomDNA(7)
    console.log(password)
    password = hashSync(password, salt);

    createUserLogin(body, password, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }
      console.log(({ success: 1, data: results }))
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getAllCustomers: (req, res) => {
    // const uniqueid = req.params.rzPayID;
    // const qlimit = req.params.qlimit;
    // const qoffset = req.params.qoffset;
    const body = req.body;
    const uniqueid = req.body.rzPayID;
    // const data={rzPayID: uniqueid, qlimit:qlimit,qoffset,qoffset}

    // console.log(uniqueid,qlimit,qoffset)
    getAllCustomers(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "No Data found"
        });
      } else {


        let finalData = [];
        let excludeIds = [];
        results.forEach(element => {
          finalData.push({
            id: element.id,
            entity: element.entity,
            name: element.name,
            email: element.email,
            contact: element.contact,
            gstin: "0",
            status: element.status,
            totalcount: element.totalcount,
            qlimit: element.qlimit, qoffset: element.qoffset

          })

          excludeIds.push(element.id)
        })

        results = "";

        razorPayGetAllCustomers((err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              data: "Razor Pay API Error"
            });
          }



          const dFiltered = results.items.filter(items => !excludeIds.includes(items.id));
          if (dFiltered) {
            dFiltered.forEach(element => {
              finalData.push({
                id: element.id,
                entity: element.entity,
                name: element.name,
                email: element.email,
                contact: element.contact,
                gstin: "0",
                status: 'Pending',
                totalcount: element.totalcount,
                qlimit,
                qoffset

              })
            })
          }

          if (uniqueid != 'All') {

            finalData = finalData.filter((data) => data.id === uniqueid
            );

          }
          if (finalData.length === 0) {
            return res.status(200).json({ success: 0, message: 'No Records found!' });
          }
          else {
            return res.status(200).json({ success: 1, data: finalData });
          }

        })



      }
    });
  },

  getCustomerInformation: (req, res) => {
   
    const body = req.body;
    console.log(body)
    getCustomerInformation(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "No Data found"
        });
      } else {  
       

        res.json({
          ID:{
            title: "ID",
            value:results[0].t_vc_rzpayID
          },
          name: {
            title: "fullname",
            value: results[0].t_vc_firstname
          },
          username: {
            title: "username",
            value: results[0].t_vc_email
          },
          role: {
            title: "role",
            value: "student"
          },
          status: {
            title: "status",
            value: "approved"
          },
          email: {
            title: "email",
            value: results[0].t_vc_email
          },
          phone: {
            title: "phone",
            value: results[0].t_nu_phone
          },
          address: {
            title: "address",
            value: results[0].t_vc_address
          },
          social: [
            {
              type: "url",
              title: "facebook",
              value: results[0].t_vc_facebook
            },
            {
              type: "url",
              title: "twitter",
              value: results[0].t_vc_twitter
            },
            {
              type: "url",
              title: "linkedin",
              value: results[0].t_vc_linkedin
            },
            {
              type: "url",
              title: "instagram",
              value: results[0].t_vc_instagram
            }
          ],
          avatar: {
            src: results[0].t_vc_profilephoto,
            alt: "avatar"
          }

        })


      }
    });
  },
  getPaymentDetailsByEmail: (req, res) => {
   
    const body = req.body;
   
    getPaymentDetailsByEmail(body, (err, results) => {
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
  getRefundDetailsByEmail: (req, res) => {
   
    const body = req.body;
   
    getRefundDetailsByEmail(body, (err, results) => {
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
  getRegisteredCourseDetailsByEmail: (req, res) => {
   
    const body = req.body;
   
    getRegisteredCourseDetailsByEmail(body, (err, results) => {
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
  razorPayGetAllCustomers: (req, res) => {


    razorPayGetAllCustomers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Razor Pay API Error"
        });
      }


      function addKeyValue(obj, key, data) {
        obj[key] = data;

      }
      let newinfo = results.items.map(function (person) {

        return addKeyValue(person, 'status', 'Pending');
      });

      return res.status(200).json({ success: 1, data: results });
    });
  },

  razorPayUpdateCustomer: (req, res) => {
    const body = res.body;

    razorPayUpdateCustomer(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "RazorPay Error - UpdateCustomer"
        });
      }

      return res.status(200).json({ success: 1, data: results });
    });
  },

  InsertNewCustomer: (req, res) => {
    const body = req.body;

    InsertNewCustomer(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  InsertCustomerInformation: (req, res) => {
    const body = req.body;

    InsertCustomerInformation(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  razorpayPaymentDetailsWebHook: (req, res) => {
    const body = req.body;
    let email = "";
    let phone = "";
    let name = "";
    let customerid = "";
    if (body.payload.payment.entity.status === 'captured') {
      name = body.payload.payment.entity.notes.name;
      email = body.payload.payment.entity.email;
      phone = body.payload.payment.entity.contact;

      const paybody = {
        paymentid: body.payload.payment.entity.id,
        entity: body.payload.payment.entity.entity,
        amount: body.payload.payment.entity.amount,
        currency: body.payload.payment.entity.currency,
        status: body.payload.payment.entity.status,
        order_id: body.payload.payment.entity.order_id,
        invoice_id: body.payload.payment.entity.invoice_id,
        international: body.payload.payment.entity.international,
        method: body.payload.payment.entity.method,
        amount_refunded: body.payload.payment.entity.amount_refunded,
        refund_status: body.payload.payment.entity.refund_status,
        captured: body.payload.payment.entity.captured,
        description: body.payload.payment.entity.description,
        card_id: body.payload.payment.entity.card_id,
        bank: body.payload.payment.entity.bank,
        wallet: body.payload.payment.entity.wallet,
        vpa: body.payload.payment.entity.vpa,
        email: body.payload.payment.entity.email,
        contact: body.payload.payment.entity.contact,
        fee: body.payload.payment.entity.fee,
        tax: body.payload.payment.entity.tax,
        error_code: body.payload.payment.entity.error_code,
        error_description: body.payload.payment.entity.error_description,
        error_source: body.payload.payment.entity.error_source,
        error_step: body.payload.payment.entity.error_step,
        error_reason: body.payload.payment.entity.error_reason,
        created_at: body.payload.payment.entity.created_at,
        card_trans_id: body.payload.payment.entity.card.id,
        name: body.payload.payment.entity.notes.name,
        last4: body.payload.payment.entity.card.last4,
        network: body.payload.payment.entity.card.network,
        type: body.payload.payment.entity.card.type,
        issuer: body.payload.payment.entity.card.issuer,
        international: body.payload.payment.entity.card.international,
        emi: body.payload.payment.entity.card.emi,
        sub_type: body.payload.payment.entity.card.sub_type,
        token_iin: body.payload.payment.entity.card.token_iin,
        notes_id: body.payload.payment.entity.id,
        phone: body.payload.payment.entity.contact,
        courseid: body.payload.payment.entity.notes.course_id
      };

      InsertPaymentDetails(paybody, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            data: "RazorPay Error - Insert Payment Details"
          });
        }
      })

      razorPayGetAllCustomers((err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            data: "RazorPay Error - GetAllCustomers"
          });
        }

        results.items.forEach(element => {

          if (element.email === email && element.contact === phone) {
            let custdata =
            {
              rzPayID: element.id,
              entity: element.entity,
              customername: element.name,
              customerEmail: element.email,
              customerPhonenumber: element.contact,
              gstin: element.gstin
            }

            InsertNewCustomer(custdata, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  data: "RazorPay Error - InsertNewCustomer"
                });
              }


            });


            razorPayUpdateCustomer(custdata.rzPayID, { name: name }, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  data: "RazorPay Error - UpdateCustomer"
                });
              }

              return res.status(200).json({ success: 1, data: results });
            });

          }
        });


      });



    }
    else {
      return res.status(500).json({
        success: 0,
        data: "RazorPay Error - Payment Confirmation"
      });
    }

  },
  UpdateCustomerStatus: (req, res) => {
    const body = req.body;

    UpdateCustomerStatus(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  SyncCustomers: (req, res) => {

    razorPayGetAllCustomers((err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "RazorPay Error - GetAllCustomers"
        });
      }



      results.items.forEach(async element => {


        let custdata =
        {
          rzPayID: element.id,
          entity: element.entity,
          customername: element.name,
          customerEmail: element.email,
          customerPhonenumber: element.contact,
          gstin: element.gstin
        }

        InsertNewCustomer(custdata, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              data: "RazorPay Error - InsertNewCustomer"
            });
          }


        });


      });


    });


  },

  SyncPayments: (req, res) => {

    razorPayGetAllPayments((err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "RazorPay Error - GetAllCustomers"
        });
      }     

      results.items.forEach(element => {
        const paybody = {
          paymentid:element.id,
          entity:element.entity,
          amount:element.amount,
          currency:element.currency,
          status:element.status,
          order_id:element.order_id,
          invoice_id:element.invoice_id,
          international:element.international,
          method:element.method,
          amount_refunded:element.amount_refunded,
          refund_status:element.refund_status,
          captured:element.captured,
          description:element.description,
          card_id:element.card_id,
          bank:element.bank,
          wallet:element.wallet,
          vpa:element.vpa,
          email:element.email,
          contact:element.contact,
          fee:element.fee,
          tax:element.tax,
          error_code:element.error_code,
          error_description:element.error_description,
          error_source:element.error_source,
          error_step:element.error_step,
          error_reason:element.error_reason,
          created_at:element.created_at,
          card_trans_id:element.card.id,
          name:element.notes.name,
          last4:element.card.last4,
          network:element.card.network,
          type:element.card.type,
          issuer:element.card.issuer,
          international:element.card.international,
          emi:element.card.emi,
          sub_type:element.card.sub_type,
          token_iin:element.card.token_iin,
          notes_id:element.id,
          phone:element.contact,
          courseid:element.notes.course_id
        };
  
        InsertPaymentDetails(paybody, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              data: "RazorPay Error - Insert Payment Details"
            });
          }
        })
        })
      

    });


  },

  SyncRefunds: (req, res) => {

    razorPayGetAllRefunds((err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "RazorPay Error - GetAllRefunds"
        });
      }     

      results.items.forEach(element => {
        const paybody = {
          id:element.id,
          entity:element.entity,
          amount:element.amount,
          currency:element.currency,
          payment_id:element.payment_id,
          comment:element.notes.comment,
          receipt:element.receipt,
          arn:element.acquirer_data.arn,
          created_at:element.created_at,
          batch_id:element.batch_id,
          status:element.status,
          speed_processed:element.speed_processed,
          speed_requested:element.speed_requested
        };
  
        InsertRefundDetails(paybody, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              data: "RazorPay Error - Insert Refund Details"
            });
          }
        })
        })
      

    });


  },
  SyncOrders: (req, res) => {

    razorPayGetAllOrders((err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "RazorPay Error - GetAllOrders"
        });
      }     

      results.items.forEach(element => {
        const paybody = {
          id : element.id,
          entity:element.entity,
          amount: element.amount,
          amount_paid : element.amount_paid ,
          amount_due : element.amount_due,
          currency : element.currency,
          receipt : element.receipt,
          offer_id :element.offer_id,
          status : element.status,
          attempts : element.attempts,
          notes_name : element.notes.name,
          notes_email: element.notes.email,
          notes_phone : element.notes.phone,
          notes_course_id : element.notes.course_id,
          created_at : element.created_at
        };
  
        InsertOrderDetails(paybody, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              data: "RazorPay Error - Insert Order Details"
            });
          }
        })
        })
      

    });


  }
}
