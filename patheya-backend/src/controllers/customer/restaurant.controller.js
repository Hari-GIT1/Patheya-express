const Restaurant = require('../../models/Restaurant');


// GET ALL RESTAURANTS
exports.getRestaurants = async (req, res) => {

  try {

    const restaurants =
      await Restaurant.find();

    res.json(restaurants);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};