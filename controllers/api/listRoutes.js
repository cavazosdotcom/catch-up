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
  console.log(list);
  const result = await list.addMedia(req.params.media_id);
  console.log(result);
  if(result){
    return res.status(201).json(result);
  }
  res.status(406).json({error: "Item is already in your list."})
});

module.exports = router;