var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');
const io = require('../server');


// Grabs all messages from db
router.get('/', (req,res) => {
    // Find all messages from database
    message_list = "CALL get_messages()";


    console.log(req.query);

    con.query(message_list, (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});


// Creates a new message
router.post('/', (req,res) => {
    const {sender, reciever, subject, body, msgType} = req.body;
    let values = [sender, reciever, subject, body, msgType];
    let reply;

    // Check to see if the message is a reply, if it is then we grab the number of the message we are replying to
    if(req.body.reply) {
        reply = Number(req.body.reply);
        values.push(reply);
    }

    // console.log(" new message sent from: " + sender + "to: "+reciever +" of type: "+msgType + " replying to message #" + reply);
    if(false) {

    } else {
        new_message = "CALL add_message(?,?,?,?,?)";
        con.query(new_message,[sender, reciever, subject, body, msgType], (err, results) => {
            if (err) throw err;
            res.status(201).jsonp({results}).end;
        });
        io.emit("message sent");
    }
});

// updates all messages
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

// updates all messages
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

// deletes all messages
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

// updates message
router.put('/:messageId', (req,res) => {
    const messageId = req.params.messageId;
    const {sender,reciever,subject,body, msgType} = req.body;
    console.log("message updated via put with messageId: " + messageId);
    update_message = "CALL update_message(?,?,?,?,?,?)";

    con.query(update_message,[messageId,sender,reciever,subject,body, msgType[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all messages
router.patch('/:messageId', (req,res) => {
    const messageId = req.params.messageId;
    const {sender,reciever,subject,body, msgType} = req.body;
    console.log("message updated via patch with messageId: " + messageId);
    update_message = "CALL update_message(?,?,?,?,?,?)";

    con.query(update_message,[messageId,sender,reciever,subject,body, msgType[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// deletes message
router.delete('/:messageId', (req,res) => {
    const messageId = req.params.messageId;
    console.log(" deleting message with message id: " + messageId);
    delete_messages = "CALL delete_message(?)";
    con.query(delete_messages, [messageId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'message deleted'}).end;
    })


});


module.exports = router;