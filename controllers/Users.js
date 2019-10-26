const cacheManager = require('cache-manager');

//config
const {cache} = require('../config/default');

//Model
const UsersModel = require('../models/Users');
const userModel = new UsersModel();

//instancia da biblioteca de cache
const memoryCache = cacheManager.caching(cache);

class Users {
    static get(request, response) {
        const id = request.params.id;
        const key = `user_${id}`;

        memoryCache.get(key,(err,result) =>{
            if(result){
                return response.json(result);
            }

            userModel.get(id)
            .then(user => {
                if (user.exists) {
                    const result = user.data();
                    memoryCache.set(key,result);
                    response.json(user.data());
                } else {
                    response.sendStatus(404);
                    console.log('nao encontrado');
                }
            })
            .catch(err => {
                //response.sendStatus(503);
                console.log('Error getting document', err);
            });
        })
    } 

    static list(request, response) {
        userModel.list()
            .then(users => response.json(
                users.docs.map(user => (
                    {
                        ...user.data(), 
                        id: user.id
                    }
                ))
            ))
            .catch(err => {
                response.
                    sendStatus(500);
                console.log('Error getting document', err);
            });
    }
}


module.exports = Users;