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

router.post("/:media_id", async (req, res) => {
  const list = await List.findOne({
    where: {
      user_id: req.session.user_id
    }
  });
  const result = await list.addMedia(req.params.media_id);
  if(result){
    return res.status(201).json(result);
  }
  res.status(406).json({error: "Item is already in your list."})
});

router.delete("/:media_id", async (req, res) => {
  try{
    const list = await List.findOne({
      where: {
        user_id: req.session.user_id
      }
    });
    const result = await MediaList.destroy({
      where: {
        list_id: list.id,
        medium_id: req.params.media_id,
      }
    });
    if(!result){
      return res.status(404).json({error: "Failed to find list entry."});
    }
    res.status(200).json(result);
  }catch(error){
    res.status(500).json({error});
  }
  
});

module.exports = router;