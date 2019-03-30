var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');



// Grabs all likes from db
router.get('/', (req,res) => {
    // Find all likes from database
    like_list = "CALL get_carve_likes(?)";
    carveId = req.params.carveId;

    console.log(req.query);

    con.query(like_list,[carveId], (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});


// Grabs all likes from db
router.get('/dislike', (req,res) => {
    // Find all likes from database
    like_list = "CALL get_carve_dislikes(?)";
    carveId = req.params.carveId;

    console.log(req.query);

    con.query(like_list,[carveId], (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});
// Creates a new like
router.post('/', (req,res) => {
    const {poster,likeordislike,carve,media,comment} = req.body;

    console.log(" new like sent from: "+ poster);
    if(false)
    {

    }else{
        // The likename wasn't found in the database
        // Create insert query for new like
        // Added a comment
        new_like = "CALL add_like(?,?,?,?,?)";
        // Execute the query to insert into the database
        con.query(new_like,[poster,likeordislike[0],carve,media,comment], (err, results) => {
            if (err) throw err;
            res.status(201).jsonp({results}).end;
        })

    }
});

// updates all likes
router.put('/', (req,res) => {

    // The likename wasn't found in the database
    // Create insert query for new like
    // Added a comment
    new_like = "CALL update_likes()";
    // Execute the query to insert into the database
    con.query(new_like,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all likes
router.patch('/', (req,res) => {

    // The likename wasn't found in the database
    // Create insert query for new like
    // Added a comment
    new_like = "CALL update_likes()";
    // Execute the query to insert into the database
    con.query(new_like,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })


});

// deletes all likes
router.delete('/', (req,res) => {
    delete_likes = "CALL delete_likes()";
    con.query(delete_likes, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })


});

// Grab specific like by their id
router.get('/:likeId', (req,res) => {
    const likeId = req.params.likeId;

    get_like  = "call get_like(?)";
    con.query(get_like, [likeId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// updates like
router.put('/:likeId', (req,res) => {
    const likeId = req.params.likeId;
    const {poster,likeordislike,carve,media,comment} = req.body;
    console.log("like updated via put with likeId: " + likeId);
    update_like = "CALL update_like(?,?,?,?,?,?)";

    con.query(update_like,[likeId,poster,likeordislike[0],carve,media,comment],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates like
router.patch('/:likeId', (req,res) => {
    const likeId = req.params.likeId;
    const {poster,likeordislike,carve,media,comment} = req.body;
    console.log("like updated via patch with likeId: " + likeId);
    update_like = "CALL update_like(?,?,?,?,?,?)";

    con.query(update_like,[likeId,poster,likeordislike[0],carve,media,comment],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// deletes like
router.delete('/:likeId', (req,res) => {
    const likeId = req.params.likeId;
    console.log(" deleting like with like id: " + likeId);
    delete_likes = "CALL delete_like(?)";
    con.query(delete_likes, [likeId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'like deleted'}).end;
    })


});


module.exports = router;