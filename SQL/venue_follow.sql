CREATE TABLE IF NOT EXISTS follow_venue (
	vfollow_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    init_user_id1 INT UNSIGNED,
	venue_id INT UNSIGNED,
      
   PRIMARY KEY ( vfollow_id )
)ENGINE=INNODB;

Insert into follow_venue(init_user_id1, venue_id)
Values('1',  '1');


select * from follow_venue; 