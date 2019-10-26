const express = require('express');

//FIREBASE
//const firebase = require('firebase');
//const firebaseConfig = require('./config/firebase');

//const firebaseApp = firebase.initializeApp(firebaseConfig);

//console.log(firebaseApp);

//const db = firebaseApp.firestore();
        
        const routes = require('./routes');
        const bodyParser = require('body-parser');
        
        const app = express();        
        const createToken = require('./utils/createToken');
        const verifyToken = require('./middlewares/verifyToken');

        app.use(bodyParser.json());
        app.use(routes);
        
        app.post('/auth',(request,response,next) => {
            console.log(request.body);
            
            db.collection('users')
            .where('email','==',request.body.email)
            .where('password','==',request.body.password)
            .get()
            .then(users => {
                if(users.docs.length === 0){
                    return response
                    .status(401)
                    .send({
                        code: 'not_found',
                        message: 'User not found'});
                }

               const[{id}] = users.docs;
                
               response.json({token: createToken({id})});
                })
            .catch(err =>{
                response.sendStatus(500);
                console.log(err);
                console.log('Errror',err);
            })          
        });
    
        
        
        
        
    
        
        
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
        
        
        //criação de toras
        app.get('/users',(request,response,next)=>{
            
            /**
            * BUSCAR TODOS OS DADOS DA COLEÇÃO 'users'
            */
            
            db.collection('users').get()
            .then(snapshot => {
                
                const result = []
                
                snapshot.forEach(doc => {
                    result.push(doc.data());
                });
                
                
                /*
                .then(users => response.json(
                    users.docs.map(user =>({
                        ...user.data(),
                        id: user.id,
                    }))
                    ))
                    */ 
                    response.json(result);
                    
                }).catch(err =>{
                    console.log('Error getting document', err);
                });
                
                //console.log(request.query.id);
                
                console.log("Entrei na rota users");
                //response.sendStatus(200);
                //response.json({sucess: true});
            });
        



            const Users = require('./controllers/Users');
            app.get('/users/:id',Users.get);
              
            console.log('AMBIENTE: ', process.env.NODE_ENV);
            