const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Artwork = require('../../models/Artwork');
const User = require('../../models/User');

// @route    GET api/artworks
// @desc     Get all artworks
// @access   Private
router.get('/', async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ created_at: -1 });
    res.status(200).json(artworks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/artworks/sort
// @desc     Get all artworks
// @access   Public
router.get('/sort', async (req, res) => {
  try {
    const artworks = await Artwork.find().sort(req.body);
    res.status(200).json(artworks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/artworks/search
// @desc     Get all artworks
// @access   Public
router.get('/search', async (req, res) => {
  try {
    let query = req.body;
    for (key in query) {
      query[key] = { $regex: query[key] };
    }
    const artworks = await Artwork.find(query);
    res.status(200).json(artworks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/artworks
// @desc     Create & Update a artwork
// @access   Private
router.post(
  '/',
  auth,
  // check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newArtwork = new Artwork({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        rating: req.body.rating,
        url: req.body.url,
        user: req.user.id
      });

      const artwork = await newArtwork.save();

      res.json(artwork);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/artworks/:id
// @desc     Update by artwork ID
// @access   Private
router.post('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    let artwork = await Artwork.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        rating: req.body.rating,
        url: req.body.url
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(artwork);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/artworks
// @desc     Delete artwork
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    Artwork.findByIdAndDelete(req.params.id, function (err, docs) {
      if (err) {
        res.status(500).json({ msg: 'Server error' });
      } else {
        res.status(200).json({ msg: 'Artwork deleted.' });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
