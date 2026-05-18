const Discount =
  require('../../models/discount');


// CREATE DISCOUNT
exports.createDiscount = async (req, res) => {

  try {

    const discount =
      await Discount.create(req.body);

    res.json(discount);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// GET DISCOUNTS
exports.getDiscounts = async (req, res) => {

  try {

    const discounts =
      await Discount.find();

    res.json(discounts);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};