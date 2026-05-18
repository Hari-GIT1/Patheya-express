const MenuItem = require('../../models/MenuItem');


// GET PARTNER MENU
exports.getPartnerMenu = async (req, res) => {

  try {

    const items = await MenuItem.find({
      restaurantId: req.user.restaurantId
    });

    res.json(items);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// GET CUSTOMER MENU
exports.getRestaurantMenu = async (req, res) => {

  try {

    const items = await MenuItem.find({
      restaurantId: req.params.restaurantId
    });

    res.json(items);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// ADD MENU ITEM
exports.addMenuItem = async (req, res) => {

  try {

    const user = req.user;

    const item = await MenuItem.create({

      name: req.body.name,

      price: req.body.price,

      category: req.body.category,

      restaurantId: user.restaurantId,

      image: req.file?.filename

    });

    res.json(item);

  } catch (err) {

    console.error('POST ERROR:', err);

    res.status(500).json({
      error: err.message
    });

  }

};


// UPDATE MENU ITEM
exports.updateMenuItem = async (req, res) => {

  try {

    console.log('USER:', req.user);

    console.log('BODY:', req.body);

    console.log('FILE:', req.file);

    const item =
      await MenuItem.findById(
        req.params.id
      );

    if (!item) {

      return res.status(404).json({
        error: 'Item not found'
      });

    }

    const updatedItem =
      await MenuItem.findByIdAndUpdate(

        req.params.id,

        {
          ...req.body,
          image:
            req.file?.filename ||
            item.image
        },

        { new: true }

      );

    res.json(updatedItem);

  } catch (err) {

    console.error('PUT ERROR:', err);

    res.status(500).json({
      error: err.message
    });

  }

};


// DELETE MENU ITEM
exports.deleteMenuItem = async (req, res) => {

  try {

    await MenuItem.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Deleted'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// UPDATE AVAILABILITY
exports.updateAvailability = async (req, res) => {

  try {

    console.log('PARAMS ID:', req.params.id);

    console.log('BODY:', req.body);

    const updatedItem =
      await MenuItem.findByIdAndUpdate(

        req.params.id,

        {
          isAvailable:
            req.body.isAvailable
        },

        {
          new: true
        }

      );

    console.log('UPDATED ITEM:', updatedItem);

    res.json(updatedItem);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};