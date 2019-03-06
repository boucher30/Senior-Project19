DROP TABLE IF EXISTS carve;
CREATE TABLE IF NOT EXISTS carveID (
	carve_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    user_id1 INT UNSIGNED,
    venue_id INT UNSIGNED,
    sport       Enum('Snowboard','Skateboard','Surf','') NOT NULL DEFAULT '',
	user_id2 INT UNSIGNED DEFAULT '0',
    
   
   PRIMARY KEY ( carve_id )
)ENGINE=INNODB;

Insert into carveID(user_id1, venue_id, sport, user_id2)
Values('1','1','Snowboard','2');

Select* from carveID;