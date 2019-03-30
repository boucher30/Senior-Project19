var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');



// Grabs all carves from db
router.get('/', (req,res) => {
   
    carve_list = "CALL get_carves()";


    console.log(req.query);

    con.query(carve_list, (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});

// Grabs all carves from db
router.get('/open', (req,res) => {

    carve_list = "CALL get_open_carves()";


    console.log(req.query);

    con.query(carve_list, (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});



// Creates a new carve
// call add_carve('bob',1,1,'open',5,5,'2019-03-29','snowboard');
router.post('/', (req,res) => {
    const {carveName,creatorId,venueId,carveType,athlete,photo,date, sports} = req.body;

    console.log(" new carve entered with carvename: " + carveName);
    if(false)
    {

    }else{
        // The carvename wasn't found in the database
        // Create insert query for new carve
        // Added a comment
        new_carve = "CALL add_carve(?,?,?,?,?,?,?,?)";
        // Execute the query to insert into the database
        con.query(new_carve,[carveName,creatorId,venueId,carveType[0],athlete,photo,date, sports[0]], (err, results) => {
            if (err) throw err;
            res.status(201).jsonp({results}).end;
        })

    }
});

// updates all carves
router.put('/', (req,res) => {

    // The carvename wasn't found in the database
    // Create insert query for new carve
    // Added a comment
    new_carve = "CALL update_carves()";
    // Execute the query to insert into the database
    con.query(new_carve,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carves updated',results}).end;
    })
});

// updates all carves
router.patch('/', (req,res) => {

    // The carvename wasn't found in the database
    // Create insert query for new carve
    // Added a comment
    new_carve = "CALL update_carves()";
    // Execute the query to insert into the database
    con.query(new_carve,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carves updated',results}).end;
    })


});

// deletes all carves
router.delete('/', (req,res) => {
    delete_carves = "CALL delete_carves()";
    con.query(delete_carves, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'all carves deleted',results}).end;
    })


});

// Grab specific carve by their id
router.get('/:carveId', (req,res) => {
    const carveId = req.params.carveId;

    get_carve  = "call get_carve(?)";
    con.query(get_carve, [carveId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({msg:'carve info:',results}).end;
    })
});

// updates carve
router.put('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    const {carveName,creatorId,venueId,carveType,athlete,photo,date,completed, sports} = req.body;
    console.log(" new carve updated with carvename: " + carveName);
    update_carve = "CALL update_carve(?,?,?,?,?,?,?,?,?,?)";

    con.query(update_carve,[carveId,carveName,creatorId,venueId,carveType[0],athlete,photo,date,completed, sports[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carve updated via put',results}).end;
    })
});

// updates all carves complete
router.patch('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    const {carveName,creatorId,venueId,carveType,athlete,photo,date,completed, sports} = req.body;
    console.log(" new carve updated with carvename: " + carveName);
    update_carve = "CALL update_carve(?,?,?,?,?,?,?,?,?,?)";

    con.query(update_carve,[carveId,carveName,creatorId,venueId,carveType[0],athlete,photo,date,completed,sports[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carve updated via patch',results}).end;
    })
});

// deletes carve
router.delete('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    console.log(" deleting carve with carve id: " + carveId);
    delete_carves = "CALL delete_carve(?)";
    con.query(delete_carves, [carveId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carve deleted'}).end;
    })


});


module.exports = router;
