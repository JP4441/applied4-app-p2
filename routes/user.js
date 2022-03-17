const express = require('express');
var methodOverride = require('method-override');
const isLoggedIn = require('../helper/isLoggedIn');

const router = express.Router();

router.use(methodOverride('_method'));

router.use(express.urlencoded({ extended: true }));

// Import Author Controller
const userCntrl = require('../controllers/user');

// Routes
router.get('/user/detail', isLoggedIn, userCntrl.user_show_get);
router.get('/user/edit', isLoggedIn, userCntrl.user_edit_get);
router.put('/user/update', isLoggedIn, userCntrl.user_update_put);
router.get('/user/stats', isLoggedIn, userCntrl.user_stats_get);

// Export router
module.exports = router;
