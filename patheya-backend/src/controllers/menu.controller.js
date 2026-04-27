exports.addMenuItem = async (req, res) => {
    const { name, price, category, restaurantId } = req.body;
  
    if (!restaurantId) {
      return res.status(400).json({ message: 'RestaurantId missing' });
    }
  
    const restaurant = await Restaurant.findById(restaurantId);
  
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
  
    restaurant.menu.push({ name, price, category });
  
    await restaurant.save();
  
    res.json({ message: 'Menu item added' });
  };
  exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, category } = req.body;
  
    const restaurant = await Restaurant.findOne({ "menu._id": id });
  
    if (!restaurant) return res.status(404).json({ message: 'Item not found' });
  
    const item = restaurant.menu.id(id);
    item.name = name;
    item.price = price;
    item.category = category;
  
    await restaurant.save();
  
    res.json({ message: 'Updated' });
  };
  exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;
  
    const restaurant = await Restaurant.findOne({ "menu._id": id });
  
    if (!restaurant) return res.status(404).json({ message: 'Item not found' });
  
    restaurant.menu = restaurant.menu.filter(i => i._id.toString() !== id);
  
    await restaurant.save();
  
    res.json({ message: 'Deleted' });
  };