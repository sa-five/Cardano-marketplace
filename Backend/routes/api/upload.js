const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

////////////////////////////////////////////////////////////////////////////
////////////////////////////IMAGE UPLOAD///////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const fileStorage = multer.diskStorage({
  // Destination to store image
  destination: 'upload',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  }
});

const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1 * 1000 * 1000 * 1000 * 100 // 1 * 1000 * 1000 * 1000 * 100 Bytes = 100GB
  }
});

// @route    POST api/upload/file/:streamer_id
// @desc     Upload Single Image
// @access   Public
router.post(
  '/file',
  fileUpload.single('file'),
  function (req, res) {
    res.json(req.file.filename);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
