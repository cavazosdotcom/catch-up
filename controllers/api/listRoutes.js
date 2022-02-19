const router = require("express").Router();
const { List, Media, MediaList} = require('../../models');

router.get('/', async (req, res) => {
    
    try {

        const listData = await List.findAll({
          include: [{ model: Media, through: MediaList }],
        });
    
        res.status(200).json( listData );
    
      } catch (err) {
    
        res.status(400).json(err);
      }
      })
module.exports = router;