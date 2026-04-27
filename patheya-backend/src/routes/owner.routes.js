router.post('/orders/:id/status', auth, ownerOnly, async (req, res) => {
    const { status } = req.body;
  
    const order = await Order.findById(req.params.id);
  
    order.status = status;
  
    await order.save();
  
    res.json(order);
  });