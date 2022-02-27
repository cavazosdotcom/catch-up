const router = require("express").Router();
const { Media, Image } = require('../../models');
const upload = require("../../config/upload");
const path = require("path")

router.get("/", async (req, res) => {
  try {
    const allMedia = await Media.findAll({
      include: [{model: Image}]
    });

    res.status(200).json(allMedia);
  } catch (err) {
    res.status(400).json(err);
  }
});

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

router.post("/image", upload.single("image"), async (req, res) => {
  try{
    console.log("File: " + req.file)
    if(!req.file){
      throw new Error("File must be uploaded.");
    }
    console.log(req.file.filename);
    const newImage = Image.create({
      medium_id: req.body.id,
      file_src: req.file.filename
    });
    if(!newImage){
      res.status(500).json({error: "Failed to upload"});
    }
    res.status(201).json(newImage);
  }catch(error){
    console.log(error);
    res.status(400).json(error);
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