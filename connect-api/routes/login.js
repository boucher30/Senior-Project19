var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

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

module.exports = router;