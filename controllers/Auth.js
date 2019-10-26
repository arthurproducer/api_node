const UsersModel = require('../models/Users');

const userModel = new UsersModel();
const createToken = require('../utils/createToken');

class Auth {
   
    static auth(request, response) {
        
        const conditions = [
            {
                field:          'email',
                value:          request.body.email,
                condition:      '=='
            },
            {
                field:          'password',
                value:          request.body.password,
                condition:      '=='
            },
        ];

        userModel.list(conditions)
            .then(users => {
                if(users.docs.length === 0){
                    return response
                        .status(401)
                        .send({
                            code:       'not_found',
                            message:    'User not found'
                        });
                }
                
                //Exemplo de Destruct:
                //const [{id}] = users.docs;

                const id = users.docs[0].id;
                response.json({ token: createToken( {id} ) });
            })
            .catch(err => {
                response.
                    sendStatus(500);
                console.log('Error getting document', err);
            });
    }
}

module.exports = Auth;