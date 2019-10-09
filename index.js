const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


//criação de toras
app.get('/users',(request,response,next)=>{
    //console.log(request.query.id);

    console.log("Entrei na rota users");
    //response.sendStatus(200);
    response.json({sucess: true});
})

//console.log("oi");
console.log('AMBIENTE: ', process.env.NODE_ENV);

