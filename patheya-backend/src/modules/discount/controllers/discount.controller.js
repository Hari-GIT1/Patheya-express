const asyncHandler =
  require(
    '../../../core/utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../../core/responses/response'
);

const discountService =
  require(
    '../services/discount.service'
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
    await discountService
      .createDiscount(

        req.user,

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
    await discountService
      .getDiscounts(
        req.query
      );

  successResponse(

    res,

    discounts,

    'Discounts fetched'

  );

});