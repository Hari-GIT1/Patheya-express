const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// GET all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/', async (req, res) => {
  try {

    const restaurants = await Restaurant.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'restaurantId',
          as: 'orders'
        }
      },
      {
        $addFields: {
          avgRating: { $avg: '$orders.rating' },
          totalRatings: {
            $size: {
              $filter: {
                input: '$orders',
                as: 'o',
                cond: { $gt: ['$$o.rating', 0] }
              }
            }
          }
        }
      },
      {
        $project: {
          name: 1,
          cuisines: 1,
          avgRating: { $ifNull: ['$avgRating', 0] },
          totalRatings: 1
        }
      }
    ]);

    res.json(restaurants);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

module.exports = router;