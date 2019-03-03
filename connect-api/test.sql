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


#buddyList table created
create table buddyList (
   user_id int not null,
   user_id2 INT NOT NULL,
   foreign key(user_id) references user(user_id))
;


#insert some sample buddy
INSERT INTO buddyList (user_id,user_id2)
VALUES ('1','2');

INSERT INTO buddyList (user_id,user_id2)
VALUES ('1','3');

INSERT INTO buddyList (user_id,user_id2)
VALUES ('1','4');
INSERT INTO buddyList (user_id,user_id2)
VALUES ('2','4');INSERT INTO buddyList (user_id,user_id2)
VALUES ('3','2');

#display buddyList table
select * from buddyList;

#this quory will return buddylist.
select u.user_id2,us.first_name,us.last_name from
(select user_id2 
from buddyList
where user_id = 1) as u join user us where u.user_id2 = us.user_id;

