var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res){
    console.log("This is req.body: " + req.body);
    burger.selectAll(function(data){
        var object = {
            burgers: data
        };
        console.log(object);
        res.render("index", object);
    });
});

router.post("/api/burgers", function(req, res){
    console.log("This is req.body: " + req.body);
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result){
        console.log(result);
        res.json({id: result.insertId });
    }); 
});

router.put("/api/burgers/:id", function(req, res){
    console.log("This is req.body: " + req.body);
    console.log("This is req.params: " + req.params);

    var condition = "id = " + req.params.id;

    console.log("condition: ", condition);

    burger.updateOne({devoured: req.body.devoured}, condition, function(result){
        console.log(result);

        if(result.changedRows === 0){
            return res.status(404).end();
        }

        res.status(200).end();
    });
});

module.exports = router;