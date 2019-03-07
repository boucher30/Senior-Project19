
use test;

DROP TABLE IF EXISTS buddylist;
CREATE TABLE IF NOT EXISTS buddylist (
	buddy_list_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    init_user_id1 INT UNSIGNED,
	bud_user_id2 INT UNSIGNED,

   PRIMARY KEY ( buddy_list_id )
)ENGINE=INNODB;

DROP TABLE IF EXISTS carveID;
CREATE TABLE IF NOT EXISTS carveID (
                                     carve_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
                                     user_id1 INT UNSIGNED,
                                     venue_id INT UNSIGNED,
                                     event_date DATE,
                                     sport       Enum('Snowboard','Skateboard','Surf','') NOT NULL DEFAULT '',
                                     user_id2 INT UNSIGNED DEFAULT '0',


                                     PRIMARY KEY ( carve_id )
)ENGINE=INNODB;

DROP TABLE IF EXISTS connectID;
CREATE TABLE IF NOT EXISTS connectID (
                                       connect_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
                                       user_id1 INT UNSIGNED,
                                       venue_id INT UNSIGNED,
                                       event_date DATE,
                                       sport       Enum('Snowboard','Skateboard','Surf','') NOT NULL DEFAULT '',
                                       user_id2 INT UNSIGNED DEFAULT '0',


                                       PRIMARY KEY ( connect_id )
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS connectionlist (
                                            connection_list_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
                                            init_user_id1 INT UNSIGNED,
                                            con_user_id2 INT UNSIGNED,

                                            PRIMARY KEY ( connection_list_id )
)ENGINE=INNODB;


DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
                                  user_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
                                  username VARCHAR(40) NOT NULL,
                                  pwd VARCHAR(40) NOT NULL,
                                  first_name VARCHAR(20) NOT NULL DEFAULT '',
                                  last_name VARCHAR(20) NOT NULL DEFAULT '',
                                  profile_type  Enum('Athlete','Photographer','') NOT NULL DEFAULT '',
                                  sport       Enum('Snowboard','Skateboard','Surf','') NOT NULL DEFAULT '',


                                  PRIMARY KEY ( user_id )
)ENGINE=INNODB;

DROP TABLE IF EXISTS venue;
CREATE TABLE IF NOT EXISTS venue (
                                   venue_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
                                   venue_name VARCHAR(40) NOT NULL DEFAULT '',
                                   venue_state VARCHAR(4) NOT NULL DEFAULT '',
                                   venue_sport       Enum('Snowboard','Skateboard','Surf','') NOT NULL DEFAULT '',


                                   PRIMARY KEY ( venue_id )
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS follow_venue (
                                          vfollow_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
                                          init_user_id1 INT UNSIGNED,
                                          venue_id INT UNSIGNED,

                                          PRIMARY KEY ( vfollow_id )
)ENGINE=INNODB;

Insert into buddylist(init_user_id1,bud_user_id2)
Values('1', '2');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('2', '1');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('2', '3');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('3', '2');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('5', '8');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('8', '5');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('5', '1');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('1', '5');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('4', '9');

Insert into buddylist(init_user_id1,bud_user_id2)
Values('9', '4');


Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('1','1','2019-03-15', 'Snowboard','2');

Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('2','1','2019-03-06', 'Snowboard','3');


Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('4','2','2019-04-15', 'Skateboard','2');

Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('7','2','2019-03-10', 'Skateboard','3');


Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('8','3','2019-03-11', 'Surf','2');

Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('1','3','2019-03-12', 'Surf','3');


Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('4','1','2019-03-20', 'Snowboard','2');

Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('2','1','2019-04-09', 'Snowboard','3');


Insert into connectID(user_id1, venue_id, event_date, sport, user_id2)
Values('1','1','2019-03-15', 'Snowboard','2');

Insert into connectID(user_id1, venue_id, event_date, sport, user_id2)
Values('1','1','2019-03-06', 'Snowboard','3');

Insert into connectID(user_id1, venue_id, event_date, sport, user_id2)
Values('2','3','2019-03-15', 'Snowboard','5');

Insert into connectID(user_id1, venue_id, event_date, sport, user_id2)
Values('3','3','2019-03-06', 'Snowboard','7');

Insert into connectID(user_id1, venue_id, event_date, sport, user_id2)
Values('5','2','2019-03-15', 'Snowboard','8');

Insert into connectID(user_id1, venue_id, event_date, sport, user_id2)
Values('4','2','2019-03-06', 'Snowboard','6');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('cmarcy',  'abc', 'Christian', 'Marcy', 'Athlete', 'Snowboard');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('frosty', 'abc','Sean', 'Klinglesmith', 'Photographer', 'Snowboard');

Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('shred', 'abc','Fred', 'Budde', 'Photographer', 'Surf');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('wheels','abc', 'Brandon', 'Wheeler', 'Athlete', 'Skateboard');

Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('radz', 'abc','RJ', 'Boucher', 'Athlete', 'Snowboard');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('moneyman','abc', 'Dhruv', 'Patel', 'Photographer', 'Skateboard');

Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('dragon', 'abc','Dylan', 'Anderson', 'Athlete', 'Surf');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('iceman', 'abc', 'MD', 'Monir', 'Photographer', 'Snowboard');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('cmarcy',  'abc', 'Christian', 'Marcy', 'Athlete', 'Snowboard');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('frosty', 'abc','Sean', 'Klinglesmith', 'Photographer', 'Snowboard');

Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('shred', 'abc','Fred', 'Budde', 'Photographer', 'Surf');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('wheels','abc', 'Brandon', 'Wheeler', 'Athlete', 'Skateboard');

Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('radz', 'abc','RJ', 'Boucher', 'Athlete', 'Snowboard');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('moneyman','abc', 'Dhruv', 'Patel', 'Photographer', 'Skateboard');

Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('dragon', 'abc','Dylan', 'Anderson', 'Athlete', 'Surf');


Insert into user(username, pwd, first_name, last_name, profile_type, sport)
Values('iceman', 'abc', 'MD', 'Monir', 'Photographer', 'Snowboard');

Insert into venue(venue_name,venue_state,venue_sport)
Values('Mt Snow',  'VT', 'Snowboard');

Insert into venue(venue_name,venue_state,venue_sport)
Values('The Incline Club',  'NJ', 'Skateboard');

Insert into venue(venue_name,venue_state,venue_sport)
Values('Rockaway Beach',  'CA', 'Surf');

Insert into follow_venue(init_user_id1, venue_id)
Values('1',  '1');

Insert into follow_venue(init_user_id1, venue_id)
Values('4',  '2');

Insert into follow_venue(init_user_id1, venue_id)
Values('3',  '3');

Insert into follow_venue(init_user_id1, venue_id)
Values('5',  '1');


