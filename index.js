const express = require('express');

//FIREBASE
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');

const firebaseApp = firebase.initializeApp(firebaseConfig);

//console.log(firebaseApp);

const db = firebaseApp.firestore();


const app = express();

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

app.get('/users/:id',(request,response,next) => {
    const id = request.params.id;
    
    //response.json({sucess: 'OII estou na nova'});
    db.collection('users').doc(id).get()
    .then(user => {    
        if(!user.exists){
            return response
            .status(404)
            .send({message:'No Content'})   
        }
        //console.log('user',user.data());
        response.json(users.data());
    })
    .catch(err =>{
        console.log('Error getting document', err);
    });
});

//console.log("oi");
console.log('AMBIENTE: ', process.env.NODE_ENV);
