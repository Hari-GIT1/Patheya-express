const express = require('express');

const router = express.Router();

const Discount = require('../models/discount');

// CREATE
router.post('/', async (req, res) => {

  try {

    const discount = await Discount.create(req.body);

    res.json(discount);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// GET
router.get('/', async (req, res) => {

  try {

    const discounts = await Discount.find();

    res.json(discounts);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;