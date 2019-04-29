use CCv5;
-- no commet desnotes it functions properly
-- comment denotes the current  issue 
call CCv5.add_athlete_to_carve(2, 5);
call CCv5.add_buddy(1, 2);
call CCv5.add_carve('MountainHiking', 2, 5, 'open', 5, 4, '2019-02-02', 'snowmobile');
call CCv5.add_carve_attendee(5, 2, 'photographer');
call CCv5.add_photographer_to_carve(6, 7);
call CCv5.add_message(2, 4, 'hello ', 'lets carve together', 'normal');
call CCv5.add_media(5, 'hey ', 'i like it', 4, 7, 9);
call CCv5.add_follow(4, 6, 8, 'buddy');
call CCv5.add_comment(3, 6, 7, 2, 'hey lets go skiing somewhere');
call CCv5.add_like(2, 'like', 2, 4, 6);
call CCv5.delete_carve(2);
-- call CCv5.delete_carve(2)	Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails

call CCv5.delete_carve_attendee(9);
call CCv5.count_venue_followers(5);
call CCv5.buddy_list(5);

call CCv5.add_venue('MatterhornMountain', 'Bern', 'ST', 'ski', 'surf', 'BMX', 'skydive', 'cool mountain!');
call CCv5.add_user('DropSurf', 'Dropsurf@email.net', 'patel', 'Drew', 'Patel', 'I like to travel ', 'photographer', 'ski', 'surf', 'skateboard', 'skydive');

call CCv5.add_venue_follow(1, 5);

call CCv5.delete_media();
-- call CCv5.delete_media()	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00026 sec

call CCv5.delete_medi(6);
call CCv5.delete_likes();
-- 23:20:45	call CCv5.delete_likes()	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00028 sec

call CCv5.delete_like(1);
call CCv5.delete_follows();
-- 23:20:35	call CCv5.delete_follows()	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00026 sec

call CCv5.delete_comments();
-- call CCv5.delete_comments()	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.
call CCv5.delete_comment(2);
call CCv5.delete_carves();
call CCv5.delete_carve_attendees();
call CCv5.get_buddy_media(4);
call CCv5.get_carve(4);
-- 23:25:22	call CCv5.get_carve(4)	Error Code: 1054. Unknown column 'all_carves.venue' in 'on clause'	0.00044 sec
call CCv5.get_carve1(5);
call CCv5.follow_venue(5, 6);
call CCv5.get_all_likes();
call CCv5.get_buddies(2);
call CCv5.get_buddy_count(4);
call CCv5.get_buddy_carves(8);
call CCv5.follow_user(2, 5);
call CCv5.delete_venues();
-- 23:24:24	call CCv5.delete_venues()	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00027 sec
call CCv5.delete_messages();
-- 23:23:53	call CCv5.delete_messages()	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00027 sec

call CCv5.delete_users();
-- 23:24:10	call CCv5.delete_users()	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.00027 sec
call CCv5.delete_venue(2);
-- 23:24:19	call CCv5.delete_venue(2)	Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`ccv5`.`media`, CONSTRAINT `carve4` FOREIGN KEY (`carve`) REFERENCES `carves` (`carve_id`))	0.100 sec
call CCv5.delete_message(5);
call CCv5.delete_user(4);
-- 23:24:00	call CCv5.delete_user(4)	Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`ccv5`.`media`, CONSTRAINT `carve4` FOREIGN KEY (`carve`) REFERENCES `carves` (`carve_id`))	0.016 sec

call CCv5.get_message(2);
call CCv5.get_messages();
call CCv5.get_open_carves();
call CCv5.get_profile_media(7);
call CCv5.get_user(7);
call CCv5.get_comments();
call CCv5.get_follows();
call CCv5.get_like(8);
call CCv5.get_likes();
call CCv5.get_medi(2);
call CCv5.get_media();
call CCv5.get_dislikes();
call CCv5.get_follow(1);
call CCv5.get_followed_carves(3);
call CCv5.get_followed_media(1);
call CCv5.get_carve_likes(3);
call CCv5.get_carve_media(2);
call CCv5.get_carves();
call CCv5.get_carves_attendees(3);
call CCv5.get_comment(3);
call CCv5.get_carve_attendee(1);
call CCv5.get_carve_attendees();
call CCv5.get_carve_comments(5);
call CCv5.get_carve_dislikes(8);
call CCv5.get_message(2);
call CCv5.get_media();
call CCv5.get_medi(2);
call CCv5.get_likes();
call CCv5.get_like(1);
call CCv5.get_follows();
call CCv5.get_followed_media(2);
call CCv5.get_followed_carves(1);
call CCv5.get_follow(2);
call CCv5.get_dislikes();
call CCv5.get_comments();
call CCv5.get_comment(4);
call CCv5.get_carves_attendees(4);
call CCv5.get_carves_attendees(2);
call CCv5.get_carves();
call CCv5.get_carve_media(2);
call CCv5.get_carve_likes(1);
call CCv5.get_user(1);
call CCv5.get_profile_media(2);
call CCv5.get_user_attended(3);
call CCv5.get_user_comments(2);
call CCv5.get_user_followed(1);
call CCv5.get_user_followers(5);
call CCv5.get_user_messages(2);
call CCv5.get_user_notifications(2);
call CCv5.get_messages();

call CCv5.get_users_created_carves(2);
call CCv5.get_users();
call CCv5.get_users_carves_attendee(3);
call CCv5.get_venue(1);
call CCv5.get_users_sent(2);
call CCv5.get_users_messages(2);
call CCv5.get_users_inbox_Unread(4);
call CCv5.get_users_inbox_read(9);
call CCv5.get_user_sent_notifications(1);
call CCv5.get_users_inbox(2);
call CCv5.get_venue_carve(2);
call CCv5.get_venue_followed_media(2);

call CCv5.get_venue_followers(2);
call CCv5.get_venue_media(3);
call CCv5.get_venues();
call CCv5.get_venues_followed(1);
call CCv5.get_venues_followed(3);
call CCv4.update_follow(q, 2, 4, 2, 'follow');
call CCv4.update_comments();

call CCv5.update_user(1, 'Moneyman', 'dhruv@gmail.com', 'password', 'Dhruv', 'Patel', 'photographer', 'photographer', 'ski', 'surf', 'skateboard', 'skydive');
call CCv5.update_users();
call CCv5.update_venue(1, 'mountain eiger', 'bern', 'BY', 'ski', 'surf', 'BMX', 'hangGlide', 'cool mountain peak in swiss');
call CCv5.update_venues(5, 'himalaya', 'Arunachal', 'IN', 'ski', 'surf', 'BMX', 'skydive');
call CCv5.username_check('6');
call CCv5.update_follows();
call CCv5.update_follow_venue(2, 5, 1);
call CCv5.update_like(1, 2, 'like', 1, 2, 1);
call CCv5.update_likes();
call CCv5.update_medi(1, 4, 'hey', 'lets go carve here', 1, 2, 1);
call CCv5.update_message_read(1);
call CCv5.update_messages();
call CCv5.update_media();
call CCv5.update_message(1, 2, 7, 'hey', 'how are you', 'normal');
call CCv5.update_follow(1, 3, 5, 3, 'buddy');

















































































































