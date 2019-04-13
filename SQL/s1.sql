use ccv4;

select * from all_users;
select * from all_venues;
select * from all_carves;
select * from all_follows;
select * from all_carve_attendees;
select * from all_messages;
select * from all_likes;
call add_carve('bob',1,1,'buddy',5,5,'2019-03-29','snowboard');
select * from all_carves where type = 'open';
call get_users_created_carves(1);
call get_users_carves_attendee(1);
call get_users_sent(1);
call get_users_inbox(1);
call get_user_notifications(1);
call get_user_sent_notifications(1);
call add_comment(1,1,null,null,"comment goes here");
call get_carve_comments(1);
call add_buddy(11,1);
select * from carves where carve_id  in (select carve from carve_attendees where user = 1);
select user_id2 from all_follows where type = 'buddy' and user_id1 = 1 ;
select distinct user_Id1 from all_follows inner join follows on user_id1 = user_id2 = 1 ;
select user_id1,user_id2 from all_follows where (type = 'buddy' and (user_id1 = 1 or user_id2 = 1)) GROUP BY user_id1,user_id2 ; 

select CONCAT( user_id1,' ', user_id2) from all_follows where type = 'buddy' and user_id1 = 1 or user_id2 =1;
select group_concat(distinct all_follows ) from all_follows;

select user_id2 from all_follows where type = 'buddy' and user_id1 = 1 union
select user_id1 as user_id2 from all_follows where type = 'buddy' and user_id2 = 1 ;

select * from all_carves left join all_carve_attendees on all_carves.carve_id = all_carve_attendees.carve;

call get_all_likes();
call buddy_list(6);
call get_user_notifications(1);

