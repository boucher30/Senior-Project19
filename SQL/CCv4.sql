-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CCv4
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
-- Table `CCv4`.`USERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`USERS` ;

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
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
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
  `snow_sports` SET('snowboard', 'ski', 'snowmobile') NULL,
  `water_sports` SET('surf', 'waterski') NULL,
  `land_sports` SET('skateboard', 'BMX', 'mountainBiking') NULL,
  `air_sports` SET('skyDive', 'hangGlide') NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `about` VARCHAR(200) NULL,
  PRIMARY KEY (`venue_id`),
  UNIQUE INDEX `venue_id_UNIQUE` (`venue_id` ASC) VISIBLE,
  UNIQUE INDEX `venue_name_UNIQUE` (`venue_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`CARVES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`CARVES` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`CARVES` (
  `carve_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `creator` INT NOT NULL,
  `venue` INT NULL,
  `type` SET('open', 'buddy') NOT NULL DEFAULT 'open',
  `max_athletes` INT NULL,
  `max_photo` INT NULL,
  `description` VARCHAR(200) NULL,
  `date` DATE NULL,
  `completed` TINYINT NULL,
  `snow_sports` SET('snowboard', 'ski', 'snowmobile') NULL,
  `water_sports` SET('surf', 'waterski') NULL,
  `land_sports` SET('skateboard', 'BMX', 'mountainBiking') NULL,
  `air_sports` SET('skyDive', 'hangGlide') NULL,
  UNIQUE INDEX `carve_id_UNIQUE` (`carve_id` ASC) VISIBLE,
  PRIMARY KEY (`carve_id`),
  CONSTRAINT `creator`
    FOREIGN KEY (`creator`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
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
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sender_Id` INT NOT NULL,
  `rec_Id` INT NOT NULL,
  `type` SET('buddyRequest', 'buddyAccept', 'buddyDecline', 'attendRequest', 'attendAccept', 'attendDeny', 'invite', 'inviteAccept', 'inviteDeny', 'reply') NULL,
  `reply` INT NULL,
  PRIMARY KEY (`message_id`),
  UNIQUE INDEX `message_id_UNIQUE` (`message_id` ASC) VISIBLE,
  INDEX `reply_idx` (`reply` ASC) VISIBLE,
  CONSTRAINT `sender`
    FOREIGN KEY (`sender_Id`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `reciever`
    FOREIGN KEY (`rec_Id`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `reply`
    FOREIGN KEY (`reply`)
    REFERENCES `CCv4`.`MESSAGES` (`message_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`USER_TO_USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`USER_TO_USER` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`USER_TO_USER` (
  `user_id1` INT NOT NULL,
  `user_id2` INT NOT NULL,
  `type` SET('buddy', 'follow', 'block') NULL,
  CONSTRAINT `user5`
    FOREIGN KEY (`user_id1`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `user6`
    FOREIGN KEY (`user_id2`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`USER_TO_VENUE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`USER_TO_VENUE` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`USER_TO_VENUE` (
  `userID` INT NOT NULL,
  `venueID` INT NOT NULL,
  `type` SET('following') NOT NULL,
  INDEX `user_idx` (`userID` ASC) VISIBLE,
  INDEX `venue_idx` (`venueID` ASC) VISIBLE,
  CONSTRAINT `user7`
    FOREIGN KEY (`userID`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `venue7`
    FOREIGN KEY (`venueID`)
    REFERENCES `CCv4`.`VENUES` (`venue_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`CARVE_ATTENDEES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`CARVE_ATTENDEES` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`CARVE_ATTENDEES` (
  `carve` INT NOT NULL,
  `user` INT NOT NULL,
  INDEX `carve_idx` (`carve` ASC) VISIBLE,
  INDEX `user_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `carve1`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv4`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user1`
    FOREIGN KEY (`user`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`MEDIA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`MEDIA` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`MEDIA` (
  `media_id` INT NOT NULL AUTO_INCREMENT,
  `carve` INT NULL,
  `poster` INT NOT NULL,
  `venue` INT NULL,
  `url` VARCHAR(50) NULL,
  `description` VARCHAR(100) NULL,
  INDEX `venue_idx` (`venue` ASC) VISIBLE,
  PRIMARY KEY (`media_id`),
  UNIQUE INDEX `media_id_UNIQUE` (`media_id` ASC) VISIBLE,
  CONSTRAINT `carve4`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv4`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user4`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `venue4`
    FOREIGN KEY (`venue`)
    REFERENCES `CCv4`.`VENUES` (`venue_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`COMMENTS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`COMMENTS` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`COMMENTS` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `carve` INT NULL,
  `media` INT NULL,
  `poster` INT NOT NULL,
  `comment` VARCHAR(200) NULL,
  INDEX `carve_idx` (`carve` ASC) VISIBLE,
  INDEX `user_idx` (`poster` ASC) VISIBLE,
  INDEX `media_idx` (`media` ASC) VISIBLE,
  PRIMARY KEY (`comment_id`),
  UNIQUE INDEX `comment_id_UNIQUE` (`comment_id` ASC) VISIBLE,
  CONSTRAINT `carve2`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv4`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user2`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `media1`
    FOREIGN KEY (`media`)
    REFERENCES `CCv4`.`MEDIA` (`media_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv4`.`LIKES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`LIKES` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`LIKES` (
  `carve` INT NULL,
  `comment` INT NULL,
  `media` INT NULL,
  `poster` INT NOT NULL,
  `type` SET('like', 'dislike') NOT NULL,
  INDEX `comment_idx` (`comment` ASC) VISIBLE,
  INDEX `media_idx` (`media` ASC) VISIBLE,
  CONSTRAINT `carve3`
    FOREIGN KEY (`carve`)
    REFERENCES `CCv4`.`CARVES` (`carve_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user3`
    FOREIGN KEY (`poster`)
    REFERENCES `CCv4`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `comment3`
    FOREIGN KEY (`comment`)
    REFERENCES `CCv4`.`COMMENTS` (`comment_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `media3`
    FOREIGN KEY (`media`)
    REFERENCES `CCv4`.`MEDIA` (`media_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `CCv4` ;

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_users` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_venues`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_venues` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_carves`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_carves` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_media` (`media_id` INT, `carve` INT, `poster` INT, `venue` INT, `url` INT, `description` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_messages` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_likes` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_carve_attendees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_carve_attendees` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_user_to_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_user_to_user` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_user_to_venue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_user_to_venue` (`id` INT);

-- -----------------------------------------------------
-- Placeholder table for view `CCv4`.`all_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv4`.`all_comments` (`id` INT);

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
insert into users(username, email, password, first_name, last_name, description, type, snow_sports, water_sports, land_sports, air_sports)
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
insert into venues( venue_name,city,state,snow_sports,water_sports,land_sports,air_sports,about)
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
CREATE PROCEDURE `add_carve` (in carveName varchar(40), in creatorId int)
BEGIN
insert into carves(name, creator)
values(carveName,creatorId);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_message
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`add_message`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `add_message` (in sender int, in reciever int, in subject varchar(50), in body varchar(500))
BEGIN

insert into message(send_Id, rec_Id,message_subject,message_body)
values(sender,reciever,subject,body);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure create_comment
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`create_comment`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `create_comment` (in us int)
BEGIN
insert into comment(user)
values(us);
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
insert into user_to_user(user_id1,user_id2, type)
values(follower,followed,'follow');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_users
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_users`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_users` ()
BEGIN
select * from all_users;
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
select * from all_users where user_id = id;
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
update users set 
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

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_users`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_users` ()
BEGIN
delete from users;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_users
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_users`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_users` ()
BEGIN
select * from all_users;
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
delete from users where user_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_venues
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`get_venues`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `get_venues` ()
BEGIN
select * from all_venues;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_venues
-- -----------------------------------------------------

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`update_venues`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `update_venues` (in id int, in vname VARCHAR(40),in cityNear VARCHAR(45), in st VARCHAR(2),in snowSports set ('snowboard','ski','snowmobile'), in waterSports set ('surf','waterSki'),in landSports set ('skateboard','BMX'), in airSports set ('skydive','hangGlide'))
BEGIN
insert into venues( venue_name,city,state,snow_sports,water_sports,land_sports,air_sports)
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
update venues set
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

USE `CCv4`;
DROP procedure IF EXISTS `CCv4`.`delete_venues`;

DELIMITER $$
USE `CCv4`$$
CREATE PROCEDURE `delete_venues` ()
BEGIN
delete from venues;
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
delete from venues where venue_id = id;
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
select * from venues where venue_id = id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `CCv4`.`all_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_users`;
DROP VIEW IF EXISTS `CCv4`.`all_users` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_users` AS
select * from users;

-- -----------------------------------------------------
-- View `CCv4`.`all_venues`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_venues`;
DROP VIEW IF EXISTS `CCv4`.`all_venues` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_venues` AS
select * from venues;

-- -----------------------------------------------------
-- View `CCv4`.`all_carves`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_carves`;
DROP VIEW IF EXISTS `CCv4`.`all_carves` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_carves` AS 
select * from carves;

-- -----------------------------------------------------
-- View `CCv4`.`all_media`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_media`;
DROP VIEW IF EXISTS `CCv4`.`all_media` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_media` AS
select * from MEDIA;

-- -----------------------------------------------------
-- View `CCv4`.`all_messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_messages`;
DROP VIEW IF EXISTS `CCv4`.`all_messages` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_messages` AS
select * from messages;

-- -----------------------------------------------------
-- View `CCv4`.`all_likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_likes`;
DROP VIEW IF EXISTS `CCv4`.`all_likes` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_likes` AS
select * from likes;

-- -----------------------------------------------------
-- View `CCv4`.`all_carve_attendees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_carve_attendees`;
DROP VIEW IF EXISTS `CCv4`.`all_carve_attendees` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_carve_attendees` AS
select * from carve_attendees;

-- -----------------------------------------------------
-- View `CCv4`.`all_user_to_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_user_to_user`;
DROP VIEW IF EXISTS `CCv4`.`all_user_to_user` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_user_to_user` AS
select * from user_to_user;

-- -----------------------------------------------------
-- View `CCv4`.`all_user_to_venue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_user_to_venue`;
DROP VIEW IF EXISTS `CCv4`.`all_user_to_venue` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_user_to_venue` AS
select * from user_to_venue;

-- -----------------------------------------------------
-- View `CCv4`.`all_comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CCv4`.`all_comments`;
DROP VIEW IF EXISTS `CCv4`.`all_comments` ;
USE `CCv4`;
CREATE  OR REPLACE VIEW `all_comments` AS
select * from comments;
SET SQL_MODE = '';
DROP USER IF EXISTS nodeuser;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'nodeuser' IDENTIFIED BY 'nodeuser@1234';

GRANT ALL ON `CCv4`.* TO 'nodeuser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- begin attached script 'script'
ALTER USER 'nodeuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nodeuser@1234';
-- end attached script 'script'
