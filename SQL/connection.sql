CREATE TABLE IF NOT EXISTS connectionlist (
	connection_list_id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    init_user_id1 INT UNSIGNED,
	con_user_id2 INT UNSIGNED,
      
   PRIMARY KEY ( connection_list_id )
)ENGINE=INNODB;

Insert into connectionlist(init_user_id1,con_user_id2)
Values('1', '2');

select * from connectionlist;