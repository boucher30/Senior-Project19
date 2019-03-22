use CCv3;
DROP PROCEDURE IF EXISTS new_user_signup;
DROP PROCEDURE IF EXISTS new_user;
DROP PROCEDURE IF EXISTS update_user;
DROP PROCEDURE IF EXISTS get_user;
DROP PROCEDURE IF EXISTS get_users;
DROP PROCEDURE IF EXISTS get_venue;
DROP PROCEDURE IF EXISTS get_venues;
DROP PROCEDURE IF EXISTS create_empty_carve;
DROP PROCEDURE IF EXISTS new_opencarve_venue_date;
DROP PROCEDURE IF EXISTS new_opencarve_venue_nodate;
DROP PROCEDURE IF EXISTS new_opencarve_novenue_date;
DROP PROCEDURE IF EXISTS new_opencarve_novenue_nodate;
DROP PROCEDURE IF EXISTS new_buddy_carve;
DROP PROCEDURE IF EXISTS new_venue;
DROP PROCEDURE IF EXISTS new_venue1;
DROP PROCEDURE IF EXISTS get_messages;
DROP PROCEDURE IF EXISTS get_outgoing_messages;
DROP PROCEDURE IF EXISTS get_incoming_messages;
DROP PROCEDURE IF EXISTS get_outgoing_buddy_requests;
DROP PROCEDURE IF EXISTS get_incoming_buddy_requests;
DROP PROCEDURE IF EXISTS get_outgoing_carveattend_requests;
DROP PROCEDURE IF EXISTS get_incoming_carveattend_requests;
DROP PROCEDURE IF EXISTS get_outgoing_carveinvite_requests;
DROP PROCEDURE IF EXISTS get_incoming_carveinvite_requests;
DROP PROCEDURE IF EXISTS send_message;
DROP PROCEDURE IF EXISTS send_reply_message;
DROP PROCEDURE IF EXISTS send_carveattend_request;
DROP PROCEDURE IF EXISTS send_carveinvite_request;
DROP PROCEDURE IF EXISTS send_buddy_request;
DROP PROCEDURE IF EXISTS accept_buddy_request;
DROP PROCEDURE IF EXISTS decline_buddy_request;
DROP PROCEDURE IF EXISTS follow_user;
DROP PROCEDURE IF EXISTS get_carves;
DROP PROCEDURE IF EXISTS get_user_carves;
DROP PROCEDURE IF EXISTS follow_venue;
DROP PROCEDURE IF EXISTS add_buddy;
DROP PROCEDURE IF EXISTS get_all_buddies;
DROP PROCEDURE IF EXISTS get_buddies;
DROP PROCEDURE IF EXISTS get_all_followers;
DROP PROCEDURE IF EXISTS get_followed;
DROP PROCEDURE IF EXISTS get_followers;
DROP PROCEDURE IF EXISTS venues_followed;
DROP PROCEDURE IF EXISTS get_venue_followers;
DROP PROCEDURE IF EXISTS login;
DROP PROCEDURE IF EXISTS username_check;
DROP PROCEDURE IF EXISTS get_user_username;
DROP PROCEDURE IF EXISTS get_user_first;
DROP PROCEDURE IF EXISTS get_user_last;
DROP PROCEDURE IF EXISTS get_user_full;
DROP PROCEDURE IF EXISTS venuename_check;
DROP PROCEDURE IF EXISTS get_venue_venuename;
DROP PROCEDURE IF EXISTS get_venue_state;
DROP PROCEDURE IF EXISTS get_venue_city;
DROP PROCEDURE IF EXISTS get_venue_location;
DROP PROCEDURE IF EXISTS get_user_athlete;
DROP PROCEDURE IF EXISTS get_user_photographer;
DROP PROCEDURE IF EXISTS get_user_fan;
DROP PROCEDURE IF EXISTS get_venue_snowboard;
DROP PROCEDURE IF EXISTS get_venue_ski;
DROP PROCEDURE IF EXISTS get_venue_skateboard;
DROP PROCEDURE IF EXISTS get_venue_surf;
DROP PROCEDURE IF EXISTS get_venue_mountain_bike;
DROP PROCEDURE IF EXISTS new_empty_user;
DROP PROCEDURE IF EXISTS new_empty_venue;
DROP PROCEDURE IF EXISTS new_empty_comment;
DROP PROCEDURE IF EXISTS new_empty_embedd;
DROP PROCEDURE IF EXISTS new_empty_carve;
DROP PROCEDURE IF EXISTS send_carveattend_accept;
DROP PROCEDURE IF EXISTS send_carveattend_decline;
DROP PROCEDURE IF EXISTS send_carveinvite_accept;
DROP PROCEDURE IF EXISTS send_carveinvite_decline;
DROP PROCEDURE IF EXISTS get_user_created_upcoming_carves;
DROP PROCEDURE IF EXISTS get_user_created_past_carves;
DROP PROCEDURE IF EXISTS get_user_created_carves;
DROP PROCEDURE IF EXISTS get_user_attending_carves;
DROP PROCEDURE IF EXISTS get_user_attended_carves;
DROP PROCEDURE IF EXISTS get_all_carves;
DROP PROCEDURE IF EXISTS get_venue_carves;
DROP PROCEDURE IF EXISTS get_user_all_attend_carves;

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_empty_user`()
BEGIN
  insert into user()
  Values();
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_empty_venue`()
BEGIN
  insert into venue()
  Values();
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_empty_comment`()
BEGIN
  insert into comment ()
  Values();
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_empty_embedd`()
BEGIN
  insert into embedd ()
  Values();
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_empty_carve`()
BEGIN
  insert into carve()
  Values();
END |





DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user`(in id int)
BEGIN
  select * from user where user_id =  id;

END |


DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_user`(in us VARCHAR(40), in em VARCHAR(40), in pwd VARCHAR(40),
IN fn VARCHAR(40), IN ln VARCHAR(40), IN ath tinyint, In pho TINYINT, IN snow TINYINT, IN ska TINYINT, IN su TINYINT,
IN mb TINYINT, IN sk TINYINT, IN fa TINYINT)
BEGIN
  insert into user(username, email,password,first_name,last_name,athlete,photographer,snowboard,skateboard, surf,mountain_bike,ski,fan)
  Values(us, em,pwd,fn,ln,ath,pho,snow,ska,su,mb,sk,fa);

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_user`(in us VARCHAR(40), in em VARCHAR(40), in pwd VARCHAR(40),
IN fn VARCHAR(40), IN ln VARCHAR(40), IN ath tinyint, In pho TINYINT, IN snow TINYINT, IN ska TINYINT, IN su TINYINT,
IN mb TINYINT, IN sk TINYINT, IN fa TINYINT,IN id INT)
BEGIN
  update user
  set 
  username = us,
  email = em,
  password = pwd,
  first_name = fn,
  last_name = ln,
  athlete = ath,
  photographer = pho,
  snowboard = snow,
  skateboard = ska,
  surf = su,
  mountain_bike = mb,
  ski = sk,
  fan = fa WHERE user_id = id;

END |



DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_user_signup`(in us VARCHAR(40), in em VARCHAR(40), in pwd VARCHAR(40),
 IN fn VARCHAR(40), IN ln VARCHAR(40), IN ath tinyint, In pho TINYINT, IN snow TINYINT, IN ska TINYINT, IN su TINYINT,
 IN mb TINYINT, IN sk TINYINT, IN fa TINYINT, out userId int)
BEGIN

  insert into user(username, email,password,first_name,last_name,athlete,photographer,snowboard,skateboard, surf,mountain_bike,ski,fan)
  Values(us, em,pwd,fn,ln,ath,pho,snow,ska,su,mb,sk,fa);
  
  select user_id into userId from user where user.username = us;
  select @userId;
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_users`()
BEGIN
  select * from user;

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_venue`(in na VARCHAR(40), in st VARCHAR(40), in ci VARCHAR(40)
, IN snow TINYINT, IN ski TINYINT, IN ska TINYINT, IN su TINYINT, IN mb TINYINT)
BEGIN
  insert into venue(venue_name, venue_state,venue_city,snowboard,ski,skateboard,surf,mountain_bike)
  Values(na,st,ci,snow,ski,ska,su,mb);
END |



DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue`(in id int)
BEGIN
  select * from venue where venue_id =  id;

END |



DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venues`()
BEGIN
  select * from venue;

END |



DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_opencarve_venue_date`(in date date, IN snow TINYINT, IN ski TINYINT,
IN ska TINYINT, IN su TINYINT, IN mb TINYINT, in athlete_slot int, in photo_slot int, in description varchar(200),
in creator int, in venue int)
BEGIN
  insert into carve(date, snowboard,skateboard,open, athlete_slot,photographer_slot,surf,ski,mountain_bike,description,
   User_user_id,venue_venue_id)
  Values(date,snow,ska,1,athlete_slot,photo_slot,su,ski,mb,description, creator, venue);
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_opencarve_venue_nodate`( IN snow TINYINT, IN ski TINYINT,
 IN ska TINYINT, IN su TINYINT, IN mb TINYINT, in athlete_slot int, in photo_slot int, in description varchar(200),
  in creator int, in venue int)
BEGIN
  insert into carve( snowboard,skateboard,open, athlete_slot,photographer_slot,surf,ski,mountain_bike,description,
  User_user_id,venue_venue_id)
  Values(snow,ska,1,athlete_slot,photo_slot,su,ski,mb,description, creator, venue);
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_opencarve_novenue_date`(in date date, IN snow TINYINT, IN ski TINYINT,
 IN ska TINYINT, IN su TINYINT, IN mb TINYINT, in athlete_slot int, in photo_slot int, in description varchar(200), in creator int)
BEGIN
  insert into carve(date, snowboard,skateboard,open, athlete_slot,photographer_slot,surf,ski,mountain_bike,description, User_user_id)
  Values(date,snow,ska,1,athlete_slot,photo_slot,su,ski,mb,description, creator);
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_opencarve_novenue_nodate`( IN snow TINYINT, IN ski TINYINT,
 IN ska TINYINT, IN su TINYINT, IN mb TINYINT, in athlete_slot int, in photo_slot int, in description varchar(200), in creator int)
BEGIN
  insert into carve(snowboard,skateboard,open, athlete_slot,photographer_slot,surf,ski,mountain_bike,description, User_user_id)
  Values(snow,ska,1,athlete_slot,photo_slot,su,ski,mb,description, creator);
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_buddy_carve`(in date date, IN snow TINYINT, IN ski TINYINT,
 IN ska TINYINT, IN su TINYINT, IN mb TINYINT, in athlete_slot int, in photo_slot int, in description varchar(200),
 in creator int, in venue int)
BEGIN
  insert into carve(date, snowboard,skateboard,open, athlete_slot,photographer_slot,surf,ski,mountain_bike,description,
  is_buddy_carve,User_user_id,venue_venue_id)
  Values(date,snow,ska,0,athlete_slot,photo_slot,su,ski,mb,description,1, creator, venue);
 
  
END |



DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_carves`()
BEGIN
  select * from carve;

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_carves`(in id int)
BEGIN
 select * from carve where User_user_id1 = id or User_user_id =  id;

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_carves`(in id int)
BEGIN
 select * from carve where venue_venue_id = id;

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_all_attend_carves`(in id int)
BEGIN
 select * from carve where User_user_id1 = id;

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_attended_carves`(in id int)
BEGIN
 select * from carve where User_user_id1 = id and past = 1;

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_attending_carves`(in id int)
BEGIN
 select * from carve where User_user_id1 = id and upcoming = 1;

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_created_carves`(in id int)
BEGIN
select * from carve where User_user_id = id;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_created_past_carves`(in id int)
BEGIN
select * from carve where User_user_id = id and past = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_created_upcoming_carves`(in id int)
BEGIN
select * from carve where User_user_id = id and upcoming = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_messages`(in id int)
BEGIN
select * from message where User_user_id = id;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_outgoing_messages`(in id int)
BEGIN
select * from message where User_user_id = id and is_buddy_request = 0;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_incoming_messages`(in id int)
BEGIN
select * from message where  User_user_id1 = id and is_buddy_request = 0;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_incoming_buddy_requests`(in id int)
BEGIN
select * from message where  User_user_id1 = id and is_buddy_request = 1;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_outgoing_buddy_requests`(in id int)
BEGIN
select * from message where User_user_id = id and is_buddy_request = 1;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_incoming_carveattend_requests`(in id int)
BEGIN
select * from message where  User_user_id1 = id and is_carveattend_request = 1;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_outgoing_carveattend_requests`(in id int)
BEGIN
select * from message where User_user_id = id  and is_carveattend_request = 1;

  
END |

DELIMITER |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_incoming_carveinvite_requests`(in id int)
BEGIN
select * from message where  User_user_id1 = id and is_carveinvite_request = 1;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_outgoing_carveinvite_requests`(in id int)
BEGIN
select * from message where User_user_id = id  and is_carveinvite_request = 1;

  
END |

DELIMITER |

CREATE DEFINER=`root`@`localhost` PROCEDURE `send_message`(in id1 int, in id2 int,in sub VARCHAR(50),in message VARCHAR(500))
BEGIN
insert into message (subject,message_body,is_buddy_request,USER_user_id,USER_user_id1)
Values(sub,message,0,id1,id2);
  
END |

DELIMITER |

CREATE DEFINER=`root`@`localhost` PROCEDURE `send_reply_message`(in id1 int, in id2 int,in sub VARCHAR(50),
in message VARCHAR(500), in reply_msg int)
BEGIN
insert into message(subject,message_body,is_buddy_request,USER_user_id,USER_user_id1,reply_msg_id)
Values(sub,message,0,id1,id2,reply_msg);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `send_carveattend_request`(in id1 int, in id2 int, in carveid int,
 in sub VARCHAR(50),in message VARCHAR(500))
BEGIN
insert into message(subject,message_body,is_carveattend_request, carve_carve_id, USER_user_id,USER_user_id1)
Values(sub,message,1,carveid, id1,id2);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `send_carveattend_accept`(in id1 int, in id2 int, in carveid int,
 in sub VARCHAR(50),in message VARCHAR(500),in replyid int)
BEGIN
insert into message(subject,message_body,is_carveattend_request, carve_carve_id, USER_user_id,USER_user_id1,reply_msg_id)
Values(sub,message,1,carveid, id1,id2,replyid);
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `send_carveattend_decline`(in id1 int, in id2 int, in carveid int,
in sub VARCHAR(50),in message VARCHAR(500),in replyid int)
BEGIN
insert into message(subject,message_body,is_carveattend_request, carve_carve_id, USER_user_id,USER_user_id1,reply_msg_id)
Values(sub,message,1,carveid, id1,id2,replyid);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `send_carveinvite_request`(in id1 int, in id2 int, in carveid int,
 in sub VARCHAR(50),in message VARCHAR(500))
BEGIN
insert into message(subject,message_body,is_carveinvite_request, carve_carve_id, USER_user_id,USER_user_id1)
Values(sub,message,1,carveid, id1,id2);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `send_carveinvite_accept`(in id1 int, in id2 int, in carveid int,
in sub VARCHAR(50),in message VARCHAR(500),in replyid int)
BEGIN
insert into message(subject,message_body,is_carveinvite_request, carve_carve_id, USER_user_id,USER_user_id1,reply_msg_id)
Values(sub,message,1,carveid, id1,id2,replyid);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `send_carveinvite_decline`(in id1 int, in id2 int, in carveid int,
 in sub VARCHAR(50),in message VARCHAR(500),in replyid int)
BEGIN
insert into message(subject,message_body,is_carveinvite_request, carve_carve_id, USER_user_id,USER_user_id1,reply_msg_id)
Values(sub,message,1,carveid, id1,id2,replyid);
  
END |

DELIMITER |

CREATE DEFINER=`root`@`localhost` PROCEDURE `send_buddy_request`(in id1 int, in id2 int,in sub VARCHAR(50),in message VARCHAR(500))
BEGIN
insert into message(subject,message_body,is_buddy_request,USER_user_id,USER_user_id1)
Values(sub,message,1,id1,id2);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `accept_buddy_request`(in id1 int, in id2 int,in sub VARCHAR(50),
in message VARCHAR(500), in reply_id int)
BEGIN
insert into message(subject, message_body,is_buddy_request,USER_user_id,USER_user_id1,reply_msg_id)
Values(sub,message,1,id1,id2, reply_id);
 
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `decline_buddy_request`(in id1 int, in id2 int,in sub VARCHAR(50),
in message VARCHAR(500), in reply_id int)
BEGIN
insert into message(subject,message_body,is_buddy_request,USER_user_id,USER_user_id1,reply_msg_id)
Values(sub,message,1,id1,id2, reply_id);

END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `follow_user`(in id1 int, in id2 int)
BEGIN
insert into follow_user(isbuddy,status,USER_user_id,USER_user_id1)
Values(0,1,id1,id2);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `follow_venue`(in id1 int, in venueID int)
BEGIN
insert into follow_venue(User_user_id,venue_venue_id)
Values(id1,venueID);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_buddy`(in id1 int, in id2 int)
BEGIN
insert into follow_user(isbuddy,status,USER_user_id,USER_user_id1)
Values(1,1,id1,id2);
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_buddies`(in id int)
BEGIN
select * from follow_user where (User_user_id = id and isbuddy =1) or (User_user_id1 = id and isbuddy = 1);

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_buddies`(in id int)
BEGIN
select * from follow_user where isbuddy = 1;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_followed`(in id int)
BEGIN
select * from follow_user where User_user_id = id and isbuddy = 0;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_followers`(in id int)
BEGIN
select * from follow_user where User_user_id1 = id ;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_followers`(in id int)
BEGIN
select * from follow_user where isbuddy =0 ;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `venues_followed`(in id int)
BEGIN
select * from follow_venue where User_user_id = id ;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_followers`(in id int)
BEGIN
select * from follow_venue where venue_venue_id = id ;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(in us varchar(40), in pass varchar(40), out userid int)
BEGIN
 

if exists(select * from user where username = us and password = pass) then
	select user_id into userid from user where username = us;
    
    
else
	set @userid = null;
    
end if;
  select @userid;
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `username_check`(in us varchar(40))
BEGIN
select * from user where username = us;

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `venuename_check`(in vn varchar(40))
BEGIN
if EXISTS(select * from venue where venue_name = vn) then
		select 1;
else
	select 0;
    end if;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_username`(in us varchar(40))
BEGIN
select * from user where username like concat('%',us,'%');

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_first`(in fir varchar(40))
BEGIN
select * from user where first_name like concat('%',fir,'%');
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_last`(in las varchar(40))
BEGIN
select * from user where last_name like concat('%',las,'%');
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_full`(in fir varchar(40), in las varchar(40))
BEGIN
select * from user where(first_name like concat('%',fir,'%')) and ( last_name like concat('%',las,'%'));
  
END |


DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_venuename`(in vn varchar(40))
BEGIN
select * from venue where venue_name like concat('%',vn,'%');

  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_state`(in st varchar(10))
BEGIN
select * from venue where venue_state like concat('%',st,'%');
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_city`(in cit varchar(40))
BEGIN
select * from venue where venue_city like concat('%',cit,'%');
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_location`(in cit varchar(40), in st varchar(40))
BEGIN
select * from venue where(venue_city like concat('%',cit,'%')) and ( venue_state like concat('%',st,'%'));
  
END |


DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_athlete`()
BEGIN
select * from user where athlete = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_photographer`()
BEGIN
select * from user where photographer = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_fan`()
BEGIN
select * from user where fan = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_snowboard`()
BEGIN
select * from venue where snowboard = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_ski`()
BEGIN
select * from venue where ski = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_skateboard`()
BEGIN
select * from venue where skateboard = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_surf`()
BEGIN
select * from venue where surf = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_venue_mountain_bike`()
BEGIN
select * from venue where mountain_bike = 1;
  
END |

DELIMITER |
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_listings`()
BEGIN
select * from carve where open = 1;
  
END |
