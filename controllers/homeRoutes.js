const router = require("express").Router();
const { User, Media, List, MediaList } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", withAuth, async (req, res) => {
//     const list = require("../seeds/mediaData.json");
//     res.render("list", {logged_in: req.session.logged_in, list});
// });

// router.get("/media", withAuth, async (req, res) => {
//     res.render("media", {logged_in: req.session.logged_in});
// })

// router.get("/register", (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect("/");
//         return;
//     }
//     res.render("register");
// });


router.get("/", withAuth, async (req, res) => {

    try {
        const listData = await List.findAll({
            include: [
                { model: Media, through: MediaList },
            ]
        });
        
        const lists = listData.map((list) => list.get({ plain: true }));

        res.render("list", {lists, logged_in: req.session.logged_in})

        // res.status(200).json( listData );
  
      } catch (err) {
        console.log(err)
        res.status(400).json(err);
      }
});


router.get('/media/:id', withAuth, async (req, res) => {
    try {
      const mediaData = await Media.findByPk( req.params.id, {
        include: [
            { 
                model: User,
                attributes: ['name'],
            },
          ],
      });
    
      if ( !mediaData ) {
        res.status(404).json({ message: 'No media found with this id!' });
        return;
      }
  
      const media = mediaData.get({ plain: true });

    res.render('media', {
      ...media,
      logged_in: req.session.logged_in
    });
  
      } catch (err) {
        res.status(500).json(err);
      }
  });

router.get("/register", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("register");
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});






module.exports = router;