// Dependencies
const express = require('express');
var methodOverride = require('method-override');
const isLoggedIn = require('../helper/isLoggedIn');

const router = express.Router();

router.use(methodOverride('_method'));

router.use(express.urlencoded({ extended: true }));

// Import Article Controller
const companyCntrl = require('../controllers/company');

// Routes
router.get('/company/add', isLoggedIn, companyCntrl.company_create_get);
router.post('/company/add', isLoggedIn, companyCntrl.company_create_post);
router.get('/company/index', isLoggedIn, companyCntrl.company_index_get);
router.get('/company/detail', isLoggedIn, companyCntrl.company_show_get);
router.get('/company/delete', isLoggedIn, companyCntrl.company_delete_get);
router.get('/company/edit', isLoggedIn, companyCntrl.company_edit_get);
router.put('/company/update', isLoggedIn, companyCntrl.company_update_put);

// Export router
module.exports = router;
