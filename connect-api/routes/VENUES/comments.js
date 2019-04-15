var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');



// Grabs all comments for a specific venue from the database
router.get('/', (req,res) => {
    // Create a query to get all comments from the database
    comment_list = "CALL get_comments()";
    // Execute the query
    con.query(comment_list, (err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});


// Creates a new comment and a specific venue
router.post('/', (req,res) => {
    const {poster,carve,media,profile,comment} = req.body;
        // Create insert query for new comment
        new_comment = "CALL add_comment(?,?,?,?,?)";
        // Execute the query to insert into the database
        con.query(new_comment,[poster,carve,media,profile,comment], (err, results) => {
            if (err) throw err;
            res.status(201).jsonp({results}).end;
        })
});

// Deletes all comments for a specific venue
router.delete('/', (req,res) => {
    // Create the query to delete all comments from the database
    delete_comments = "CALL delete_comments()";
    // Execute the delete query
    con.query(delete_comments, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Grab specific comment by their id
router.get('/:commentId', (req,res) => {
    const commentId = req.params.commentId;
    // Create the query to get the specified comment from the database
    get_comment  = "call get_comment(?)";
    // Execute the get query
    con.query(get_comment, [commentId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Updates the comment specified by the given comment ID
    router.put('/:commentId', (req,res) => {
    const commentId = req.params.commentId;
    const {poster,carve,media,profile,comment} = req.body;
    // Create the query to update the specified comment
    update_comment = "CALL update_comment(?,?,?,?,?,?)";
    // Execute update query
    con.query(update_comment,[commentId,poster,carve,media,profile,comment],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates the comment specified by the given comment ID
router.patch('/:commentId', (req,res) => {
    const commentId = req.params.commentId;
    const {poster,carve,media,profile,comment} = req.body;
    // Create the query to update the specified comment
    update_comment = "CALL update_comment(?,?,?,?,?,?)";
    // Execute update query
    con.query(update_comment,[commentId,poster,carve,media,profile,comment],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes the comment specified by the given comment ID
router.delete('/:commentId', (req,res) => {
    const commentId = req.params.commentId;
    // Create the query to delete the specified comment from the databse
    delete_comments = "CALL delete_comment(?)";
    // Execute the delete query
    con.query(delete_comments, [commentId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'comment deleted'}).end;
    })
});


module.exports = router;