var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');
const io = require('../server');

/*
 * Endpoint for all messaging related requests
 */

// Grabs all messages from db
router.get('/', (req,res) => {
    // Find all messages from database
    message_list = "CALL get_messages()";

    con.query(message_list, (err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Creates a new message
router.post('/', (req,res) => {

    const {sender,reciever,subject,body, msgType} = req.body;
    // The messagename wasn't found in the database
    // Create insert query for new message
    // Added a comment
    new_message = "CALL add_message(?,?,?,?,?)";
    // Execute the query to insert into the database
    con.query(new_message,[sender,reciever,subject,body, msgType], (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates all messages
router.put('/', (req,res) => {
    // The messagename wasn't found in the database
    // Create insert query for new message
    // Added a comment
    new_message = "CALL update_messages()";
    // Execute the query to insert into the database
    con.query(new_message,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates all messages
router.patch('/', (req,res) => {
    // The messagename wasn't found in the database
    // Create insert query for new message
    // Added a comment
    new_message = "CALL update_messages()";
    // Execute the query to insert into the database
    con.query(new_message,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes all messages
router.delete('/', (req,res) => {

    delete_messages = "CALL delete_messages()";

    con.query(delete_messages, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Grab specific message by their id
router.get('/:messageId', (req,res) => {
    const messageId = req.params.messageId;

    get_message  = "call get_message(?)";

    con.query(get_message, [messageId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Updates a specific message
router.put('/:messageId', (req,res) => {
    const messageId = req.params.messageId;
    const {sender,reciever,subject,body, msgType} = req.body;

    update_message = "CALL update_message(?,?,?,?,?,?)";

    con.query(update_message,[messageId,sender,reciever,subject,body, msgType[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates a specific messasge
router.patch('/:messageId', (req,res) => {
    const messageId = req.params.messageId;
    const {sender,reciever,subject,body, msgType} = req.body;

    update_message = "CALL update_message(?,?,?,?,?,?)";

    con.query(update_message,[messageId,sender,reciever,subject,body, msgType[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes a specific message
router.delete('/:messageId', (req,res) => {
    const messageId = req.params.messageId;

    delete_messages = "CALL delete_message(?)";

    con.query(delete_messages, [messageId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'message deleted'}).end;
    })
});


module.exports = router;