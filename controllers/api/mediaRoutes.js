const router = require("express").Router();
const { Media, User, List } = require('../../models');



router.post('/', async (req, res) => {
  try {
    const newMedia = await Media.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMedia);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a media by its `id` value
  try {
    const mediaData = await Media.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    if ( !mediaData ) {
      res.status(404).json({ message: 'No media found with this id!' });
      return;
    }

    res.status(200).json( mediaData );

  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a media by its `id` value
  try {
    const mediaData = await Media.destroy({
      where: {
        id: req.params.id,
      },
    });

    if ( !mediaData ) {
      res.status(404).json({ message: 'No media found with this id!' });
      return;
    }

    res.status(200).json( mediaData );
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;