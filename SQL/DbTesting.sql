use CCv4;
show tables;

call CCv4.add_athlete_to_carve(1, 6);
call add_carve('Riding',1,25,'open',1,1,'2019-01-01','surf');
select *from users;
call CCv4.add_carve('Water Rafting', 5, 67, 'open', 1, 1, '2019-08-09', 'waterSki');
-- 19:12:20	call CCv4.add_carve('Water Rafting', 5, 67, 'open', 1, 1, '2019-08-09', 'waterSki')	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`carves`, CONSTRAINT `creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`) ON DELETE CASCADE)	0.0019 sec

call CCv4.add_buddy(2, 3);
-- 19:11:34	call CCv4.add_buddy(2, 3)	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`follows`, CONSTRAINT `user5` FOREIGN KEY (`user_id1`) REFERE

call CCv4.add_carve_attendee(1, 1, 'photographer');
-- 19:13:33	call CCv4.add_carve_attendee(1, 1, 'photographer')	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`carve_attendees`, CONSTRAINT `carve1` FOREIGN KEY (`carve`) REFERENCES `carves` (`carve_id`) ON DELETE CASCADE ON UPDATE CASCADE)	0.013 sec

call CCv4.add_comment(1, 2, 2, 4, 'hey whats up');
-- 19:14:06	call CCv4.add_comment(1, 2, 2, 4, 'hey whats up')	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`comments`, CONSTRAINT `carve2` FOREIGN KEY (`carve`) REFERENCES `carves` (`carve_id`) ON DELETE CASCADE ON UPDATE CASCADE)	0.040 sec

call CCv4.add_follow(2, 3, 5, 'buddy');
-- 19:14:37	call CCv4.add_follow(2, 3, 5, 'buddy')	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`follows`, CONSTRAINT `venue9` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`venue_id`))	0.083 sec

call CCv4.add_like(1, 'like', 1, 2, 1);
-- 19:16:06	call CCv4.add_like(1, 'like', 1, 2, 1)	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`likes`, CONSTRAINT `comment3` FOREIGN KEY (`comment`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE)	0.019 sec

call CCv4.add_media(2, 'Dhruv', 'skydiving ', 3, 2, 1);
-- 19:16:57	call CCv4.add_media(2, 'Dhruv', 'skydiving ', 3, 2, 1)	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`media`, CONSTRAINT `user11` FOREIGN KEY (`profile`) REFERENCES `users` (`user_id`))	0.012 sec

call CCv4.add_message(2, 3, 'hello', 'can you be my buddy', 'buddyRequest');
-- 19:17:38	call CCv4.add_message(2, 3, 'hello', 'can you be my buddy', 'buddyRequest')	Error Code: 1364. Field 'message_id' doesn't have a default value	0.00045 sec

call CCv4.add_photographer_to_carve(1, 3);
call add_user('harsh','dhruv@gmail.com','Sam','Dhruv','Patel','hey','0','0','0','0','1');
call add_venue('MountainValley','Burlington','NJ','0','0','0','0','1');
call add_venue_follow(2,5);
call buddy_list(1);
call delete_carve(1);
call delete_carve_attendee(1);
call delete_carve_attendees(); 
-- We are using safe update mode and  trying to update a table without a WHERE that uses a KEY column. 
call delete_carves(); 
-- We are using safe update mode and  trying to update a table without a WHERE that uses a KEY column. 
call delete_comment(1);
call delete_comments(); 
-- safe update call
call delete_follows(); 
-- safe update
call delete_like(1);
call delete_likes(); 
-- safe update
call delete_media();
-- safe update
call delete_message(1);
call delete_messages(); 
-- safe update
call delete_user(1);
call delete_users();
call delete_venue(1);
call delete_venues(); 
call follow_user(1,2);
-- 17:56:21	call follow_user(1,2)	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`follows`, CONSTRAINT `user5` FOREIGN KEY (`user_id1`) REFERENCES `users` (`user_id`) ON DELETE CASCADE)	0.029 sec

call follow_venue(2,1);
-- 17:57:24	call follow_venue(2,1)	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`ccv4`.`follows`, CONSTRAINT `venue9` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`venue_id`))	0.035 sec

call get_all_likes();

call get_buddies(2);
call get_carve(3);
call get_carve1(2);
call get_carve_attendee(5);
call get_carve_attendees();
call get_carve_comments(2);
call get_carve_dislikes(2);
call get_carve_likes(1);
call get_carve_media(1);
call get_carves ();
call get_carves_attendees(5);
call get_comment (6);
call get_comments();
call get_dislikes();
call get_follow(3);
call get_follows();
call get_like(1);
call get_likes();
call get_medi(1);
call get_media();
call get_message(25);
call get_messages();
call get_open_carves();
-- call get_profile_media(4);
-- 18:51:21	call get_profile_media(56)	Error Code: 1054. Unknown column 'media' in 'where clause'	0.00033 sec

call get_user(1);
call get_user_attended(1);
call get_user_comments(1);
call get_user_followed(7);
call get_user_followers(4);
call get_user_messages(5);
call get_user_notifications(5);
call get_users();
call get_users_carves_attendee(2);

call get_users_created_carves(2);
call get_user_sent_notifications(2);
call get_users_inbox(2);
call get_users_inbox_read(2);
call get_users_inbox_Unread(2);
call get_users_messages(2);
call get_users_sent(2);
call get_venue(2);
call get_venue_carve(3);
call get_venue_followers(2);
call get_venue_media(2);
call get_venues_followed(2);
call logout(6);
call logout_all();
-- 18:58:06	call logout_all()	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00030 sec
set @userId = 0;
call CCv4.password_check('1', 'sam', @userId);
select @userId;

call CCv4.update_carve(1, 'Snowboard Trip', 1, 4, 'open', 1, 1, '2019-01-02', 0, 'snowboard');
call CCv4.update_carve_attendee(4, 4, 6, 'photographer');
call update_carve_attendees();
call update_carves();
call CCv4.update_comment(4, 4, 3, 2, 1, 'hey it was fun');
call update_comments();
call CCv4.update_follow(1, 1, 4, 5, 'block');
call CCv4.update_follows();
call CCv4.update_follow_venue(1, 3, 3);
call CCv4.update_like(1, 1, 'dislike', 3, 2, 3);
call update_likes();
call CCv4.update_medi(3, 3, 'come join me in this adventure', 'mountain skiing', 4, 9, 1);
call update_media();
call CCv4.update_message(1, 1, 4, 'hey', 'how are you', 'normal');
call update_message_read(1);
call update_messages();
call CCv4.update_user(10, 'Dhruv', 'dhruv@gmail.com', 'DropSurf2', 'Dhruv', 'Patel', 'world trotter', 'photographer', 'ski', 'waterski', 'skateboard', 'skydive');
call update_users();
call CCv4.update_venue(15, 'Matterhorn Mountain', 'Lucern', 'BN', 'snowmobile', 'surf', 'skateboard', 'hangGlide', 'Higest mountain peak in Europe');
call CCv4.update_venues(15, 'Schiltorn', 'Geneva', 'LN', 'ski', 'surf', 'bmx', 'hangGlide');
call CCv4.username_check('5');








