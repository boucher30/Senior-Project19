var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

// Grabs all users from db
router.get('/', (req,res) => {
    // Find all users from database
    console.log(req.params);
    userId = req.params.userId;
    user_list = "CALL get_messages(?)";
    con.query(user_list,[userId], (err, results, fields) => {

        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incoming', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_messageI_list = "CALL get_incoming_messages(?)";
    con.query(user_messageI_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/outgoing', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_messageO_list = "CALL get_outgoing_messages(?)";
    con.query(user_messageO_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incomingBuddyRequest', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_BRI_list = "CALL get_incoming_buddy_request(?)";
    con.query(user_BRI_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/outgoingBuddyRequest', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_BRO_list = "CALL get_outgoing_buddy_request(?)";
    con.query(user_BRO_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incomingCarveAttendRequest', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_CARI_list = "CALL get_incoming_carveattend_request(?)";
    con.query(user_CARI_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/outgoingCarveAttendRequest', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_CARO_list = "CALL get_outgoing_carveattend_request(?)";
    con.query(user_CARO_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incomingCarveInvite', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_CIRI_list = "CALL get_incoming_carveinvite_request(?)";
    con.query(user_CARI_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/outgoingCarveInvite', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_CIRO_list = "CALL get_outgoing_carveinvite_request(?)";
    con.query(user_CARO_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.get('/incomingCarveAttendRequest', (req,res) => {
    // Find all users from database
    const userId = req.params.userId;
    user_CARI_list = "CALL get_incoming_carveattend_request(?)";
    con.query(user_CARI_list, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;

    const {recipeientId,subject,message} =req.body;
    user_send = "CALL send_message(?,?,?,?)";
    con.query(user_send, [senderId,recipeientId,subject,message],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/sendReplyMessage', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const {recipeientId,subject,message,replyingId} =req.body;
    user_sendreply = "CALL send_reply_message(?,?,?,?,?)";
    con.query(user_sendreply, [senderId,recipeientId,subject,message,replyingId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});


router.post('/sendBuddyRequest', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const {recipeientId,subject,message} =req.body;
    user_sendBR = "CALL send_buddy_request(?,?,?,?)";
    con.query(user_sendBR, [senderId,recipeientId,subject,message],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/sendBuddyRequestAccept/:brId', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const brId = req.params.brId;
    const {recipeientId,subject,message} =req.body;
    user_sendBRA = "CALL accept_buddy_request(?,?,?,?,?)";

    add_buddy = "CALL add_buddy(?,?)";
    con.query(add_buddy, [senderId,recipeientId],(err, results, fields) => {
        if (err) throw err;

    });
    con.query(user_sendBRA, [senderId,recipeientId,subject,message,brId],(err, results, fields) => {
        if (err) throw err;


        res.status(200).json({
            messages: results,
            msg: 'buddy added'
        })
    })
});

router.post('/sendBuddyRequestDeny/:brId', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const brId = req.params.brId;
    const {recipeientId,subject,message} =req.body;
    user_sendBRD = "CALL decline_buddy_request(?,?,?,?,?)";
    con.query(user_sendBRD, [senderId,recipeientId,subject,message,brId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/sendCarveAttendRequest', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const {recipeientId,subject,message} =req.body;
    user_send = "CALL send_message(?,?,?,?)";
    con.query(user_send, [senderId,recipeientId,subject,message],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/sendCarveAttendAccept', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const {recipeientId,subject,message,replyid} =req.body;
    user_send_CAA = "CALL send_carveattend_accept(?,?,?,?,?)";
    con.query(user_send_CAA, [senderId,recipeientId,subject,message,replyid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/sendCarveAttendDeny', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const {recipeientId,subject,message,replyid} =req.body;
    user_send_CAD = "CALL send_carveattend_accept(?,?,?,?,?)";
    con.query(user_send_CAD, [senderId,recipeientId,subject,message,replyid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/sendCarveInviteRequest', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const {recipeientId,subject,message} =req.body;
    user_send_CIR = "CALL send_carveinvite_request(?,?,?,?)";
    con.query(user_send_CIR, [senderId,recipeientId,subject,message],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/sendCarveInviteAccept', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const {recipeientId,subject,message,replyid} =req.body;
    user_send_CIA = "CALL send_carveinvite_accept(?,?,?,?,?)";
    con.query(user_send_CIA, [senderId,recipeientId,subject,message,replyid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

router.post('/sendCarveInviteDecline', (req,res) => {
    // Find all users from database
    const senderId = req.params.userId;
    const {recipeientId,subject,message,replyid} =req.body;
    user_send_CID = "CALL send_carveinvite_deny(?,?,?,?,?)";
    con.query(user_send_CID, [senderId,recipeientId,subject,message,replyid],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

module.exports = router;