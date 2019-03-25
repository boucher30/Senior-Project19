var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

module.exports = router;