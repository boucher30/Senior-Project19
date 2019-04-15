var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

/*
 * Endpoint for all media related requests
 */

// Grabs all media from the database
router.get('/', (req,res) => {
    // Find all medias from database
    media_list = "CALL get_media()";

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

// Updates all media
router.put('/', (req,res) => {

    // The medianame wasn't found in the database
    // Create insert query for new media
    // Added a comment
    new_media = "CALL update_media()";
    // Execute the query to insert into the database
    con.query(new_media,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates all media
router.patch('/', (req,res) => {

    // The medianame wasn't found in the database
    // Create insert query for new media
    // Added a comment
    new_media = "CALL update_media()";
    // Execute the query to insert into the database
    con.query(new_media,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes all media
router.delete('/', (req,res) => {

    delete_medias = "CALL delete_media()";

    con.query(delete_medias, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Grab specific media by their id
router.get('/profile/:userId', (req,res) => {
    const userId = req.params.userId;

    get_media  = "call get_profile_media(?)";
    con.query(get_media, [userId],(err, results) => {
        if (err) throw err;
        //console.log("results" + JSON.stringify(results));
        res.status(200).jsonp({results}).end;
    })
});

router.get('/carves/:carveId', (req,res) => {
    const carveId = req.params.carveId;

    get_media  = "call get_carve_media(?)";
    con.query(get_media, [carveId],(err, results) => {
        if (err) throw err;
        //console.log("results" + JSON.stringify(results));
        res.status(200).jsonp({results}).end;
    })
});

// Grab specific media by their id
router.get('/venue/:venueId', (req,res) => {
    const venueId = req.params.venueId;

    get_media  = "call get_venue_media(?)";
    con.query(get_media, [venueId],(err, results) => {
        if (err) throw err;
        //console.log("results" + JSON.stringify(results));
        res.status(200).jsonp({results}).end;
    })
});

// Grab specific media by their id

router.get('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId;

    get_media  = "call get_medi(?)";

    con.query(get_media, [mediaId],(err, results) => {
        if (err) throw err;
        //console.log("results" + JSON.stringify(results));
        res.status(200).jsonp({results}).end;
    })
});

// Updates a specific media post
router.put('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId;
    const {poster,url,description,carve,venue,profile} = req.body;

    update_media = "CALL update_medi(?,?,?,?,?,?,?)";

    con.query(update_media,[mediaId,poster,url,description,carve,venue,profile],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates a specific media post
router.patch('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId;
    const {poster,url,description,carve,venue,profile} = req.body;

    update_media = "CALL update_medi(?,?,?,?,?,?,?)";

    con.query(update_media,[mediaId,poster,url,description,carve,venue,profile],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes a specific media post
router.delete('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId;

    delete_medias = "CALL delete_medi(?)";

    con.query(delete_medias, [mediaId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'media deleted'}).end;
    })
});


module.exports = router;