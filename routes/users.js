const express = require('express');
const router = express.Router();

//controllers
const Users = require('../controllers/Users');

router.get('/:id', Users.get);

module.exports = router;