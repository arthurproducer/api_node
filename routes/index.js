const express = require('express');

const verifyToken = require('../middlewares/verifyToken');

//ROUTES
const users = require('./users');

//instancia do router
const router = express.Router();

//Rotas base
router.use('/users',users);

//expõe as rotas
module.exports = router;