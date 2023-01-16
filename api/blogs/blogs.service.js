const pool = require("../../config/database");

module.exports = {
  createBlog: (data, callBack) => {
    pool.query(
      `call usp_ins_tx_blogs(?,?,?,?,?,?)`,
      [
        data.catID,
        data.createdBy,
        data.title,
        data.img,
        data.contents,
        data.type
        
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  CreateComments: (data, callBack) => {
  
    pool.query(
      `call usp_ins_blogcomments(?,?,?)`,
      [
        data.BlogID,
        data.comments,
        data.commentedBy
        
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  createCategory: (data, callBack) => {
    pool.query(
      `call usp_ins_blogcategory(?,?)`,
      [
        data.categoryname,
        data.createdBy
        
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getComments: (BlogID, callBack) => {


 
    pool.query(
      `call usp_get_tx_blogscomments(?)`,
      [BlogID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        
        return callBack(null, results[0]);
      }
    );
  },

  getBlogs: (catID,username,recCount,perpage, callBack) => {


 
    pool.query(
      `call usp_get_tx_blogs(?,?,?,?)`,
      [catID, username, recCount, perpage],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        
        return callBack(null, results[0]);
      }
    );
  },
  getTotalBlogs: (catID,username,recCount, callBack) => {
    
    pool.query(
      `call usp_get_tx_blogs_TotalRecords(?,?,?)`,
      [catID, username, recCount],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        
        return callBack(null, results[0]);
      }
    );
  },
  getBlogCategories: (callBack) => {


 
    pool.query(
      `call usp_get_tx_blogs_categories()`,
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        
        return callBack(null, results[0]);
      }
    );
  },

  insertreactions:(data,callBack) =>{
   
    pool.query(
      `call usp_ins_tx_blogs_reacts(?,?,?,?,?,?)`,
      [data.BlogID, data.likes, data.love, data.funny, data.sad, data.info],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        
        return callBack(null, results[0]);
      }
    );
  },

  getBlogreactions: (data,callBack) => {



    pool.query(
      `call usp_get_tx_blogsreacts(?)`,
      [data.BlogID],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        
        return callBack(null, results[0]);
      }
    );
  },
};
