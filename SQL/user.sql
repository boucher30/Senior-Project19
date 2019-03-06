/*made by sean klinglesmith 3/3/19
user table is parent. (login transaction)
profiles table is child. (data for profile page)
(to edit profile, join of these 2 will be needed.)
dependency keys not working atm, WIP. 
 */

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



SELECT * FROM user;
