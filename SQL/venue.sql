DROP TABLE IF EXISTS venue;
CREATE TABLE IF NOT EXISTS venue (
	venue_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    venue_name VARCHAR(40) NOT NULL DEFAULT '',
    venue_state VARCHAR(4) NOT NULL DEFAULT '',
    venue_sport       Enum('Snowboard','Skateboard','Surf','') NOT NULL DEFAULT '',

   
   PRIMARY KEY ( venue_id )
)ENGINE=INNODB;

Insert into venue(venue_name,venue_state,venue_sport)
Values('Mt Snow',  'VT', 'Snowboard');

Select* from venue;