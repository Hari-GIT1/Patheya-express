const Order =
  require('../../../models/Order');

const BaseService =
  require(
    '../../../core/services/BaseService'
  );

const ApiFeatures =
  require(
    '../../../core/query/apiFeatures'
  );

class OrderService
extends BaseService {

  constructor() {

    super(Order);

  }

  // ==========================
  // GET ORDERS
  // ==========================

  async getOrders(query = {}) {

    const {

      populate = false

    } = query;

    let features =
      new ApiFeatures(

        Order.find(),

        query

      )

      .filter()

      .search([
        'orderNumber'
      ])

      .sort()

      .limitFields()

      .paginate();

    // ========================
    // POPULATE
    // ========================

    if (populate === 'true') {

      features.query =
        features.query

        .populate(
          'userId',
          'name email'
        )

        .populate(
          'restaurantId',
          'name'
        )

        .populate(
          'deliveryPartnerId',
          'name phone'
        );

    }

    const orders =
      await features.query;

    const total =
      await Order.countDocuments();

    return {

      orders,

      pagination: {

        total,

        page:
          Number(query.page) || 1,

        limit:
          Number(query.limit) || 10,

        pages:
          Math.ceil(

            total /

            (Number(query.limit) || 10)

          )

      }

    };

  }

  // ==========================
  // CREATE ORDER
  // ==========================

  async createOrder(

    userId,

    orderData

  ) {

    const subtotal =
      orderData.items.reduce(

        (acc, item) => {

          return (

            acc +

            (
              item.price *
              item.quantity
            )

          );

        },

        0

      );

    const deliveryFee =
      orderData.deliveryFee || 0;

    const tax =
      orderData.tax || 0;

    const discount =
      orderData.discount || 0;

    const grandTotal =

      subtotal +

      deliveryFee +

      tax -

      discount;

    return await this.create({

      userId,

      restaurantId:
        orderData.restaurantId,

      items:
        orderData.items,

      pricing: {

        subtotal,

        deliveryFee,

        tax,

        discount,

        grandTotal

      },

      total:
        grandTotal,

      orderType:

        orderData.orderType ||

        'delivery',

      address:
        orderData.address || '',

      deliveryAddress:

        orderData.deliveryAddress ||

        {},

      customer: {

        name:

          orderData.customer
            ?.name || '',

        email:

          orderData.customer
            ?.email || '',

        phone:

          orderData.customer
            ?.phone || ''

      },

      status:
        'placed',

      statusTimeline: [

        {
          status:
            'placed'
        }

      ]

    });

  }

  // ==========================
  // PARTNER ORDERS
  // ==========================

  async getPartnerOrders(
    restaurantId
  ) {

    return await this.find({

      restaurantId

    });

  }

  // ==========================
  // USER ORDERS
  // ==========================

  async getUserOrders(
    userId
  ) {

    return await this.find({

      userId

    });

  }

}

module.exports =
  new OrderService();