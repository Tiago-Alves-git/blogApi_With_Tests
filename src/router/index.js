const router = require('express').Router();
const loginRoutes = require('./login-routes');
const userRoutes = require('./user-routes ');
const categoriesRoutes = require('./categories-routes');

router.use('/login', loginRoutes);
router.use('/user', userRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;