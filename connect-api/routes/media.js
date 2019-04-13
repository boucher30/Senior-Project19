var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');



// Grabs all medias from db
router.get('/', (req,res) => {
    // Find all medias from database
    media_list = "CALL get_media()";


    console.log(req.query);

    con.query(media_list, (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});


// Creates a new media
router.post('/', (req,res) => {
    const {poster,url,description,carve,venue,profile} = req.body;

    console.log(" new media sent from: " + poster);
    if(false)
    {

    }else{
        // The medianame wasn't found in the database
        // Create insert query for new media
        // Added a comment
        new_media = "CALL add_media(?,?,?,?,?,?)";
        // Execute the query to insert into the database
        con.query(new_media,[poster,url,description,carve,venue,profile], (err, results) => {
            if (err) throw err;
            res.status(201).jsonp({results}).end;
        })

    }
});

// updates all medias
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

// updates all medias
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

// deletes all medias
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

// updates media
router.put('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId;
    const {poster,url,description,carve,venue,profile} = req.body;
    console.log("media updated via put with mediaId: " + mediaId);
    update_media = "CALL update_medi(?,?,?,?,?,?,?)";

    con.query(update_media,[mediaId,poster,url,description,carve,venue,profile],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all medias
router.patch('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId;
    const {poster,url,description,carve,venue,profile} = req.body;
    console.log("media updated via patch with mediaId: " + mediaId);
    update_media = "CALL update_medi(?,?,?,?,?,?,?)";

    con.query(update_media,[mediaId,poster,url,description,carve,venue,profile],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// deletes media
router.delete('/:mediaId', (req,res) => {
    const mediaId = req.params.mediaId;
    console.log(" deleting media with media id: " + mediaId);
    delete_medias = "CALL delete_medi(?)";
    con.query(delete_medias, [mediaId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'media deleted'}).end;
    })


});


module.exports = router;