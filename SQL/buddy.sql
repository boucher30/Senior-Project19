CREATE TABLE IF NOT EXISTS buddylist (
	buddy_list_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    init_user_id1 INT UNSIGNED,
	bud_user_id2 INT UNSIGNED,
      
   PRIMARY KEY ( buddy_list_id )
)ENGINE=INNODB;

Insert into buddylist(init_user_id1,bud_user_id2)
Values('1', '2');

select * from buddylist;