const {
  getBlogs,
  createBlog,
  createCategory,
  getTotalBlogs,
  getBlogCategories,
  CreateComments,
  getComments,
  insertreactions,
  getBlogreactions
} = require("./blogs.service");

module.exports = {
  CreateComments: (req, res) => {
    const body = req.body;
    CreateComments(body, (err, results) => {
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
  getComments: (req, res) => {
    const BlogID = req.params.BlogID;
  

    getComments(BlogID, (err, results) => {
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
  createBlog: (req, res) => {
    const body = req.body;

    createBlog(body, (err, results) => {
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
  createCategory: (req, res) => {
    const body = req.body;

    createCategory(body, (err, results) => {
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
  getBlogs: (req, res) => {
    const catID = req.params.catID;
    const username = req.params.username;
    const recCount = req.params.recCount;
    const page = req.params.page;
    let TotalRecordsArr = [];
    let TotalRecords = 0;
    // limit as 20
    const limit = 6;
    // page number
    console.log(page)

    // calculate offset
    const offset = (page - 1) * limit;

    const perpage = "limit " + limit + " OFFSET " + offset;


    getTotalBlogs(catID, username, recCount, (err, results) => {
      if (err) {
        TotalRecordsArr = [];
      }
  
        TotalRecordsArr = JSON.parse(JSON.stringify(results))
        
        TotalRecords = TotalRecordsArr[0].TotalRecords;
        
        TotalRecords = Math.ceil(TotalRecords / limit);
        
        getBlogs(catID, username, recCount, perpage, (err, results) => {
          if (err) {
            var jsonResult = {
              totalBlogs: 0,
              currentPage: 0,
              results: [],
              status: 0,
              message: "Error",
              totalPages: 0,
              totalRecords: TotalRecordsArr[0].TotalRecords
            };
            console.log(err);
            return res.status(500).json(jsonResult);
          }

         
          var jsonResult = {
            totalBlogs: results.length,
            currentPage: page,
            items: results,
            status: 1,
            totalPages: TotalRecords,
            message: "Success",
            totalRecords: TotalRecordsArr[0].TotalRecords
          };
    
          return res.json(jsonResult);
        });
        
    });
  

   
  },
  getBlogCategories: (req, res) => {
    

    getBlogCategories((err, results) => {
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

  insertreactions:(req,res) => {
    const body = req.body;
    insertreactions(body,(err, results) => {
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
  getBlogreactions: (req, res) => {
    
    const body = req.body;
   
    getBlogreactions(body,(err, results) => {
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

};
