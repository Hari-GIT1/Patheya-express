const Order =
  require('../../modules/order/models/Order');

const {

  buildOrderQuery

} = require(
  '../../core/query/queryBuilder'
);
// ==============================
// UNIVERSAL ORDER QUERY
// ==============================

exports.getOrders =
async (query = {}) => {

  const {

    page = 1,

    limit = 10,

    sort = '-createdAt',

    populate = false

  } = query;

  const skip =

    (page - 1) * limit;

  const filters =
    buildOrderQuery(query);

  // ==========================
  // BASE QUERY
  // ==========================

  let mongoQuery =
    Order.find(filters)

    .sort(sort)

    .skip(skip)

    .limit(Number(limit));

  // ==========================
  // POPULATE
  // ==========================

  if (populate === 'true') {

    mongoQuery =
      mongoQuery

      .populate(
        'userId',
        'name email'
      )

      .populate(
        'restaurantId',
        'name'
      );

  }

  // ==========================
  // EXECUTE
  // ==========================

  const orders =
    await mongoQuery;

  const total =
    await Order.countDocuments(
      filters
    );

  return {

    orders,

    pagination: {

      total,

      page:
        Number(page),

      limit:
        Number(limit),

      pages:
        Math.ceil(
          total / limit
        )

    }

  };

};