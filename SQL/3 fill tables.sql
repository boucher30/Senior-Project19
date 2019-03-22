
call new_empty_user();
call new_empty_user();
call new_empty_venue();
call new_empty_venue();
call new_empty_comment();
call new_empty_embedd();
call new_empty_carve();
call new_empty_carve();

call new_user("frosty","312@abc.com", "abc1234","Sean","Klinglesmith", 0, 1, 1,0,0,0,0,0);
call new_user("cmarcy","def@123.com", "abc1234","Christian","Marcy", 1, 0, 1,0,0,0,0,0);
call new_user("shred","456@abc.com", "abc1234","Fred","Budde", 1, 1, 1,0,0,0,0,0);
call new_user("wheels","492@abc.com", "abc1234","Brandon","Wheeler", 0, 1, 0,1,0,0,0,0);
call new_user("Jman","789@abc.com", "abc1234","RJ","Boucher", 1, 0, 0,1,0,0,0,0);
call new_user("moneyman","467@abc.com", "abc1234","Dhruv","Patel", 1, 1, 0,0,1,1,0,0);
call new_user("Andez","789@abc.com", "abc1234","Dylan","Anderson", 1, 0, 0,1,1,0,0,0);
call new_user("iceman","223@abc.com", "abc1234","MD","Monir", 0, 1, 1,0,0,1,1,0);
call new_user("frosty1","312@abc.com", "abc1234","Sean","Klinglesmith", 0, 1, 1,0,0,0,0,0);
call new_user("cmarcy1","def@123.com", "abc1234","Christian","Marcy", 1, 0, 1,0,0,0,0,0);
call new_user("shred1","456@abc.com", "abc1234","Fred","Budde", 1, 1, 1,0,0,0,0,0);
call new_user("wheels1","492@abc.com", "abc1234","Brandon","Wheeler", 0, 1, 0,1,0,0,0,0);
call new_user("Jman1","789@abc.com", "abc1234","RJ","Boucher", 1, 0, 0,1,0,0,0,0);
call new_user("moneyman1","467@abc.com", "abc1234","Dhruv","Patel", 1, 1, 0,0,1,1,0,0);
call new_user("Andez1","789@abc.com", "abc1234","Dylan","Anderson", 1, 0, 0,1,1,0,0,0);
call new_user("iceman1","223@abc.com", "abc1234","MD","Monir", 0, 1, 1,0,0,1,1,0);
call new_user("frosty2","312@abc.com", "abc1234","Sean","Klinglesmith", 0, 1, 1,0,0,0,0,0);
call new_user("cmarcy2","def@123.com", "abc1234","Christian","Marcy", 1, 0, 1,0,0,0,0,0);
call new_user("shred2","456@abc.com", "abc1234","Fred","Budde", 1, 1, 1,0,0,0,0,0);
call new_user("wheels2","492@abc.com", "abc1234","Brandon","Wheeler", 0, 1, 0,1,0,0,0,0);
call new_user("Jman2","789@abc.com", "abc1234","RJ","Boucher", 1, 0, 0,1,0,0,0,0);
call new_user("moneyman2","467@abc.com", "abc1234","Dhruv","Patel", 1, 1, 0,0,1,1,0,0);
call new_user("Andez2","789@abc.com", "abc1234","Dylan","Anderson", 1, 0, 0,1,1,0,0,0);
call new_user("iceman2","223@abc.com", "abc1234","MD","Monir", 0, 1, 1,0,0,1,1,0);

call new_venue("mt snow", "VT","somecity",1,1,0,0,0);
call new_venue("mt rock", "NY","somewhere",1,1,0,0,1);
call new_venue("skatepark", "NJ","somewhere",0,0,1,0,0);
call new_venue("beach", "CA","somewhere",0,0,0,1,0);
call new_venue("mt snow1", "CO","somewhere",1,1,0,0,0);
call new_venue("mt rock1", "NH","somewhere",1,1,0,0,1);
call new_venue("skatepark1", "PA","somewhere",0,0,1,0,0);
call new_venue("beach1", "HI","somewhere",0,0,0,1,0);
call new_venue("mt snow2", "CO","somewhere",1,1,0,0,0);
call new_venue("mt rock2", "NH","somewhere",1,1,0,0,1);
call new_venue("skatepark2", "PA","somewhere",0,0,1,0,0);
call new_venue("beach2", "HI","somewhere",0,0,0,1,0);


call add_buddy(1,2);
call add_buddy(1,3);
call add_buddy(1,4);
call add_buddy(1,5);
call add_buddy(1,6);
call add_buddy(1,7);
call add_buddy(2,3);
call add_buddy(2,4);
call add_buddy(2,5);
call add_buddy(2,6);
call add_buddy(2,7);
call add_buddy(3,4);
call add_buddy(3,5);
call add_buddy(3,6);
call add_buddy(3,7);
call add_buddy(3,3);
call add_buddy(3,4);
call add_buddy(3,5);
call add_buddy(3,6);
call add_buddy(3,7);


call follow_user(1,10);
call follow_user(1,11);
call follow_user(1,12);
call follow_user(1,13);
call follow_user(1,14);
call follow_user(1,15);
call follow_user(1,16);
call follow_user(1,17);
call follow_user(1,18);
call follow_user(1,19);
call follow_user(1,20);
call follow_user(2,10);
call follow_user(2,11);
call follow_user(2,12);
call follow_user(2,13);
call follow_user(3,14);
call follow_user(3,15);
call follow_user(3,16);
call follow_user(3,17);
call follow_user(3,18);
call follow_user(3,19);
call follow_user(3,20);
call follow_user(20,1);
call follow_user(19,1);
call follow_user(20,2);
call follow_user(15,3);



call follow_venue(1,1);
call follow_venue(1,2);
call follow_venue(1,4);
call follow_venue(1,3);
call follow_venue(1,5);
call follow_venue(1,6);
call follow_venue(1,7);
call follow_venue(2,1);
call follow_venue(2,2);
call follow_venue(2,4);
call follow_venue(2,3);
call follow_venue(2,5);
call follow_venue(2,6);
call follow_venue(2,7);
call follow_venue(3,1);
call follow_venue(3,2);
call follow_venue(3,4);
call follow_venue(3,3);
call follow_venue(3,5);
call follow_venue(3,6);
call follow_venue(3,7);



call send_message(1,2, "Subject goes here", "Message body goes here blah blah");
call send_message(1,3, "Subject goes here", "Message body goes here blah blah");
call send_message(2,3, "Subject goes here", "Message body goes here blah blah");
call send_message(2,1, "Subject goes here", "Message body goes here blah blah");

call send_reply_message(2,1, "RE subject goes here", "i am getting back to you blah",1);
call send_reply_message(3,1, "RE subject goes here", "i am getting back to you blah",2);


call send_buddy_request(2,17, "Subject goes here", "be my buddy plz");
call send_buddy_request(1,21, "Subject goes here", "be my buddy plz");
call send_buddy_request(1,22, "Subject goes here", "be my buddy plz");

call new_buddy_carve("2019-03-19", 1, 1, 0, 0, 0, 2, 3, "carve of snowboard or ski with up to 6 athletes, and 3 photographers. on 3/19/2019", 1, 1,1);
call new_buddy_carve("2019-03-19", 10, 0, 1, 0, 0, 6, 3, "carve of snowboard or ski with up to 6 athletes, and 3 photographers. on 3/19/2019", 2, 1,0);

call new_opencarve_novenue_nodate(10, 0, 1, 0, 0, 6, 3, "carve of snowboard or ski with up to 6 athletes, and 3 photographers. on 3/19/2019",  1,1);
call new_opencarve_novenue_date("2019-03-19", 10, 0, 1, 0, 0, 6, 3, "carve of snowboard or ski with up to 6 athletes, and 3 photographers. on 3/19/2019", 1,0);
call new_opencarve_venue_nodate(10, 0, 1, 0, 0, 6, 3, "carve of snowboard or ski with up to 6 athletes, and 3 photographers. on 3/19/2019", 2, 1,1);
call new_opencarve_venue_date("2019-03-19", 10, 0, 1, 0, 0, 6, 3, "carve of snowboard or ski with up to 6 athletes, and 3 photographers. on 3/19/2019", 2, 1,0);

call send_carveattend_request(1,2,1,"can i carve with you","plz");
call send_carveattend_request(1,2,1,"can i carve with you","plz");

call send_carveattend_accept(2,1,1,"yes","you may carve with me",10);
call send_carveattend_decline(2,1,1,"no","f u brah",11);

call send_carveinvite_request(1,2,1,"come carve with me","plz");
call send_carveinvite_request(1,2,1,"come carve with me","plz");

call send_carveinvite_accept(2,1,1,"yes","lets do it",10);
call send_carveinvite_decline(2,1,1,"no","f u brah",11);


