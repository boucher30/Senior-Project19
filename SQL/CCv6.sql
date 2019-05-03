CREATE PROCEDURE `user_of_media` ()
BEGIN
select * from users where users.user_id = media.profile;
END