/**
 * ANTES
 const config = require('./config/default');
 const jwt = require('jsonwebtoken'); 

const token = jwt.sign({id},
                    config.secret,
                    {expiresIn: 300});
                    
                    response.json({token});

                })

 */





const jwt = require('jsonwebtoken');
const config = require('../config/default');

module.exports = (data,expiresIn = 300) =>
jwt.sign(data,
    config.secret,
    {expiresIn}
    );