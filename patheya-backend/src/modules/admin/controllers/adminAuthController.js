const adminAuthService = require('../services/adminAuthService');

const getMe = async (req, res) => {
    res.status(200).json({
      success: true,
      data: req.admin,
    });
  };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await adminAuthService.loginAdmin(
      email,
      password
    );

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
  getMe,
};