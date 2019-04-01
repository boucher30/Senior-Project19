-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CCv4get_users
-- -----------------------------------------------------
-- latest and greatest database.
DROP SCHEMA IF EXISTS `CCv4` ;

-- -----------------------------------------------------
-- Schema CCv4
--
-- latest and greatest database.
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CCv4` DEFAULT CHARACTER SET utf8mb4 ;
USE `CCv4` ;

-- -----------------------------------------------------
-- Table `CCv4`.`    USERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`    USERS` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`USERS` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `first_name` VARCHAR(20) NULL,
  `last_name` VARCHAR(20) NULL,
  `description` VARCHAR(100) NULL,
  `type` SET('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan') NOT NULL DEFAULT 'athlete',
  `snow_sports` SET('snowboard', 'ski', 'snowmobile') NULL,
  `water_sports` SET('surf', 'waterski') NULL,
  `land_sports` SET('skateboard', 'BMX', 'mountainBiking') NULL,
  `air_sports` SET('skyDive', 'hangGlide') NULL,
  `logged_in` TINYINT NULL DEFAULT 0,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`VENUES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`VENUES` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`VENUES` (
  `venue_id` INT NOT NULL AUTO_INCREMENT,
  `venue_name` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(2) NULL,
  `about` VARCHAR(200) NULL,
  `snow_sports` SET('snowboard', 'ski', 'snowmobile') NULL,
  `water_sports` SET('surf', 'waterski') NULL,
  `land_sports` SET('skateboard', 'BMX', 'mountainBiking') NULL,
  `air_sports` SET('skyDive', 'hangGlide') NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`venue_id`),
  UNIQUE INDEX `venue_id_UNIQUE` (`venue_id` ASC),
  UNIQUE INDEX `venue_name_UNIQUE` (`venue_name` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`CARVES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`CARVES` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`CARVES` (
  `carve_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `creator` INT NOT NULL,
  `venue` INT NULL,
  `type` SET('open', 'buddy') NOT NULL DEFAULT 'open',
  `max_athletes` INT NULL,
  `max_photo` INT NULL,
  `description` VARCHAR(200) NULL,
  `date` DATE NULL,
  `completed` TINYINT NULL,
  `sports` SET('snowboard', 'ski', 'snowmobile', 'surf', 'waterski', 'skyDive', 'hangGlide', 'skateboard', 'BMX', 'mountainBike') NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE INDEX `carve_id_UNIQUE` (`carve_id` ASC) ,
  PRIMARY KEY (`carve_id`),
  CONSTRAINT `creator`
    FOREIGN KEY (`creator`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `venue1`
    FOREIGN KEY (`venue`)
    REFERENCES `CCv4`.`VENUES` (`venue_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`MESSAGES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`MESSAGES` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`MESSAGES` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `message_subject` VARCHAR(50) NULL,
  `message_body` VARCHAR(500) NULL,
  `sender_Id` INT NOT NULL,
  `rec_Id` INT NOT NULL,
  `type` SET('normal', 'buddyRequest', 'buddyAccept', 'buddyDecline', 'attendRequest', 'attendAccept', 'attendDeny', 'invite', 'inviteAccept', 'inviteDeny', 'reply') NULL,
  `reply` INT NULL,
  `read` TINYINT NULL DEFAULT 0,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  UNIQUE INDEX `message_id_UNIQUE` (`message_id` ASC),
  INDEX `reply_idx` (`reply` ASC) ,
  CONSTRAINT `sender`
    FOREIGN KEY (`sender_Id`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `reciever`
    FOREIGN KEY (`rec_Id`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `reply`
    FOREIGN KEY (`reply`)
    REFERENCES `CCv4`.`MESSAGES` (`message_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`FOLLOWS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`FOLLOWS` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`FOLLOWS` (
  `follow_id` INT NOT NULL AUTO_INCREMENT,
  `user_id1` INT NOT NULL,
  `user_id2` INT NULL,
  `venue_id` INT NULL,
  `type` SET('buddy', 'follow', 'block') NULL,
  INDEX `venue9_idx` (`venue_id` ASC),
  PRIMARY KEY (`follow_id`),
  UNIQUE INDEX `follow_id_UNIQUE` (`follow_id` ASC),
  CONSTRAINT `user5`
    FOREIGN KEY (`user_id1`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `user6`
    FOREIGN KEY (`user_id2`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `venue9`
    FOREIGN KEY (`venue_id`)
    REFERENCES `CCv4`.`VENUES` (`venue_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`CARVE_ATTENDEES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`CARVE_ATTENDEES` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`CARVE_ATTENDEES` (
  `carve_attend_id` INT NOT NULL AUTO_INCREMENT,
  `carve` INT NOT NULL,
  `user` INT NOT NULL,
  `type` SET('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan') NOT NULL,
  INDEX `carve_idx` (`carve` ASC) ,
  INDEX `user_idx` (`user` ASC) ,
  PRIMARY KEY (`carve_attend_id`),
  UNIQUE INDEX `carve_attend_id_UNIQUE` (`carve_attend_id` ASC),
  CONSTRAINT `carve1`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv4`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user1`
    FOREIGN KEY (`user`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`MEDIA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`MEDIA` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`MEDIA` (
  `MEDIA_id` INT NOT NULL AUTO_INCREMENT,
  `poster` INT NOT NULL,
  `carve` INT NULL,
  `profile` INT NULL,
  `venue` INT NULL,
  `url` VARCHAR(50) NULL,
  `description` VARCHAR(100) NULL,
  `time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `venue_idx` (`venue` ASC) ,
  PRIMARY KEY (`MEDIA_id`),
  UNIQUE INDEX `MEDIA_id_UNIQUE` (`MEDIA_id` ASC) ,
  INDEX `user11_idx` (`profile` ASC) ,
  CONSTRAINT `carve4`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv4`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user4`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `venue4`
    FOREIGN KEY (`venue`)
    REFERENCES `CCv4`.`VENUES` (`venue_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `user11`
    FOREIGN KEY (`profile`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`COMMENTS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`COMMENTS` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`COMMENTS` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `carve` INT NULL,
  `MEDIA` INT NULL,
  `poster` INT NOT NULL,
  `comment` VARCHAR(200) NULL,
  `profile` INT NULL,
  INDEX `carve_idx` (`carve` ASC),
  INDEX `user_idx` (`poster` ASC) ,
  INDEX `MEDIA_idx` (`MEDIA` ASC) ,
  PRIMARY KEY (`comment_id`),
  UNIQUE INDEX `comment_id_UNIQUE` (`comment_id` ASC) ,
  INDEX `user10_idx` (`profile` ASC) ,
  CONSTRAINT `carve2`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv4`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user2`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `MEDIA1`
    FOREIGN KEY (`MEDIA`)
    REFERENCES `CCv4`.`MEDIA` (`MEDIA_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user10`
    FOREIGN KEY (`profile`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`LIKES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`LIKES` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`LIKES` (
  `like_id` INT NOT NULL AUTO_INCREMENT,
  `poster` INT NOT NULL,
  `type` SET('like', 'dislike') NOT NULL,
  `carve` INT NULL,
  `comment` INT NULL,
  `MEDIA` INT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `comment_idx` (`comment` ASC) ,
  INDEX `MEDIA_idx` (`MEDIA` ASC) ,
  PRIMARY KEY (`like_id`),
  UNIQUE INDEX `like_id_UNIQUE` (`like_id` ASC) ,
  CONSTRAINT `carve3`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv4`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user3`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv4`.`    USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `comment3`
    FOREIGN KEY (`comment`)
    REFERENCES `CCv4`.`COMMENTS` (`comment_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `MEDIA3`
    FOREIGN KEY (`MEDIA`)
    REFERENCES `CCv4`.`MEDIA` (`MEDIA_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `CCv4` ;

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_    USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_    USERS` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_VENUES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_VENUES` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_CARVES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_CARVES` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_MEDIA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_MEDIA` (`MEDIA_id` INT, `poster` INT, `carve` INT, `profile` INT, `venue` INT, `url` INT, `description` INT, `time` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_MESSAGES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_MESSAGES` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_LIKES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_LIKES` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_CARVE_ATTENDEES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_CARVE_ATTENDEES` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_FOLLOWS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_FOLLOWS` (`follow_id` INT, `user_id1` INT, `user_id2` INT, `venue_id` INT, `type` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_COMMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_COMMENTS` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`view1` (`type` INT);

-- -----------------------------------------------------
-- procedure add_user
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_user`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_user` (in uname VARCHAR(40), in emailAddress VARCHAR(40), in pass VARCHAR(40), in firstName VARCHAR(20), in lastName VARCHAR(20), in about VARCHAR(100), in profileType set ('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan')
,in winterSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'))
BEGIN
insert intoUSERS(username, email, password, first_name, last_name, description, type, snow_sports, water_sports, land_sports, air_sports)
Values(uname, emailAddress,pass,firstName,lastName,about,profileType,winterSports,waterSports,landSports,airSports);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_venue
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_venue`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_venue` (in vname VARCHAR(40),in cityNear VARCHAR(45), in st VARCHAR(2),in snowSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'), in des varchar(100))
BEGIN
insert into VENUES( venue_name,city,state,snow_sports,water_sports,land_sports,air_sports,about)
VALUES( vname,cityNear,st,snowSports,waterSports,landSports,airSports,des);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_carve
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_carve`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_carve` (in carveName varchar(40), in creatorId int, in venueId int, in carveType set ('open','buddy'), in athlete int, in photo int, in date date, 
in sportsAdd set ('snowboard','ski','snowmobile','surf','waterSki','skateboard','BMX','skydive','hangGlide'))
BEGIN
insert into CARVES(name, creator, venue, type, max_athletes, max_photo, date, completed, sports)
values(carveName,creatorId,venueId,carveType,athlete,photo,date,0,sportsAdd);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_message
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_message`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_message` (in sender int, in reciever int, in subject varchar(50), in body varchar(500), 
in msgType SET('normal','buddyRequest', 'buddyAccept', 'buddyDecline', 'attendRequest', 'attendAccept', 'attendDeny', 'invite', 'inviteAccept', 'inviteDeny', 'reply'))
BEGIN

insert into MESSAGES (sender_Id, rec_Id,message_subject,message_body, type)
values(sender,reciever,subject,body, msgType);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_comment
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_comment`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_comment` (in us int,in car int, in med int, in prof int, in com VARCHAR(100))
BEGIN
insert into COMMENTS (poster,carve,MEDIA,profile,comment)
values(us,car,med,prof,com);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure follow_user
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`follow_user`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `follow_user` (in follower int, in followed int)
BEGIN
insert into FOLLOWS(user_id1,user_id2, type)
values(follower,followed,'follow');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_    USERS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_users`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_users` ()
BEGIN
select * from all_USERS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_user`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_user` (in id int)
BEGIN
select * from all_USERS where user_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_user
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_user`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_user` (in id int, in uname VARCHAR(40), in emailAddress VARCHAR(40), in pass VARCHAR(40), in firstName VARCHAR(20), in lastName VARCHAR(20), in about VARCHAR(100), in profileType set ('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan')
,in snowSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'))
BEGIN
update USERS set 
username = uname,
email = emailAddress,
password = pass,
first_name = firstName,
last_name = lastName,
    USERS.description = about,
    USERS.type = profileType,
snow_sports = snowSports,
water_sports = waterSports,
land_sports = landSports,
air_sports = airSports
where user_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_    USERS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_    USERS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_    USERS` ()
BEGIN
delete from USERS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_    USERS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_    USERS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_    USERS` ()
BEGIN
select * from all_USERS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_user
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_user`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_user` (in id int)
BEGIN
delete from USERS where user_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_VENUES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_VENUES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_VENUES` ()
BEGIN
select * from all_VENUES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_VENUES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_VENUES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_VENUES` (in id int, in vname VARCHAR(40),in cityNear VARCHAR(45), in st VARCHAR(2),in snowSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'))
BEGIN
insert into VENUES( venue_name,city,state,snow_sports,water_sports,land_sports,air_sports)
VALUES( vname,cityNear,st,snowSports,waterSports,landSports,airSports);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_venue
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_venue`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_venue` (in id int, in vname VARCHAR(40),in cityNear VARCHAR(45), in st VARCHAR(2),in snowSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'), in des varchar(100))
BEGIN
update VENUES set
venue_name = vname,
city = cityNear,
state = st,
snow_sports = snowSports,
water_sports = waterSports,
land_sports = landSports,
air_sports = airSports,
about = des
where venue_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_VENUES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_VENUES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_VENUES` ()
BEGIN
delete from VENUES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_venue
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_venue`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_venue` (in id int)
BEGIN
delete from VENUES where venue_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venue
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_venue`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_venue` (in id int)
BEGIN
select * from VENUES where venue_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_MESSAGES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_MESSAGES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_MESSAGES` ()
BEGIN
select * from all_MESSAGES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_message
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_message`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_message` (in id int)
BEGIN
select * from MESSAGES where message_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_carve`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_carve` (in id int)
BEGIN
select * from CARVES where carve_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_CARVES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_CARVES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_CARVES` ()
BEGIN
select * from all_CARVES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_follow
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_follow`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_follow` (in id int)
BEGIN
select * from all_FOLLOWS where follow_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_FOLLOWS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_FOLLOWS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_FOLLOWS` ()
BEGIN
select * from all_FOLLOWS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_carve_attendee
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_carve_attendee`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_carve_attendee` (in car int, in us int, in userType SET('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan'))
BEGIN
insert into CARVE_ATTENDEES(carve, user, type)
values(car,us,userType);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_CARVE_ATTENDEES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_CARVE_ATTENDEES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_CARVE_ATTENDEES` ()
BEGIN
select * from all_CARVE_ATTENDEES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_CARVES_attendees
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_CARVES_attendees`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_CARVES_attendees` (in carveId int)
BEGIN
select * from all_CARVE_ATTENDEES where carve = carveId;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_    USERS_CARVES_attendee
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_USERS_CARVES_attendee`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_USERS_CARVES_attendee` (in userId int)
BEGIN
select * from all_CARVE_ATTENDEES where user = userId;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_like
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_like`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_like` (in id int, in lord SET('like', 'dislike'),in car int, in med int, in com int)
BEGIN

insert into LIKES (poster,type,carve,MEDIA,comment)
Values (id,lord,car,med,com);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_carve
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_carve`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_carve` (in id int)
BEGIN
delete from CARVES where carve_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_CARVES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_CARVES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_CARVES` ()
BEGIN
delete from CARVES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_CARVE_ATTENDEES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_CARVE_ATTENDEES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_CARVE_ATTENDEES` ()
BEGIN
delete from CARVE_ATTENDEES; 
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_COMMENTS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_COMMENTS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_COMMENTS` ()
BEGIN
delete from COMMENTS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_comment
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_comment`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_comment` (in comId int)
BEGIN
delete from COMMENTS where comment_id = comId;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_carve_attendee
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_carve_attendee`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_carve_attendee` (in id int)
BEGIN
delete from CARVE_ATTENDEES where carve_attend_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_follow
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_follow`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_follow` (in id int)
BEGIN
delete from FOLLOWS where follow_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_FOLLOWS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_FOLLOWS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_FOLLOWS` ()
BEGIN
delete from FOLLOWS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_like
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_like`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_like` (in id int)
BEGIN
delete from LIKES where like_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_LIKES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_LIKES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_LIKES` ()
BEGIN
delete from LIKES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_MEDIA
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_MEDIA`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_MEDIA` (in id int, in ur varchar(50), in des varchar(100), in car int, in ven int, in pro int)
BEGIN

insert into MEDIA(poster,url, description, carve, venue, profile)
VALUES(id,ur,des,car,ven,pro);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_medi
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_medi`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_medi` (in id int)
BEGIN
delete from MEDIA where MEDIA_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_MEDIA
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_MEDIA`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_MEDIA` ()
BEGIN
delete from MEDIA;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_COMMENTS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_COMMENTS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_COMMENTS` ()
BEGIN
select * from all_COMMENTS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_COMMENTS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_user_COMMENTS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_user_COMMENTS` (in id int)
BEGIN
select * from all_COMMENTS where poster = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_MESSAGES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_MESSAGES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_MESSAGES` ()
BEGIN
delete from MESSAGES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_message
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_message`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_message` (in id int)
BEGIN
delete from MESSAGES where message_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure follow_venue
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`follow_venue`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `follow_venue` (in follower int, in ven int)
BEGIN
insert into FOLLOWS(user_id1,venue_id, type)
values(follower,ven,'follow');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_buddy
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_buddy`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_buddy` (in user1 int, in user2 int)
BEGIN
insert into FOLLOWS(user_id1,user_id2,type)
values(user1,user2,'Buddy');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_carve_attendee
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_carve_attendee`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_carve_attendee` (in id int, in car int, in us int, in userType SET('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan'))
BEGIN
update CARVE_ATTENDEES
set
carve = car,
user = us,
type = userType
where carve_attend_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_carve
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_carve`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_carve` (in id int, in carveName varchar(40), in creatorId int, in venueId int, in carveType set ('open','buddy'), in athlete int, in photo int, in dat date, in com tinyint, 
in sportsAdd set ('snowboard','ski','snowmobile','surf','waterSki','skateboard','BMX','skydive','hangGlide'))
BEGIN
update CARVES
set 
name = carveName, creator = creatorId, venue = venueId,
type = carveType, max_athletes = athlete, max_photo = photo,
date = dat, completed = com, sports = sportsAdd
where carve_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_CARVES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_CARVES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_CARVES` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_CARVE_ATTENDEES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_CARVE_ATTENDEES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_CARVE_ATTENDEES` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_COMMENTS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_COMMENTS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_COMMENTS` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_comment
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_comment`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_comment` (in id int, in us int,in car int, in med int, in prof int, in com VARCHAR(100))
BEGIN

update COMMENTS 
set 
poster = us,
carve= car,
MEDIA = med,
profile =prof,
comment = com
where comment_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_FOLLOWS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_FOLLOWS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_FOLLOWS` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_follow
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_follow`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_follow` (in id int, in user1 int, in user2 int, in ven int,in ty SET('buddy', 'follow', 'block'))
BEGIN
update FOLLOWS
set 
user_id1 = user1, user_id2 = user2,
venue_id = ven, type = ty
where follow_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_follow
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_follow`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_follow` (in user1 int, in user2 int, in ven int,in ty SET('buddy', 'follow', 'block'))
BEGIN
insert into FOLLOWS (user_id1, user_id2, venue_id, type)
values (user1, user2, ven, ty);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_LIKES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_LIKES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_LIKES` ()
BEGIN
select * from all_LIKES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_like
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_like`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_like` (in id int)
BEGIN
select* from LIKES where like_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_comment
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_comment`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_comment` (in id int)
BEGIN
select * from all_COMMENTS where comment_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_MEDIA
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_MEDIA`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_MEDIA` ()
BEGIN
select * from all_MEDIA;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_medi
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_medi`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_medi` (in id int)
BEGIN
select * from all_MEDIA where MEDIA_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_medi
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_medi`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_medi` (in id int, in pos int, in ur varchar(50), in des varchar(100), in car int, in ven int, in pro int)
BEGIN
update MEDIA
set
poster = pos, url = ur, description = des,
carve = car, venue = ven, profile = pro
where MEDIA_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_LIKES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_LIKES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_LIKES` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_like
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_like`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_like` (in id int, in pos int, in lord SET('like', 'dislike'),in car int, in med int, in com int)
BEGIN
update LIKES
set
poster = pos, type = lord, carve = car,
MEDIA = med, comment = com 
where like_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_MEDIA
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_MEDIA`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_MEDIA` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_MESSAGES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_MESSAGES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_MESSAGES` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_message
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_message`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_message` (in id int, in sender int, in reciever int, in subject varchar(50), in body varchar(500), 
in msgType SET('normal','buddyRequest', 'buddyAccept', 'buddyDecline', 'attendRequest', 'attendAccept', 'attendDeny', 'invite', 'inviteAccept', 'inviteDeny', 'reply'))
BEGIN
update MESSAGES
set
sender_id = sender, rec_id = reciever, message_subject = subject,
message_body = body, type = msgType
where message_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_attendee
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_carve_attendee`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_carve_attendee` (in id int)
BEGIN
select * from all_CARVE_ATTENDEES where carve_attend_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure username_check
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`username_check`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `username_check` (in usr varchar(40))
BEGIN
if exists(select * from USERS where username = usr)
		then 
        select user_Id from USERS where username = usr;
        
else
	select 0;
end if;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure password_check
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`password_check`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `password_check` (in usr VARCHAR(40), in pass VARCHAR(40), out userId int)
BEGIN
if exists(select password from USERS where username = usr and password = pass and logged_in = 0) then
update USERS set logged_in = 1 where username = usr;
 select user_Id from USERS where username = usr;
elseif exists(select password from USERS where username = usr and password = pass and logged_in = 1) then
select -2;
else
select 0;
end if;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venue_carve
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_venue_carve`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_venue_carve` (in id int)
BEGIN
select * from all_CARVES where venue =id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_follow_venue
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_follow_venue`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_follow_venue` (in id int, in ven int, in usr int)
BEGIN
update FOLLOWS
set 
user_id1 = usr, 
venue_id = ven, type = 'follow'
where follow_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_venue_follow
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_venue_follow`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_venue_follow` (in ven int, in usr int)
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venue_followers
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_venue_followers`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_venue_followers` (in ven int)
BEGIN
select * from FOLLOWS where venue_id = ven;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_buddies
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_buddies`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_buddies` (in usr int)
BEGIN
select user_Id2 from FOLLOWS where user_Id1 = usr and type ='buddy';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_followed
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_user_followed`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_user_followed` (in id int)
BEGIN
select user_Id2 from FOLLOWS where user_Id1 = id and type ='follow' and user_Id2 > 0  ;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_followers
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_user_followers`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_user_followers` (in id int )
BEGIN
select user_Id1 from FOLLOWS where user_Id2 = id and type ='follow' and user_Id1 > 0;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_VENUES_followed
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_VENUES_followed`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_VENUES_followed` (in id int)
BEGIN
select venue_Id from FOLLOWS where user_Id1 = 1 and venue_Id > 0;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_    USERS_MESSAGES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_USERS_MESSAGES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_USERS_MESSAGES` (in id int)
BEGIN
select * from all_MESSAGES where sender_id = id or rec_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_    USERS_inbox
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_USERS_inbox`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_USERS_inbox` (in id int)
BEGIN
select * from all_MESSAGES where rec_id = id and (type = 'normal' or type = 'reply');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_    USERS_sent
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_    USERS_sent`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_    USERS_sent` (in id int)
BEGIN
select * from all_MESSAGES where sender_id = id and (type = 'normal' or type = 'reply');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_    USERS_created_CARVES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_    USERS_created_CARVES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_    USERS_created_CARVES` (in id int)
BEGIN
select * from CARVES where creator = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_MESSAGES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_user_MESSAGES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_user_MESSAGES` (in id int)
BEGIN
select * from MESSAGES where rec_Id = id ;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure logout
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`logout`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `logout` (in usr int)
BEGIN
update USERS set logged_in = 0 where user_id  = usr;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure logout_all
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`logout_all`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `logout_all` ()
BEGIN
update USERS set logged_in = 0;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_open_CARVES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_open_CARVES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_open_CARVES` ()
BEGIN
select * from all_CARVES where type = 'open';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_notifications
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_user_notifications`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_user_notifications` (in id int)
BEGIN
select * from MESSAGES where rec_id = id and (type != 'normal' and type !='reply');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_sent_notifications
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_user_sent_notifications`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_user_sent_notifications` (in id int)
BEGIN
select * from MESSAGES where sender_id = id and (type != 'normal' and type !='reply');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_COMMENTS
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_carve_COMMENTS`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_carve_COMMENTS` (in id int)
BEGIN
select * from all_COMMENTS where carve = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_MEDIA
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_carve_MEDIA`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_carve_MEDIA` (in id int)
BEGIN
select * from all_MEDIA where carve = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve1
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_carve1`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_carve1` (in id int)
BEGIN
select * from CARVES where carve_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_attended
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_user_attended`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_user_attended` (in id int)
BEGIN
select * from CARVES where carve_id  in (select carve from CARVE_ATTENDEES where user = 1);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_LIKES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_carve_LIKES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_carve_LIKES` (in id int)
BEGIN
select * from all_LIKES where carve = id and type = 'like';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_disLIKES
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_carve_disLIKES`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_carve_disLIKES` (in id int)
BEGIN
select * from all_LIKES where carve = id and type = 'dislike';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `CCv4`.`all_    USERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_USERS`;
DROP VIEW IF EXISTS `CCv4`.`all_USERS` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_USERS` AS
select * from USERS;

-- -----------------------------------------------------
-- View `CCv4`.`all_VENUES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_VENUES`;
DROP VIEW IF EXISTS `CCv4`.`all_VENUES` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_VENUES` AS
select * from VENUES;

-- -----------------------------------------------------
-- View `CCv4`.`all_CARVES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_CARVES`;
DROP VIEW IF EXISTS `CCv4`.`all_CARVES` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_CARVES` AS 
select * from CARVES;

-- -----------------------------------------------------
-- View `CCv4`.`all_MEDIA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_MEDIA`;
DROP VIEW IF EXISTS `CCv4`.`all_MEDIA` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_MEDIA` AS
select * from MEDIA;

-- -----------------------------------------------------
-- View `CCv4`.`all_MESSAGES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_MESSAGES`;
DROP VIEW IF EXISTS `CCv4`.`all_MESSAGES` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_MESSAGES` AS
select * from MESSAGES;

-- -----------------------------------------------------
-- View `CCv4`.`all_LIKES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_LIKES`;
DROP VIEW IF EXISTS `CCv4`.`all_LIKES` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_LIKES` AS
select * from LIKES;

-- -----------------------------------------------------
-- View `CCv4`.`all_CARVE_ATTENDEES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_CARVE_ATTENDEES`;
DROP VIEW IF EXISTS `CCv4`.`all_CARVE_ATTENDEES` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_CARVE_ATTENDEES` AS
select * from CARVE_ATTENDEES;

-- -----------------------------------------------------
-- View `CCv4`.`all_FOLLOWS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_FOLLOWS`;
DROP VIEW IF EXISTS `CCv4`.`all_FOLLOWS` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_FOLLOWS` AS
select * from FOLLOWS;

-- -----------------------------------------------------
-- View `CCv4`.`all_COMMENTS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_COMMENTS`;
DROP VIEW IF EXISTS `CCv4`.`all_COMMENTS` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_COMMENTS` AS
select * from COMMENTS;

-- -----------------------------------------------------
-- View `CCv4`.`view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`view1`;
DROP VIEW IF EXISTS `CCv4`.`view1` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `view1` AS
select type from LIKES;
SET SQL_MODE = '';
DROP USER IF EXISTS nodeuser;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'nodeuser' IDENTIFIED BY 'Nodeuser@1234';

GRANT ALL ON `CCv4`.* TO 'nodeuser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- begin attached script 'script'
ALTER USER 'nodeuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Nodeuser@1234';
-- end attached script 'script'
