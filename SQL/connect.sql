DROP TABLE IF EXISTS connect;
CREATE TABLE IF NOT EXISTS connectID (
	connect_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    user_id1 INT UNSIGNED,
    venue_id INT UNSIGNED,
    sport       Enum('Snowboard','Skateboard','Surf','') NOT NULL DEFAULT '',
	user_id2 INT UNSIGNED DEFAULT '0',
    
   
   PRIMARY KEY ( connect_id )
)ENGINE=INNODB;

Insert into connectID(user_id1, venue_id, sport, user_id2)
Values('1','1','Snowboard','2');

Select* from connectID;