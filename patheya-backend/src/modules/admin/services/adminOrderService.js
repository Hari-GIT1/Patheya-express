const queryService =
  require(
    '../../../services/query.service'
  );

// ==============================
// GET ORDERS
// ==============================

exports.getOrders =
async (query) => {

  return await queryService
    .getOrders({

      ...query,

      populate: 'true'

    });

};

// ==============================
// LIVE ORDERS
// ==============================

exports.getLiveOrders =
async () => {

  return await queryService
    .getOrders({

      statusIn:
        'placed,accepted,preparing,out_for_delivery',

      populate: 'true',

      limit: 50

    });

};