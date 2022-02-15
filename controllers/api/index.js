const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listRoutes = require('./listRoutes');
const mediaRoutes = require('./mediaRoutes');

router.use('/users', userRoutes);
router.use('/list', listRoutes);
router.use('/media', mediaRoutes);

module.exports = router;