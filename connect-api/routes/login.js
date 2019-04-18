var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken');


const passport = require('passport');

const passportJWT = require('passport-jwt');

const session = require('../server');

const ExtractJwt = passportJWT.ExtractJwt;

const JwtStrategy = passportJWT.Strategy;


const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

jwtOptions.secretOrKey = 'wowwow';

/*
router.post('/', (req, res) => {
    const {username, password} = req.body;
    console.log(username +" "+ password);
    userCheck = "Call username_check(?)";
    logi = "Call password_check(?,?,@userId)";

    con.query(userCheck,[username], (err,results)=> {
        if (results[0][0][0] == 0) {
            const use = -1;
            res.status(202).jsonp({use}).end;
            console.log('logging in with username fail ' + results[0][0][0]);
        }


        else {




            con.query(logi,[username,password],(err, results1) => {
                console.log(results1[0][0][0]);
                if(results1[0][0][0] == 0)
                {
                    const use = results1[0][0][0];
                    res.status(202).jsonp({use}).end;
                    console.log("passwordfail"+ use);

                }
                else if(results1[0][0][0] < 0)
                {
                    const use = -2;

                    res.status(202).jsonp({use}).end;
                    console.log("user already logged in"+ use);

                }
                else
                {

                    console.log("check"+ results[0][0]);
                    const use = results1[0][0].user_Id;
                    res.status(202).jsonp({use}).end;
                }

            })

        }

    });

});
*/


router.post('/', async function(req, res, next) {

    const { username, password } = req.body;
    console.log(username +" "+ password);
    userCheck = "Call username_check(?)";
    logi = "Call password_check(?,?,@userId)";

    if (username && password) {

        con.query(userCheck, [username], (err, results) => {
            if (results[0][0][0] == 0) {
                const userId = -1;
                //req.flash('loginMessage', 'No user found.');
                const session = ({us: userId});
                const payload = {session};
                const token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.status(202).jsonp({token, message: 'No such user found'}).end;
                console.log('logging in with username fail ' + results[0][0]);
            }
            else {


                con.query(logi, [username, password], (err, results1) => {
                    console.log(results1[0][0]);
                    var  userId = 0;
                    if(results1[0][0].user_Id >0) {
                        userId = results1[0][0].user_Id;
                    }
                    else if(results1[0][0][0] === 0)
                    {
                        userId = 0;
                    }
                    else
                    {
                        userId = -2;
                    }

                        const session = ({us: userId, username: username});
                        const payload = {session};
                        const token = jwt.sign(payload, jwtOptions.secretOrKey);
                        console.log("username exists" + JSON.stringify(results1[0][0]));



                        res.status(202).jsonp({ msg: 'ok', token: token}).end;



                });
                const user = ({username: username, password: password});

                passport.serializeUser((user, done) => {
                    console.log('Inside serializeUser callback. User id is save to the session file store here');
                    done(null, user.id);
                });

                passport.authenticate('local', (err, user, info) => {
                    console.log('Inside passport.authenticate() callback');
                    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
                    console.log(`req.user: ${JSON.stringify(req.user)}`);
                    req.login(user, (err) => {
                        console.log('Inside req.login() callback');
                        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
                        console.log(`req.user: ${JSON.stringify(req.user)}`);
                        return res.send('You were authenticated & logged in!\n');
                    })

                });
            }
        })

    }
});


// protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {

    res.json('Success! You can now see this without a token.');

});

module.exports = router;