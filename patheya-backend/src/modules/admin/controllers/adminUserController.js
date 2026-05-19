const adminUserService = require(
    '../services/adminUserService'
  );
  
  const getUsers = async (req, res) => {
    try {
      const users =
        await adminUserService.getUsers(req.query);
  
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const toggleUserBlock = async (
    req,
    res
  ) => {
    try {
      const user =
        await adminUserService.toggleUserBlock(
          req.params.id
        );
  
      res.status(200).json({
        success: true,
        message: user.isBlocked
          ? 'User blocked successfully'
          : 'User unblocked successfully',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  module.exports = {
    getUsers,
    toggleUserBlock,
  };