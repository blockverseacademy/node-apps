const { uploadfile } = require("./upload.service");

module.exports = {
  uploadfile: (req, res) => {
  
    
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
   

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.selectedFile;
    uploadPath = __dirname + "/files/" + req.files.selectedFile.name;
   
    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).json({
          success: 0,
          data: "Database connection errror"
        });
      }

      return res.status(200).json({ success: 1, data: "File Uploaded" });
    });
    
  }
};
