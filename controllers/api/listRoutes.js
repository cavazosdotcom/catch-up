const router = require("express").Router();
const { List, Media, MediaList } = require('../../models');

router.get('/', async (req, res) => {
    
    try {

        const listData = await List.findAll({
          include: [{ model: Media, through: MediaList }],
        });
    
        res.status(200).json( listData );
    
      } catch (err) {
    
        res.status(400).json(err);
      }
});

router.get("/:user_id", async (req, res) => {
  const listData = await List.findAll({
    where: {
      user_id: req.params.user_id
    },
    include: [{model: Media}]
  });
  res.status(200).json(listData[0].media);
});


module.exports = router;