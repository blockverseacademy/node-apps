require("dotenv").config();

const express = require("express");
const axios = require('axios');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path')

//const schedule = require('node-schedule');
const app = express();
const userRouter = require("./api/users/user.router");
const pdRouter = require("./api/details/pd.router");
const edRouter = require("./api/details/ed.router");
const idRouter = require("./api/details/id.router");
const ppRouter = require("./api/details/pp.router");
const csRouter = require("./api/details/cs.router");
const caRouter = require("./api/details/ca.router");
const supportRouter = require("./api/support/support.router");
const studentRouter = require("./api/student/student.router");
const courseRouter = require("./api/course/course.router");
const notificationRouter = require("./api/notifications/notification.router");
const blogsRouter = require("./api/blogs/blogs.router");
const uploadRouter = require("./api/upload/upload.router");
const razorpayRouter = require("./api/customers/customer.router")
// Then pass these options to cors:
var allowedOrigins = [
  "https://www.blockverseacademy.com",
  "http://www.blockverseacademy.com",
  "https://blockverseacademy.com",
  "http://blockverseacademy.com",
  "http://ammoviaa.com",
  "http://www.ammoviaa.com",
  "https://www.ammoviaa.com/",
  "https://www.blockverseacademy.com/",
  "http://localhost:3000",
  "http://localhost:3001"
];
app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use(express.json());
app.use(fileUpload());
app.use("/api/support", supportRouter);
app.use("/api/details/pd", pdRouter);
app.use("/api/details/ed", edRouter);
app.use("/api/details/id", idRouter);
app.use("/api/details/pp", ppRouter);
app.use("/api/details/cs", csRouter);
app.use("/api/details/ca", caRouter);
app.use("/api/users", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/course", courseRouter);
app.use("/api/notification", notificationRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/upload", uploadRouter)
app.use("/api/customers/rzpay",razorpayRouter)

app.use('/api/upload/files', express.static(path.join(__dirname, '/api/upload/files')))
// app.post('/api/upload', function(req, res) {
//   console.log('hi')
//   let sampleFile;
//   let uploadPath;

//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   sampleFile = req.files.sampleFile;
//   uploadPath = __dirname + '/files/' + sampleFile.name;

//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv(uploadPath, function(err) {
//     if (err)
//       return res.status(500).send(err);

//     res.send('File uploaded!');
//   });
// });




const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});


/******************************************** */ 
/* Starts Here - Get All customers from Razor Pay */
 /******************************************** */ 
// const rule = new schedule.RecurrenceRule();
// rule.second = 20;
// const job = schedule.scheduleJob(rule, async function(){
//   console.log('The answer to life, the universe, and everything!');
//   await axios.get("http://localhost:" + port + "/api/customers/rzpay/SyncCustomers", function (req, res) { console.log(res)});
 

//  });
 /******************************************** */ 
/* Ends Here - Get All customers from Razor Pay */
 /******************************************** */ 