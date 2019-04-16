var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');



// Grabs all messages for a specific user from the db
router.get('/', (req,res) => {
    // Find all messages from database
    message_list = "CALL get_users_inbox(?)";
    userId = req.params.userId;

    console.log(req.params);

    con.query(message_list, [userId], (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});

// Strips json obj given back by the db and returns only the rows so that we can manipulate the data
// @params results --- The results from the db to be stripped
function stripResults(results) {
    // let res = JSON.parse(JSON.stringify(results))[0];
    let res = JSON.parse(JSON.stringify(results));
    // console.log(res);
    return res;
}

// global variables
let obj = {};
let messageObj = {};

// Returns id of the reply message if available, if not it will return null
function hasReplyInObj(id) {
    if(obj.hasOwnProperty(id)) {
        let temp = obj[id];
        delete obj[id];
        return temp;
    }

    return null;
}


// Returns all messages that need to be responded to
function findReplyMessages(messages, userId) {
    let inbox = [];
    let msgId;

    // Loop over individual messages and fill obj table with keys
    messages.forEach((message) => {
        obj[message.message_id] = message.reply;
        messageObj[message.message_id] = message;
    });

    // Loop over individual messages and fill obj table with keys
    messages.forEach((message) => {
        let arr = [];

        // Reply id is populated -- We have a thread we should follow
        if(message.reply !== null) {
            msgId = message.message_id;

            // Loop over messages until you find the end of the conversation
            while(msgId !== null) {
                // If the number is still in the obj, add it to the arr
                if(obj.hasOwnProperty(msgId)) {
                    arr.push(msgId);
                }

                // Reassign the message id by finding the reply Id
                msgId = hasReplyInObj(msgId);
            }

            // Need to check that the length of the array is greater than 0 so that we can find the max id in the thread
            if(arr.length > 0) {
                // Lets push the message with the greatest id if and only if the userId passed in is the rec_Id
                let recentMessageId = Math.max(...arr).toString();
                let tempMessage = messageObj[recentMessageId];

                // If message is intended for the user
                if(tempMessage.rec_Id === userId) {
                    inbox.push(messageObj[recentMessageId]);
                }
            }
        } else {
            // We do not have a thread to follow and this is the beginning of a new convo
            if(message.rec_Id === userId && obj.hasOwnProperty(message.message_id)) {
                // Our message could be the beginning without a history present
                inbox.push(messageObj[message.message_id.toString()])
            }
        }
    });

    return inbox;
}


// Grabs all messages for a user that require them to respond ( INBOX )
router.get('/inbox', (req,res) => {
    sql = "CALL get_users_inbox(?)";

    tempSql = "select * from messages where (rec_id = 1 or sender_Id = 1) and (type = 'normal' or type = 'reply') order by message_id desc;";
    userId = Number(req.params.userId);

    // Query the db for the rows that have a receiver_id equal to the userId
    con.query(tempSql, (err, results) => {
        // Strips packet of junk
        let data = stripResults(results);

        // Finds all the messages that need to be replied to
        data = findReplyMessages(data, userId);

        // Returns the final data set to the user
        res.status(200).json({messages: data});
    });

});


// Grabs all messages from db
router.get('/sent', (req,res) => {
    // Find all messages from database
    message_list = "CALL get_users_sent(?)";
    userId = req.params.userId;

    console.log(req.params);

    con.query(message_list, [userId], (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});




// Grabs all messages from db
router.get('/notifications', (req,res) => {
    // Find all messages from database
    message_list = "CALL get_user_notifications(?)";
    userId = req.params.userId;

    console.log(req.params);

    con.query(message_list, [userId], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.status(200).jsonp({results}).end;

    })
});

// Grabs all messages from db
router.get('/notifications/sent', (req,res) => {
    // Find all messages from database
    message_list = "CALL get_user_sent_notifications(?)";
    userId = req.params.userId;

    console.log(req.params);

    con.query(message_list, [userId], (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});
// Creates a new message
router.post('/', (req,res) => {
    const {sender,reciever,subject,body, msgType} = req.body;

    console.log(" new message sent from: " + sender + "to: "+reciever);
    if(false)
    {

    }else{
        // The messagename wasn't found in the database
        // Create insert query for new message
        // Added a comment
        new_message = "CALL add_message(?,?,?,?,?)";
        // Execute the query to insert into the database
        con.query(new_message,[sender,reciever,subject,body, msgType[0]], (err, results) => {
            if (err) throw err;
            res.status(201).jsonp({results}).end;
        })

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