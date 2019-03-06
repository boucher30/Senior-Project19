DROP TABLE IF EXISTS carve;
CREATE TABLE IF NOT EXISTS carveID (
	carve_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    user_id1 INT UNSIGNED,
    venue_id INT UNSIGNED,
    event_date DATE,
    sport       Enum('Snowboard','Skateboard','Surf','') NOT NULL DEFAULT '',
	user_id2 INT UNSIGNED DEFAULT '0',
    
   
   PRIMARY KEY ( carve_id )
)ENGINE=INNODB;

Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('1','1','2019-03-15', 'Snowboard','2');

Insert into carveID(user_id1, venue_id, event_date, sport, user_id2)
Values('1','1','2019-03-06', 'Snowboard','3');

Select* from carveID;