var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');

/*
 * Endpoint for all media requests related to a venue
 */

// Grabs all media resources from db
router.get('/', (req,res) => {
    // Find all medias from database
    // Create the query to get all media from the database
    media_list = "CALL get_media()";
    // Execute the query
    con.query(media_list, (err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});


// Creates a new media resource
router.post('/', (req,res) => {
    const {poster,url,description,carve,venue,profile} = req.body;
    // The medianame wasn't found in the database
    // Create insert query for new media
    // Added a comment
    new_media = "CALL add_media(?,?,?,?,?,?)";
    // Execute the query to insert into the database
    con.query(new_media,[poster,url,description,carve,venue,profile], (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes all media from the database
router.delete('/', (req,res) => {
    // Create the delete query
    delete_medias = "CALL delete_media()";
    // Execute the delete query
    con.query(delete_medias, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Grab specific media resource by its id
router.get('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId;
    // Create the query
    get_media  = "call get_medi(?)";
    // Execute the query
    con.query(get_media, [mediaId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Updates a specific media resource
router.put('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId; // The ID of the media resource
    const {poster,url,description,carve,venue,profile} = req.body;
    // Create the update query
    update_media = "CALL update_medi(?,?,?,?,?,?,?)";
    // Execute the update query
    con.query(update_media,[mediaId,poster,url,description,carve,venue,profile],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates a specific media resource
router.patch('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId; // The ID of the media resource
    const {poster,url,description,carve,venue,profile} = req.body;
    // Create the update query
    update_media = "CALL update_medi(?,?,?,?,?,?,?)";
    // Execute the update query
    con.query(update_media,[mediaId,poster,url,description,carve,venue,profile],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes a specific media resource from the database
router.delete('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId; // ID of the media resource to be deleted
    // Create the delete query
    delete_medias = "CALL delete_medi(?)";
    // Execute the delete query
    con.query(delete_medias, [mediaId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'media deleted'}).end;
    })
});


module.exports = router;