const { getNotifications } = require("./notification.service");

module.exports = {
  getNotifications: (req, res) => {
    getNotifications((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results)
      return res.status(200).json({ success: 1, data: results });
    });
  }
};
