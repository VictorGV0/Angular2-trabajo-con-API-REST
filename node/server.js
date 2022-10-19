var express = require("express");
var app = express()
var mongoose = require('mongoose')
var cors = require('cors')

mongoose.connect('mongodb://localhost:27017/angular_list', { useNewUrlParser: true, useUnifiedTopology: true });

var List = mongoose.model( 'List' , {
    text:String,
    done:Boolean
});

app.configure( function(){

    app.use( express.static( __dirname + '/public'));

    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
})
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post( '/api/list', function(request, response){
    List.create({
        text:request.body.text
    }, function(error, result){
        if(error){
            response.send(error)
        }
        List.find( function(error, result){
            if(error){
                response.send(error)
            }
            response.json(result)

        })
    })
})

app.get( '/api/list', function(request, response){
    
        List.find( function(error, result){
            if(error){
                response.send(error)
            }
            response.json(result)
 
        })
    })

app.delete('/api/list/:item', function(req, response){

    List.remove( {
        _id: req.params.item
    }, function(error, result) {
        if (error){
            response.send(error)
        }
        List.find(function(error, result) {
            if (error){
                response.send(error)
            }
            response.json(result)
        })
    })

})

app.put('/api/list/:item', function(req, response){

    List.findOneAndUpdate(
        {_id: req.params.item},
        {text:req.body.text},
        {done: true},
        function(error, result){
            if(error){
                response.send(error)
            }
            List.find( function(error, result) {
                if(error){
                    response.send(error)
                }
                response.json(result)
            })
        }
    )

})

app.get( "*" , function(req, res){
    res.sendfile(__dirname + '/public/404.html')

})
app.get( "/" , function(req, res){
    res.sendfile('/public/index.html')

})
app.listen ( 8080, function(){
    console.log("server")
})