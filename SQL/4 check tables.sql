call get_users;
call get_venues;

call get_user_athlete();
call get_user_photographer();
call get_user_fan();
call get_venue_snowboard();
call get_venue_skateboard();
call get_venue_ski();
call get_venue_surf();
call get_venue_mountain_bike();

call login("jman","abc1234", @userid);
call login("frosty","abc1234",@userid);
call login("frosty","a",@userid);

call get_user_username("fr");
call get_user_first("ch");
call get_user_last("bud");
call get_user_full("se","kl");

call get_venue_venuename("mt");
call get_venue_city("som");
call get_venue_state("N");
call get_venue_location("some","N");

call get_buddies(1);
call get_buddies(2);
call get_buddies(3);

call get_followed(1);
call get_followers(1);
call get_followed(2);
call get_followers(2);
call get_followed(3);
call get_followers(3);
call get_followers(11);
call get_followers(12);

call venues_followed(1);
call venues_followed(2);
call get_venue_followers(1);

call get_incoming_messages(1);
call get_outgoing_messages(2);

call get_incoming_buddy_requests(17);
call get_outgoing_buddy_requests(1);

call get_incoming_carveattend_requests(2);
call get_outgoing_carveattend_requests(1);

call get_carves();