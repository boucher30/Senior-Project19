use mydb;
ALTER TABLE CCv4.users MODIFY COLUMN password VARCHAR(255)  
    CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
SET NAMES 'utf8';
SET CHARACTER SET utf8;
create table userExample(userId int(11) unsigned not null auto_increment,
username varchar(20) default null, password varchar(100) default null, 
salt varchar(20) default null, primary key (userId));
show tables;

insert into userExample (username, password)
values ('Dhruv', 'Shreeji18;');
select *from userExample;

insert into userExample (username, password, salt)
values ('Harsh', aes_encrypt(concat('Dhruv123', 'salt1234'), 'Key1234'), 'salt1234');

DROP TABLE IF EXISTS `mydb`.`USERS` ;

CREATE TABLE IF NOT EXISTS `CCv4`.`USERS` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `password` LONGBLOB NULL,
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
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;
show tables;
select *from users;
ALTER TABLE users CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

insert into users(username, password) values ('Harsh', aes_encrypt('Shreeji18', 'key1234'));
use CCv4;
select *from users;
INSERT INTO users (password) VALUES(AES_ENCRYPT('Hello', 'key1234'));
SELECT AES_DECRYPT(password, 'key1234') FROM users;
ALTER TABLE CCv4.users MODIFY COLUMN password VARCHAR(255)  
    CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
INSERT INTO `users` (`email`, `pswd`) VALUES ('user3@example.com', PASSWORD('pass123'));

select * from all_users where user_id = 1;
