var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

// Grabs all users from db
router.get('/', (req,res) => {
    // Find all users from database
    user_list = "CALL get_messages()";
    con.query(user_list, (err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incoming', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_messageI_list = "CALL get_incoming_messages(?)";
    con.query(user_messageI_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/outgoing', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_messageO_list = "CALL get_outgoing_messages(?)";
    con.query(user_messageO_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incomingBuddyRequest', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_BRI_list = "CALL get_incoming_buddy_request(?)";
    con.query(user_BRI_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/outgoingBuddyRequest', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_BRO_list = "CALL get_outgoing_buddy_request(?)";
    con.query(user_BRO_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incomingCarveAttendRequest', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_CARI_list = "CALL get_incoming_carveattend_request(?)";
    con.query(user_CARI_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/outgoingCarveAttendRequest', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_CARO_list = "CALL get_outgoing_carveattend_request(?)";
    con.query(user_CARO_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incomingCarveInvite', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_CIRI_list = "CALL get_incoming_carveinvite_request(?)";
    con.query(user_CARI_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/outgoingCarveInvite', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_CIRO_list = "CALL get_outgoing_carveinvite_request(?)";
    con.query(user_CARO_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incomingCarveAttendRequest', (req,res) => {
    // Find all users from database
    const {userid} =req.body;
    user_CARI_list = "CALL get_incoming_carveattend_request(?)";
    con.query(user_CARI_list, [userid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/sendMessage', (req,res) => {
    // Find all users from database
    const {senderId,recipeientId,subject,message} =req.body;
    user_send = "CALL send_message(?,?,?,?)";
    con.query(user_send, [senderId,recipeientId,subject,message],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/sendReplyMessage', (req,res) => {
    // Find all users from database
    const {senderId,recipeientId,subject,message,replyingId} =req.body;
    user_send = "CALL send_reply_message(?,?,?,?,?)";
    con.query(user_send, [senderId,recipeientId,subject,message,replyingId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});
/* ignore here
router.get('/sendBuddyRequest', (req,res) => {
    // Find all users from database
    const {senderId,recipeientId,subject,message} =req.body;
    user_send = "CALL send_message(?,?,?,?)";
    con.query(user_send, [senderId,recipeientId,subject,message],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});*/

module.exports = router;