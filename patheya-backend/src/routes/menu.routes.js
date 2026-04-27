const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// GET menu
router.get('/:restaurantId', async (req, res) => {
  try {

    const items = await MenuItem.find({
      restaurantId: req.params.restaurantId
    });

    res.json(items);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD item
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {

    const user = req.user;

    const item = await MenuItem.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      restaurantId: user.restaurantId, // 🔥 now works
      image: req.file?.filename
    });

    res.json(item);

  } catch (err) {
    console.error('POST ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {

    console.log('USER:', req.user);
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // TEMP: skip ownership check
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: req.file?.filename || item.image
      },
      { new: true }
    );

    res.json(updatedItem);

  } catch (err) {
    console.error('PUT ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});
// 🗑 DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;