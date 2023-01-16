const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  razorPayGetAllCustomers,
  InsertNewCustomer, razorpayPaymentDetailsWebHook, createUserLogin, getAllCustomers,UpdateCustomerStatus, SyncCustomers, SyncPayments,
  SyncRefunds, SyncOrders, getPaymentDetailsByEmail, getRefundDetailsByEmail,getRegisteredCourseDetailsByEmail,
  getCustomerInformation, InsertCustomerInformation
} = require("../customers/customer.controller");

router.get("/razorPayGetAllCustomers", razorPayGetAllCustomers);
router.post("/InsertNewCustomer", InsertNewCustomer);
router.post("/razorpayPaymentDetailsWebHook", razorpayPaymentDetailsWebHook)
router.post("/createUser", createUserLogin);
router.post("/UpdateCustomerStatus", checkToken, UpdateCustomerStatus);
router.get("/SyncCustomers", SyncCustomers);
router.get("/SyncPayments", SyncPayments);
router.get("/SyncRefunds", SyncRefunds);
router.get("/SyncOrders", SyncOrders);
router.post("/getAllCustomers", getAllCustomers)
router.post("/getPaymentDetailsByEmail", getPaymentDetailsByEmail)
router.post("/getRefundDetailsByEmail", getRefundDetailsByEmail)
router.post("/getRegisteredCourseDetailsByEmail", getRegisteredCourseDetailsByEmail)
router.post("/getCustomerInformation",getCustomerInformation)
router.post("/InsertCustomerInformation",InsertCustomerInformation)
module.exports = router;
