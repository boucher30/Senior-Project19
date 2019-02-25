create table user (
   user_id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(40) NOT NULL,
   first_name VARCHAR(20) NOT NULL,
   last_name VARCHAR(20) NOT NULL,
   PRIMARY KEY ( user_id )
);

INSERT INTO user (username, first_name, last_name)
VALUES ('cmarcy', 'Christian', 'Marcy');

INSERT INTO user (username, first_name, last_name)
VALUES ('amarcy', 'Anastasia', 'Marcy');

INSERT INTO user (username, first_name, last_name)
VALUES ('wmarcy', 'Wayne', 'Marcy');

INSERT INTO user (username, first_name, last_name)
VALUES ('emarcy', 'Emily', 'Marcy');

SELECT * FROM user;
