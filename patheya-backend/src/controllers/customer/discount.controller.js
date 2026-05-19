const Discount =
  require('../../models/discount');

const asyncHandler =
  require(
    '../../utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../utils/response'
);

// ==============================
// CREATE DISCOUNT
// ==============================
exports.createDiscount =
asyncHandler(async (

  req,

  res

) => {

  const discount =
    await Discount.create(
      req.body
    );

  successResponse(

    res,

    discount,

    'Discount created'

  );

});

// ==============================
// GET DISCOUNTS
// ==============================
exports.getDiscounts =
asyncHandler(async (

  req,

  res

) => {

  const discounts =
    await Discount.find();

  successResponse(

    res,

    discounts,

    'Discounts fetched'

  );

});