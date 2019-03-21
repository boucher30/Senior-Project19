
var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

//grab all the buddies from DB
router.get('/', (req, res) => {
    var sql = "call get_carves()";
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json({
            venues: results
        })
    })
});


module.exports = router;