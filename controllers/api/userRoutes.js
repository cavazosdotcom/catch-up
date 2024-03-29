const router = require("express").Router();
const { User, List } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const userList = await List.create({user_id: userData.id});
    req.session.save(() => {
        req.session.logged_in = true;
        req.session.user_id = userData.id;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Sorry the email or password you entered is incorrect, try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Sorry the email or password you entered is incorrect, try again.' });
      return;
    }
    
    req.session.logged_in = true;
    req.session.user_id = userData.id;
    
    req.session.save(() => {
      res.json({ user: userData, message: 'You Are Now Signed In' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
      res.status(204).end();
    req.session.destroy(() => {
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;