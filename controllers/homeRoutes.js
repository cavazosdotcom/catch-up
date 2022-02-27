const router = require("express").Router();
const { User, Media, List, MediaList } = require("../models");
const withAuth = require("../utils/auth");

// TODO: Original routes, kept as references for now just in case
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
          where: {
            user_id: req.session.user_id
          },
          include: [{model: Media}]
        })

        if(listData[0]){
          const media = listData[0].media.map((item) => item.toJSON());
          res.render("list", {
            media,
            logged_in: true
          });
          return
        }

        res.render("list", {
          logged_in: true
        });

      } catch (err) {
        console.log(err)
        res.status(400).json(err);
      }
});

router.get("/browse", async (req, res) => {
  const mediaData = await Media.findAll();
  let media = mediaData.map((e) => e.toJSON());
  media.forEach((e) => e.logged_in = req.session.logged_in);
  console.log(media);
  res.render("browse", {media, logged_in: req.session.logged_in});
});

router.get("/media", withAuth, async (req, res) => {
    res.render("media", {logged_in: req.session.logged_in});
});


// TODO: Add random route
router.get("/random", withAuth, async (req, res) => {
  
  try {
    const listData = await List.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [{model: Media}]
    })
    const list = listData[0].media.map((item) => item.toJSON());
    // const list = listData.get({ plain: true });
    // console.log(list);

    const len = list.length; 
    // console.log(len)
     //generate random number
     var media = list[Math.floor(Math.random() * len)];
    
    console.log(media)
    
    res.render('random', {
      ...media,
      logged_in: req.session.logged_in
    });

  } catch (err) {
      res.status(500).json(err);
    }
});


router.get('/media/:id', withAuth, async (req, res) => {
    try {
      const mediaData = await Media.findByPk( req.params.id, {
        include: [
            { 
                model: User,
                // attributes: ['name'],
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