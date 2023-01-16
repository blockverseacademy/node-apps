const axios = require("axios");
const pool = require("../../config/database");

module.exports = {
  uploadfile: (sampleFile,uploadPath, callBack) => {
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
      if (err) return  callBack(err);

      return callBack(null, "File Uploaded");
    });
  }
};
