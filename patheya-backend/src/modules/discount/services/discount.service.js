const Discount =
  require(
    '../../discount/models/Discount'
  );

const ApiError =
  require(
    '../../../core/errors/ApiError'
  );

const cacheService =
  require(
    '../../../core/cache/cache.service'
  );

// ==============================
// CREATE DISCOUNT
// ==============================

exports.createDiscount =
async (

  user,

  body

) => {

  // ==========================
  // VALIDATION
  // ==========================

  if (

    !body.code ||

    !body.percentage

  ) {

    throw new ApiError(

      400,

      'Discount code and percentage required'

    );

  }

  // ==========================
  // CHECK EXISTING
  // ==========================

  const existingDiscount =
    await Discount.findOne({

      code:
        body.code

    });

  if (existingDiscount) {

    throw new ApiError(

      400,

      'Discount code already exists'

    );

  }

  // ==========================
  // CREATE
  // ==========================

  const discount =
    await Discount.create({

      ...body,

      ownerId:
        user._id,

      restaurantId:
        user.restaurantId

    });

  // ==========================
  // CLEAR CACHE
  // ==========================

  await cacheService.del(
    'discounts'
  );

  return discount;

};

// ==============================
// GET DISCOUNTS
// ==============================

exports.getDiscounts =
async () => {

  // ==========================
  // CACHE
  // ==========================

  const cached =
    await cacheService.get(
      'discounts'
    );

  if (cached) {

    return cached;

  }

  // ==========================
  // FETCH
  // ==========================

  const discounts =
    await Discount.find()

      .sort('-createdAt');

  // ==========================
  // STORE CACHE
  // ==========================

  await cacheService.set(

    'discounts',

    discounts,

    300

  );

  return discounts;

};