var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb://webMongo:Amys3939889@ds157702.mlab.com:57702/mongo_db';
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully updated");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('portal').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/delete/:toBeDeleted_id', function (req, res) {
    MongoClient.connect(url, function(err, db){
        if(err)
        {
            res.write("Delete Failed.");
            res.end();
        }
        var id = req.params.toBeDeleted_id;

        db.collection('portal').deleteOne({'_id': new ObjectID(id)}, function(err, obj){
            if(err) throw err;
            console.log("Delete Completed.");
            res.send(req.body);
            db.close();
        });


    })
});


app.get('/update/:toBeUpdated_id', function (req, res) {
    MongoClient.connect(url, function(err, db){
        if(err)
        {
            res.write("Update Failed.");
            res.end();
        }
        var id = req.params.toBeUpdated_id;
        var studentLname = {$set: {}};
        var studentFName = req.query.FirstName;
        var studentemail = req.query.email;
        var portal= req.body;

        db.collection('portal').updateMany({'_id':new ObjectID(id)}, {'FirstName': studentFName},  {'LastName': studentLname}, {'email': studentemail}, function(err, res){
            if(err) throw err;
            console.log(res.result.nModified + "Update Completed.");
            res.send(portal);
            db.close();
        });


    })

});


var insertDocument = function(db, data, callback) {
    db.collection('portal').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("A new student info is registered in the system.");
        callback();
    });
};

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});