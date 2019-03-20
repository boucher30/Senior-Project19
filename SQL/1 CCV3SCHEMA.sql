-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CCv3
-- -----------------------------------------------------

drop schema if exists CCv3;
-- -----------------------------------------------------
-- Schema CCv3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CCv3` DEFAULT CHARACTER SET utf8MB4 ;
USE `CCv3` ;

-- -----------------------------------------------------
-- Table `CCv3`.`USER`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `CCv3`.`USER` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL default "",
  `email` VARCHAR(45) NULL default "",
  `password` VARCHAR(45) NULL default "",
  `first_name` VARCHAR(45) NULL default "",
  `last_name` VARCHAR(45) NULL default "",
  `athlete` TINYINT NULL default 0,
  `photographer` TINYINT NULL default 0,
  `snowboard` TINYINT NULL default 0,
  `skateboard` TINYINT NULL default 0,
  `surf` TINYINT NULL default 0,
  `mountain_bike` TINYINT NULL default 0,
  `ski` TINYINT NULL default 0,
  `fan` TINYINT NULL default 0,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`venue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`venue` (
  `venue_id` INT NOT NULL AUTO_INCREMENT ,
  `venue_name` VARCHAR(45) NULL default "",
  `venue_state` VARCHAR(45) NULL default "",
  `venue_city` VARCHAR(45) NULL default "",
  `snowboard` TINYINT NULL default 0,
  `ski` TINYINT NULL default 0,
  `skateboard` TINYINT NULL default 0,
  `surf` TINYINT NULL default 0,
  `mountain_bike` TINYINT NULL default 0,
  PRIMARY KEY (`venue_id`),
  UNIQUE INDEX `venue_id_UNIQUE` (`venue_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`follow_venue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`follow_venue` (
  `follow_venueid` INT NOT NULL AUTO_INCREMENT,
  `USER_user_id` INT NOT NULL,
  `venue_venue_id` INT NOT NULL,
  PRIMARY KEY (`follow_venueid`, `USER_user_id`, `venue_venue_id`),
  INDEX `fk_follow_venue_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  INDEX `fk_follow_venue_venue1_idx` (`venue_venue_id` ASC) VISIBLE,
  CONSTRAINT `fk_follow_venue_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `CCv3`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_follow_venue_venue1`
    FOREIGN KEY (`venue_venue_id`)
    REFERENCES `CCv3`.`venue` (`venue_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`follow_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`follow_user` (
  `follow_userid` INT NOT NULL AUTO_INCREMENT,
  `isbuddy` TINYINT NULL default 0,
  `status` INT NULL default 0,
  `USER_user_id` INT NOT NULL,
  `USER_user_id1` INT NOT NULL,
  PRIMARY KEY (`follow_userid`, `USER_user_id`, `USER_user_id1`),
  INDEX `fk_follow_user_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  INDEX `fk_follow_user_USER2_idx` (`USER_user_id1` ASC) VISIBLE,
  CONSTRAINT `fk_follow_user_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `CCv3`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_follow_user_USER2`
    FOREIGN KEY (`USER_user_id1`)
    REFERENCES `CCv3`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`Comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`Comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `comment_body` VARCHAR(250) NULL default "",
  `likes` INT NULL default 0,
  `dislikes` INT NULL default 0,
  `USER_user_id` INT NOT NULL default 1,
  PRIMARY KEY (`comment_id`, `USER_user_id`),
  INDEX `fk_Comment_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Comment_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `CCv3`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`embedd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`embedd` (
  `embedd_id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(200) NULL default "",
  PRIMARY KEY (`embedd_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`carve`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`carve` (
  `carve_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `snowboard` TINYINT NULL default 0,
  `skateboard` TINYINT NULL default 0,
  `open` TINYINT NULL default 0,
  `athlete_slot` INT NULL default 0,
  `athlete_attend` INT NULL default 0,
  `photographer_slot` INT NULL default 0,
  `photographer_attend` INT NULL default 0,
  `upcoming` TINYINT NULL default 0,
  `past` TINYINT NULL default 0,
  `surf` TINYINT NULL default 0,
  `ski` TINYINT NULL default 0,
  `mountain_bike` TINYINT NULL default 0,
  `description` VARCHAR(200) NULL default "",
  `likes` INT NULL default 0,
  `dislikes` INT NULL default 0,
  `is_buddy_carve` INT NULL default 0,
  `USER_user_id` INT NOT NULL default 1,
  `venue_venue_id` INT NOT NULL,
  `USER_user_id1` INT NOT NULL default 1,
  `Comment_comment_id` INT NOT NULL default 1,
  `embedd_embedd_id` INT NOT NULL default 1,
  PRIMARY KEY (`carve_id`, `USER_user_id`, `venue_venue_id`, `USER_user_id1`, `Comment_comment_id`, `embedd_embedd_id`),
  UNIQUE INDEX `carve_id_UNIQUE` (`carve_id` ASC) VISIBLE,
  INDEX `fk_carve_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  INDEX `fk_carve_venue1_idx` (`venue_venue_id` ASC) VISIBLE,
  INDEX `fk_carve_USER2_idx` (`USER_user_id1` ASC) VISIBLE,
  INDEX `fk_carve_Comment1_idx` (`Comment_comment_id` ASC) VISIBLE,
  INDEX `fk_carve_embedd1_idx` (`embedd_embedd_id` ASC) VISIBLE,
  CONSTRAINT `fk_carve_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `CCv3`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carve_venue1`
    FOREIGN KEY (`venue_venue_id`)
    REFERENCES `CCv3`.`venue` (`venue_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carve_USER2`
    FOREIGN KEY (`USER_user_id1`)
    REFERENCES `CCv3`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carve_Comment1`
    FOREIGN KEY (`Comment_comment_id`)
    REFERENCES `CCv3`.`Comment` (`comment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carve_embedd1`
    FOREIGN KEY (`embedd_embedd_id`)
    REFERENCES `CCv3`.`embedd` (`embedd_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`message` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(50) NULL,
  `message_body` VARCHAR(500) NULL,
  `is_buddy_request` TINYINT NULL default 0,
  `is_carveattend_request` TINYINT NULL default 0,
  `is_carveinvite_request` TINYINT NULL default 0,
  `USER_user_id` INT NOT NULL,
  `USER_user_id1` INT NOT NULL,
  `reply_msg_id` INT NULL,
  `CARVE_carve_id` INT NOT NULL default 0,
  PRIMARY KEY (`message_id`, `USER_user_id`, `USER_user_id1`,`carve_carve_id`),
  UNIQUE INDEX `message_id_UNIQUE` (`message_id` ASC) VISIBLE,
  INDEX `fk_message_USER1_idx` (`USER_user_id` ASC) VISIBLE,
  INDEX `fk_message_USER2_idx` (`USER_user_id1` ASC) VISIBLE,
  INDEX `fk_message_CARVE1_idx` (`carve_carve_id` ASC) VISIBLE,
  CONSTRAINT `fk_message_USER1`
    FOREIGN KEY (`USER_user_id`)
    REFERENCES `CCv3`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_USER2`
    FOREIGN KEY (`USER_user_id1`)
    REFERENCES `CCv3`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
	CONSTRAINT `fk_message_carve1`
    FOREIGN KEY (`carve_carve_id`)
    REFERENCES `CCv3`.`carve` (`carve_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
