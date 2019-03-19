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
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `athlete` TINYINT NULL,
  `photographer` TINYINT NULL,
  `snowboard` TINYINT NULL,
  `skateboard` TINYINT NULL,
  `surf` TINYINT NULL,
  `mountain_bike` TINYINT NULL,
  `ski` TINYINT NULL,
  `fan` TINYINT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`venue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`venue` (
  `venue_id` INT NOT NULL AUTO_INCREMENT,
  `venue_name` VARCHAR(45) NULL,
  `venue_state` VARCHAR(45) NULL,
  `venue_city` VARCHAR(45) NULL,
  `snowboard` TINYINT NULL,
  `ski` TINYINT NULL,
  `skateboard` TINYINT NULL,
  `surf` TINYINT NULL,
  `mountain_bike` TINYINT NULL,
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
  `isbuddy` TINYINT NULL,
  `status` INT NULL,
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
  `comment_body` VARCHAR(250) NULL,
  `likes` INT NULL,
  `dislikes` INT NULL,
  `USER_user_id` INT NOT NULL,
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
  `url` VARCHAR(200) NULL,
  PRIMARY KEY (`embedd_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CCv3`.`carve`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`carve` (
  `carve_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `snowboard` TINYINT NULL,
  `skateboard` TINYINT NULL,
  `open` TINYINT NULL,
  `athlete_slot` INT NULL,
  `athlete_attend` INT NULL,
  `photographer_slot` INT NULL,
  `photographer_attend` INT NULL,
  `upcoming` TINYINT NULL,
  `past` TINYINT NULL,
  `surf` TINYINT NULL,
  `ski` TINYINT NULL,
  `mountain_bike` TINYINT NULL,
  `description` VARCHAR(200) NULL,
  `likes` INT NULL,
  `dislikes` INT NULL,
  `USER_user_id` INT NOT NULL,
  `venue_venue_id` INT NOT NULL,
  `USER_user_id1` INT NOT NULL,
  `Comment_comment_id` INT NOT NULL,
  `embedd_embedd_id` INT NOT NULL,
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
  `is_buddy_request` TINYINT NULL,
  `is_carveattend_request` TINYINT NULL,
  `is_carveinvite_request` TINYINT NULL,
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


-- -----------------------------------------------------
-- Table `CCv3`.`buddy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CCv3`.`buddy` (
  `buddy_id` INT NOT NULL,
  PRIMARY KEY (`buddy_id`))
ENGINE = InnoDB;






SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
