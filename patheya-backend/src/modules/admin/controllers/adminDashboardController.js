const adminDashboardService = require(
    '../services/adminDashboardService'
  );
  
  const getDashboard = async (req, res) => {
    try {
      const data =
        await adminDashboardService.getDashboardStats();
  
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  module.exports = {
    getDashboard,
  };