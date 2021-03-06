-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CCv5
-- -----------------------------------------------------
-- latest and greatest database.
DROP SCHEMA IF EXISTS `CCv5` ;

-- -----------------------------------------------------
-- Schema CCv5
--
-- latest and greatest database.
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CCv5` DEFAULT CHARACTER SET utf8mb4 ;
USE `CCv5` ;

-- -----------------------------------------------------
-- Table `CCv5`.`USERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`USERS` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`USERS` (
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
  `photo` VARCHAR(45) NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv5`.`VENUES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`VENUES` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`VENUES` (
  `venue_id` INT NOT NULL AUTO_INCREMENT,
  `venue_name` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(2) NULL,
  `about` VARCHAR(200) NULL,
  `snow_sports` SET('snowboard', 'ski', 'snowmobile') NULL,
  `water_sports` SET('surf', 'waterski') NULL,
  `land_sports` SET('skateboard', 'BMX', 'mountainBiking') NULL,
  `air_sports` SET('skyDive', 'hangGlide') NULL,
  `lattitude` VARCHAR(45) NULL,
  `longitude` VARCHAR(45) NULL,
  `url` VARCHAR(100) NULL,
  `picture` VARCHAR(45) NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`venue_id`),
  UNIQUE INDEX `venue_id_UNIQUE` (`venue_id` ASC) ,
  UNIQUE INDEX `venue_name_UNIQUE` (`venue_name` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv5`.`CARVES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`CARVES` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`CARVES` (
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
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `venue1`
    FOREIGN KEY (`venue`)
    REFERENCES `CCv5`.`VENUES` (`venue_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv5`.`FOLLOWS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`FOLLOWS` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`FOLLOWS` (
  `follow_id` INT NOT NULL AUTO_INCREMENT,
  `user_id1` INT NOT NULL,
  `user_id2` INT NULL,
  `venue_id` INT NULL,
  `type` SET('buddy', 'follow', 'block') NULL,
  INDEX `venue9_idx` (`venue_id` ASC) ,
  PRIMARY KEY (`follow_id`),
  UNIQUE INDEX `follow_id_UNIQUE` (`follow_id` ASC) ,
  CONSTRAINT `user5`
    FOREIGN KEY (`user_id1`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `user6`
    FOREIGN KEY (`user_id2`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `venue9`
    FOREIGN KEY (`venue_id`)
    REFERENCES `CCv5`.`VENUES` (`venue_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv5`.`CARVE_ATTENDEES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`CARVE_ATTENDEES` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`CARVE_ATTENDEES` (
  `carve_attend_id` INT NOT NULL AUTO_INCREMENT,
  `carve` INT NOT NULL,
  `user` INT NOT NULL,
  `type` SET('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan') NOT NULL,
  INDEX `carve_idx` (`carve` ASC) ,
  INDEX `user_idx` (`user` ASC) ,
  PRIMARY KEY (`carve_attend_id`),
  UNIQUE INDEX `carve_attend_id_UNIQUE` (`carve_attend_id` ASC) ,
  CONSTRAINT `carve1`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv5`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user1`
    FOREIGN KEY (`user`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv5`.`COMMENTS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`COMMENTS` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`COMMENTS` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `carve` INT NULL,
  `media` INT NULL,
  `poster` INT NOT NULL,
  `comment` VARCHAR(200) NULL,
  `profile` INT NULL,
  INDEX `carve_idx` (`carve` ASC) ,
  INDEX `user_idx` (`poster` ASC) ,
  PRIMARY KEY (`comment_id`),
  UNIQUE INDEX `comment_id_UNIQUE` (`comment_id` ASC) ,
  INDEX `user10_idx` (`profile` ASC) ,
  CONSTRAINT `carve2`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv5`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user2`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `user10`
    FOREIGN KEY (`profile`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv5`.`LIKES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`LIKES` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`LIKES` (
  `like_id` INT NOT NULL AUTO_INCREMENT,
  `poster` INT NOT NULL,
  `type` SET('like', 'dislike') NOT NULL,
  `carve` INT NULL,
  `comment` INT NULL,
  `media` INT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `comment_idx` (`comment` ASC) ,
  PRIMARY KEY (`like_id`),
  UNIQUE INDEX `like_id_UNIQUE` (`like_id` ASC) ,
  CONSTRAINT `carve3`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv5`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user3`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `comment3`
    FOREIGN KEY (`comment`)
    REFERENCES `CCv5`.`COMMENTS` (`comment_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv5`.`MEDIA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`MEDIA` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`MEDIA` (
  `media_id` INT NOT NULL AUTO_INCREMENT,
  `poster` INT NULL,
  `carve` INT NULL,
  `profile` INT NULL,
  `venue` INT NULL,
  `url` VARCHAR(45) NULL,
  `description` VARCHAR(200) NULL,
  `time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`media_id`),
  INDEX `venue_idx` (`venue` ASC) ,
  INDEX `profile_idx` (`profile` ASC) ,
  INDEX `user4_idx` (`poster` ASC) ,
  INDEX `carve4_idx` (`carve` ASC) ,
  CONSTRAINT `venue4`
    FOREIGN KEY (`venue`)
    REFERENCES `CCv5`.`VENUES` (`venue_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user11`
    FOREIGN KEY (`profile`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user4`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `carve4`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv5`.`CARVES` (`carve_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv5`.`MESSAGES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`MESSAGES` ;

CREATE TABLE IF NOT EXISTS `CCv5`.`MESSAGES` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NULL,
  `rec_id` INT NULL,
  `message_subject` VARCHAR(50) NULL,
  `message_body` VARCHAR(500) NULL,
  `type` SET('normal', 'buddyRequest', 'buddyAccept', 'buddyDecline', 'attendRequest', 'attendAccept', 'attendDeny', 'invite', 'inviteAccept', 'inviteDeny', 'reply') NULL,
  `reply` INT NULL,
  `read` TINYINT NULL,
  `carve` INT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  INDEX `sender_idx` (`sender_id` ASC) ,
  INDEX `reciever_idx` (`rec_id` ASC) ,
  INDEX `carve_idx` (`carve` ASC) ,
  INDEX `reply_idx` (`reply` ASC) ,
  CONSTRAINT `sender`
    FOREIGN KEY (`sender_id`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `reciever`
    FOREIGN KEY (`rec_id`)
    REFERENCES `CCv5`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `carve`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv5`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `reply`
    FOREIGN KEY (`reply`)
    REFERENCES `CCv5`.`MESSAGES` (`message_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `CCv5` ;

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_users` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_venues`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_venues` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_carves`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_carves` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_media` (`media_id` INT, `poster` INT, `carve` INT, `profile` INT, `venue` INT, `url` INT, `description` INT, `time` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_messages` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_likes` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_carve_attendees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_carve_attendees` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_follows`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_follows` (`follow_id` INT, `user_id1` INT, `user_id2` INT, `venue_id` INT, `type` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`all_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`all_comments` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv5`.`view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv5`.`view1` (`type` INT);

-- -----------------------------------------------------
-- procedure add_user
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_user`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_user` (in uname VARCHAR(40), in emailAddress VARCHAR(40), in pass VARCHAR(40), in firstName VARCHAR(20), in lastName VARCHAR(20), in about VARCHAR(100), in profileType set ('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan')
,in winterSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'))
BEGIN
insert into USERS(username, email, password, first_name, last_name, description, type, snow_sports, water_sports, land_sports, air_sports)
Values(uname, emailAddress,pass,firstName,lastName,about,profileType,winterSports,waterSports,landSports,airSports);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_venue
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_venue`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_venue` (in vname VARCHAR(40),in cityNear VARCHAR(45), in st VARCHAR(2),in snowSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'), in des varchar(100))
BEGIN
insert into VENUES( venue_name,city,state,snow_sports,water_sports,land_sports,air_sports,about)
VALUES( vname,cityNear,st,snowSports,waterSports,landSports,airSports,des);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_carve
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_carve`;

DELIMITER $$
USE `CCv5`$$
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

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_message`;

DELIMITER $$
USE `CCv5`$$
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

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_comment`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_comment` (in us int,in car int, in med int, in prof int, in com VARCHAR(100))
BEGIN
insert into COMMENTS (poster,carve,media,profile,comment)
values(us,car,med,prof,com);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure follow_user
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`follow_user`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `follow_user` (in follower int, in followed int)
BEGIN
insert into FOLLOWS(user_id1,user_id2, type)
values(follower,followed,'follow');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_users`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_users` ()
BEGIN
select * from all_users;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_user`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_user` (in id int)
BEGIN
select * from all_users where user_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_user
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_user`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_user` (in id int, in uname VARCHAR(40), in emailAddress VARCHAR(40), in pass VARCHAR(40), in firstName VARCHAR(20), in lastName VARCHAR(20), in about VARCHAR(100), in profileType set ('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan')
,in snowSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'))
BEGIN
update USERS set 
username = uname,
email = emailAddress,
password = pass,
first_name = firstName,
last_name = lastName,
users.description = about,
users.type = profileType,
snow_sports = snowSports,
water_sports = waterSports,
land_sports = landSports,
air_sports = airSports
where user_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_users
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_users`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_users` ()
BEGIN
delete from USERS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_users
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_users`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_users` ()
BEGIN
select * from all_users;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_user
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_user`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_user` (in id int)
BEGIN
delete from USERS where user_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venues
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_venues`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_venues` ()
BEGIN
select * from all_venues;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_venues
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_venues`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_venues` (in id int, in vname VARCHAR(40),in cityNear VARCHAR(45), in st VARCHAR(2),in snowSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'))
BEGIN
insert into VENUES( venue_name,city,state,snow_sports,water_sports,land_sports,air_sports)
VALUES( vname,cityNear,st,snowSports,waterSports,landSports,airSports);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_venue
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_venue`;

DELIMITER $$
USE `CCv5`$$
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
-- procedure delete_venues
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_venues`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_venues` ()
BEGIN
delete from VENUES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_venue
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_venue`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_venue` (in id int)
BEGIN
delete from VENUES where venue_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venue
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_venue`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_venue` (in id int)
BEGIN
select * from all_venues where venue_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_messages
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_messages`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_messages` ()
BEGIN
select * from all_messages;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_message
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_message`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_message` (in id int)
BEGIN
select * from all_messages where message_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carve`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carve` (in id int)
BEGIN
select * from carves where carve_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carves
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carves`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carves` ()
BEGIN
select * from all_carves;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_follow
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_follow`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_follow` (in id int)
BEGIN
select * from all_follows where follow_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_follows
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_follows`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_follows` ()
BEGIN
select * from all_follows;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_carve_attendee
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_carve_attendee`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_carve_attendee` (in car int, in us int, in userType SET('photographer', 'filmographer', 'droneOperator', 'athlete', 'proAthlete', 'fan'))
BEGIN
insert into CARVE_ATTENDEES(carve, user, type)
values(car,us,userType);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_attendees
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carve_attendees`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carve_attendees` ()
BEGIN
select * from all_carve_attendees;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carves_attendees
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carves_attendees`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carves_attendees` (in carveId int)
BEGIN
select * from all_carve_attendees where carve = carveId;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users_carves_attendee
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_users_carves_attendee`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_users_carves_attendee` (in userId int)
BEGIN
select * from all_carve_attendees where user = userId;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_like
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_like`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_like` (in id int, in lord SET('like', 'dislike'),in car int, in med int, in com int)
BEGIN

insert into LIKES (poster,type,carve,media,comment)
Values (id,lord,car,med,com);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_carve
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_carve`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_carve` (in id int)
BEGIN
delete from CARVES where carve_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_carves
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_carves`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_carves` ()
BEGIN
delete from CARVES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_carve_attendees
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_carve_attendees`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_carve_attendees` ()
BEGIN
delete from CARVE_ATTENDEES; 
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_comments
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_comments`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_comments` ()
BEGIN
delete from COMMENTS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_comment
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_comment`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_comment` (in comId int)
BEGIN
delete from COMMENTS where comment_id = comId;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_carve_attendee
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_carve_attendee`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_carve_attendee` (in id int)
BEGIN
delete from CARVE_ATTENDEES where carve_attend_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_follow
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_follow`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_follow` (in id int)
BEGIN
delete from FOLLOWS where follow_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_follows
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_follows`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_follows` ()
BEGIN
delete from FOLLOWS;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_like
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_like`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_like` (in id int)
BEGIN
delete from LIKES where like_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_likes
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_likes`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_likes` ()
BEGIN
delete from LIKES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_media
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_media`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_media` (in id int, in ur varchar(50), in des varchar(100), in car int, in ven int, in pro int)
BEGIN

insert into MEDIA(poster,url, description, carve, venue, profile)
VALUES(id,ur,des,car,ven,pro);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_medi
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_medi`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_medi` (in id int)
BEGIN
delete from MEDIA where media_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_media
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_media`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_media` ()
BEGIN
delete from MEDIA;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_comments
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_comments`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_comments` ()
BEGIN
select * from all_comments;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_comments
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_user_comments`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_user_comments` (in id int)
BEGIN
select * from all_comments where poster = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_messages
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_messages`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_messages` ()
BEGIN
delete from MESSAGES;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_message
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`delete_message`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `delete_message` (in id int)
BEGIN
delete from MESSAGES where message_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure follow_venue
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`follow_venue`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `follow_venue` (in follower int, in ven int)
BEGIN
insert into FOLLOWS(user_id1,venue_id, type)
values(follower,ven,'follow');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_buddy
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_buddy`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_buddy` (in user1 int, in user2 int)
BEGIN
insert into FOLLOWS(user_id1,user_id2,type)
values(user1,user2,'Buddy');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_carve_attendee
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_carve_attendee`;

DELIMITER $$
USE `CCv5`$$
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

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_carve`;

DELIMITER $$
USE `CCv5`$$
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
-- procedure update_carves
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_carves`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_carves` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_carve_attendees
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_carve_attendees`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_carve_attendees` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_comments
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_comments`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_comments` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_comment
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_comment`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_comment` (in id int, in us int,in car int, in med int, in prof int, in com VARCHAR(100))
BEGIN

update COMMENTS 
set 
poster = us,
carve= car,
media = med,
profile =prof,
comment = com
where comment_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_follows
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_follows`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_follows` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_follow
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_follow`;

DELIMITER $$
USE `CCv5`$$
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

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_follow`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_follow` (in user1 int, in user2 int, in ven int,in ty SET('buddy', 'follow', 'block'))
BEGIN
insert into FOLLOWS (user_id1, user_id2, venue_id, type)
values (user1, user2, ven, ty);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_likes
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_likes`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_likes` ()
BEGIN
select * from all_likes;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_like
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_like`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_like` (in id int)
BEGIN
select* from all_likes where like_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_comment
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_comment`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_comment` (in id int)
BEGIN
select * from all_comments where comment_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_media
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_media`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_media` ()
BEGIN
select * from all_media;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_medi
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_medi`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_medi` (in id int)
BEGIN
select * from all_media where media_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_medi
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_medi`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_medi` (in id int, in pos int, in ur varchar(50), in des varchar(100), in car int, in ven int, in pro int)
BEGIN
update MEDIA
set
poster = pos, url = ur, description = des,
carve = car, venue = ven, profile = pro
where media_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_likes
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_likes`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_likes` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_like
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_like`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_like` (in id int, in pos int, in lord SET('like', 'dislike'),in car int, in med int, in com int)
BEGIN
update LIKES
set
poster = pos, type = lord, carve = car,
media = med, comment = com 
where like_id = id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_media
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_media`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_media` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_messages
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_messages`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `update_messages` ()
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_message
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_message`;

DELIMITER $$
USE `CCv5`$$
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

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carve_attendee`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carve_attendee` (in id int)
BEGIN
select * from all_carve_attendees where carve_attend_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure username_check
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`username_check`;

DELIMITER $$
USE `CCv5`$$
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

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`password_check`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `password_check` (in usr VARCHAR(40), in pass VARCHAR(40), out userId int)
BEGIN
if exists(select password from users where username = usr and password = pass and logged_in = 0) then
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

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_venue_carve`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_venue_carve` (in id int)
BEGIN
select * from all_carves where venue =id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_follow_venue
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_follow_venue`;

DELIMITER $$
USE `CCv5`$$
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

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_venue_follow`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_venue_follow` (in ven int, in usr int)
BEGIN

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venue_followers
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_venue_followers`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_venue_followers` (in ven int)
BEGIN
select * from all_follows where venue_id = ven;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_buddies
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_buddies`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_buddies` (in usr int)
BEGIN
select user_Id2 from all_follows where user_Id1 = usr and type ='buddy';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_followed
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_user_followed`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_user_followed` (in id int)
BEGIN
select user_Id2 from all_follows where user_Id1 = id and type ='follow' and user_Id2 > 0  ;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_followers
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_user_followers`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_user_followers` (in id int )
BEGIN
select user_Id1 from all_follows where user_Id2 = id and type ='follow' and user_Id1 > 0;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venues_followed
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_venues_followed`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_venues_followed` (in id int)
BEGIN
select venue_Id from all_follows where user_Id1 = 1 and venue_Id > 0;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users_messages
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_users_messages`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_users_messages` (in id int)
BEGIN
select * from all_messages where sender_id = id or rec_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users_inbox
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_users_inbox`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_users_inbox` (in id int)
BEGIN
select * from all_messages where rec_id = id and (type = 'normal' or type = 'reply');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users_sent
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_users_sent`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_users_sent` (in id int)
BEGIN
select * from all_messages where sender_id = id and (type = 'normal' or type = 'reply');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users_created_carves
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_users_created_carves`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_users_created_carves` (in id int)
BEGIN
select * from all_carves where creator = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_messages
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_user_messages`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_user_messages` (in id int)
BEGIN
select * from all_messages where rec_Id = id ;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure logout
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`logout`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `logout` (in usr int)
BEGIN
update USERS set logged_in = 0 where user_id  = usr;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure logout_all
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`logout_all`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `logout_all` ()
BEGIN
update USERS set logged_in = 0;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_open_carves
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_open_carves`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_open_carves` ()
BEGIN
select * from all_carves where type = 'open';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_notifications
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_user_notifications`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_user_notifications` (in id int)
BEGIN
select * from all_messages where rec_id = id and type != 'normal' and type !='reply';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_sent_notifications
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_user_sent_notifications`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_user_sent_notifications` (in id int)
BEGIN
select * from all_messages where sender_id = id and type != 'normal' and type !='reply';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_comments
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carve_comments`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carve_comments` (in id int)
BEGIN
select * from all_comments where carve = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_media
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carve_media`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carve_media` (in id int)
BEGIN
select * from all_media where carve = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve1
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carve1`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carve1` (in id int)
BEGIN
select * from all_carves where carve_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user_attended
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_user_attended`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_user_attended` (in id int)
BEGIN
select * from all_carves where carve_id  in (select carve from CARVE_ATTENDEES where user = 1);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_likes
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carve_likes`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carve_likes` (in id int)
BEGIN
select * from all_likes where carve = id and type = 'like';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_carve_dislikes
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_carve_dislikes`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_carve_dislikes` (in id int)
BEGIN
select * from all_likes where carve = id and type = 'dislike';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure buddy_list
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`buddy_list`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `buddy_list` (in id int)
BEGIN
select user_id2 from all_follows where type = 'buddy' and user_id1 = 1 union select user_id1 as user_id2 from all_follows where type = 'buddy' and user_id2 = 1 ;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_all_likes
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_all_likes`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_all_likes` ()
BEGIN
select * from all_likes where type = 'like';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_dislikes
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_dislikes`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_dislikes` ()
BEGIN
select * from all_likes where type = 'dislike';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_profile_media
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_profile_media`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_profile_media` (in id int)
BEGIN
select * from all_media where profile = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venue_media
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_venue_media`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_venue_media` (in id int)
BEGIN
select * from all_media where venue = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_athlete_to_carve
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_athlete_to_carve`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_athlete_to_carve` (in car int, in us int)
BEGIN
if((select max_athletes from CARVES where carve_id =car)>0) then 
update CARVES Set max_athletes=max_athletes-1 where carve_id=car;
call add_carve_attendee( car, us , 'athlete');
end if;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_photographer_to_carve
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`add_photographer_to_carve`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `add_photographer_to_carve` (in car int, in us int)
BEGIN
if((select max_photo from carves where carve_id =car)>0) then 
update CARVES Set max_photo=max_photo-1 where carve_id=car;
call add_carve_attendee( car, us , 'photographer');
end if;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_message_read
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`update_message_read`;

DELIMITER $$
USE `CCv5`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_message_read`(in id int)
BEGIN
update MESSAGES
set
messages.read=1
where message_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users_inbox_Unread
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_users_inbox_Unread`;

DELIMITER $$
USE `CCv5`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_users_inbox_Unread`(in id int)
BEGIN
select * from all_messages where rec_id = id and (type = 'normal' or type = 'reply') and ( 'read'=0);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users_inbox_read
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_users_inbox_read`;

DELIMITER $$
USE `CCv5`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_users_inbox_read`(in id int)
BEGIN
select * from all_messages where rec_id = id and (type = 'normal' or type = 'reply') and ( 'read'=1);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venue_media
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_venue_media`;

DELIMITER $$
USE `CCv5`$$
CREATE PROCEDURE `get_venue_media` (in id int)
BEGIN
select * from all_media where venue = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_buddy_count
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`get_buddy_count`;

DELIMITER $$
USE `CCv5`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_buddy_count`(in usr int)
BEGIN
select count(user_Id2) as 'total_buddy_follow' from all_follows where user_Id1 = usr and type ='buddy';
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure count_venue_followers
-- -----------------------------------------------------

USE `CCv5`;
DROP procedure IF EXISTS `CCv5`.`count_venue_followers`;

DELIMITER $$
USE `CCv5`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `count_venue_followers`(in ven int)
BEGIN
select count(follow_id) as 'total_vanue_follow' from all_follows where venue_id = 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `CCv5`.`all_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_users`;
DROP VIEW IF EXISTS `CCv5`.`all_users` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_users` AS
select * from USERS;

-- -----------------------------------------------------
-- View `CCv5`.`all_venues`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_venues`;
DROP VIEW IF EXISTS `CCv5`.`all_venues` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_venues` AS
select * from VENUES;

-- -----------------------------------------------------
-- View `CCv5`.`all_carves`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_carves`;
DROP VIEW IF EXISTS `CCv5`.`all_carves` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_carves` AS 
select * from CARVES;

-- -----------------------------------------------------
-- View `CCv5`.`all_media`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_media`;
DROP VIEW IF EXISTS `CCv5`.`all_media` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_media` AS
select * from MEDIA;

-- -----------------------------------------------------
-- View `CCv5`.`all_messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_messages`;
DROP VIEW IF EXISTS `CCv5`.`all_messages` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_messages` AS
select * from MESSAGES;

-- -----------------------------------------------------
-- View `CCv5`.`all_likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_likes`;
DROP VIEW IF EXISTS `CCv5`.`all_likes` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_likes` AS
select * from LIKES;

-- -----------------------------------------------------
-- View `CCv5`.`all_carve_attendees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_carve_attendees`;
DROP VIEW IF EXISTS `CCv5`.`all_carve_attendees` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_carve_attendees` AS
select * from CARVE_ATTENDEES;

-- -----------------------------------------------------
-- View `CCv5`.`all_follows`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_follows`;
DROP VIEW IF EXISTS `CCv5`.`all_follows` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_follows` AS
select * from FOLLOWS;

-- -----------------------------------------------------
-- View `CCv5`.`all_comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`all_comments`;
DROP VIEW IF EXISTS `CCv5`.`all_comments` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `all_comments` AS
select * from COMMENTS;

-- -----------------------------------------------------
-- View `CCv5`.`view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv5`.`view1`;
DROP VIEW IF EXISTS `CCv5`.`view1` ;
USE `CCv5`;
CREATE  OR REPLACE VIEW `view1` AS
select type from LIKES;

SET SQL_MODE = '';
DROP USER IF EXISTS nodeuser;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'nodeuser' IDENTIFIED BY 'Nodeuser@1234';

GRANT ALL ON `CCv5`.* TO 'nodeuser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- begin attached script 'script'
ALTER USER 'nodeuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Nodeuser@1234';
-- end attached script 'script'
