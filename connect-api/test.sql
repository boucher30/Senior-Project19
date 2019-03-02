create table user (
   user_id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(40) NOT NULL,
   pwd VARCHAR(40) NOT NULL,
   first_name VARCHAR(20) NOT NULL,
   last_name VARCHAR(20) NOT NULL,
   PRIMARY KEY ( user_id )
);

INSERT INTO user (username, pwd, first_name, last_name)
VALUES ('cmarcy', 'abc', 'Christian', 'Marcy');

INSERT INTO user (username, pwd, first_name, last_name)
VALUES ('amarcy','abc', 'Anastasia', 'Marcy');

INSERT INTO user (username, pwd, first_name, last_name)
VALUES ('wmarcy', 'abc', 'Wayne', 'Marcy');

INSERT INTO user (username, pwd, first_name, last_name)
VALUES ('emarcy', 'abc', 'Emily', 'Marcy');

SELECT * FROM user;
