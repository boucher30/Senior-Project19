var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken');


const passport = require('passport');

const passportJWT = require('passport-jwt');



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
                const user = -1;
                //req.flash('loginMessage', 'No user found.');
                res.status(202).jsonp({user, message: 'No such user found'}).end;
                console.log('logging in with username fail ' + results[0][0][0]);
            }
            else {
                const user = ({username: username, password: password});

                con.query(logi, [username, password], (err, results1) => {
                    console.log(results1[0][0][0]);
                    if (results1[0][0][0] == 0) {
                        const user = -3;
                        res.status(202).jsonp({user}).end;
                        //req.flash('loginMessage', 'Wrong password.');
                        console.log("passwordfail" + user);

                    }
                    else if(results1[0][0][0] <0)
                    {
                        const user = -2;

                        res.status(202).jsonp({user}).end;
                        console.log("user already logged in"+ user);

                    }
                    else {

                        const session = ({us: results1[0][0], username: username});
                        const payload = {session};
                        const token = jwt.sign(payload, jwtOptions.secretOrKey);
                        console.log("check" + JSON.stringify(results1[0][0]));

                        res.status(202).jsonp({ msg: 'ok', token: token}).end;
                    }

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