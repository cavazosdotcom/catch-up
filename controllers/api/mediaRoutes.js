const router = require("express").Router();
const { Media } = require('../../models');


router.get('/', async (req, res) => {
    
    try {

      const mediaData = await Media.findAll();
  
      res.status(200).json( mediaData );

    } catch (err) {

      res.status(400).json(err);

    }
  });













module.exports = router;