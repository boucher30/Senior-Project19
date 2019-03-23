NEW SQL 

steps:
1. open the CCv4 file in workbench or mysql command line.
run to completion.

fill tables (only users and venues atm)
in workbench go to the connection, click on the left panel schemas
open up ccv4 -> tables
right click on userstable -> select import data wizard select users.csv
click next until the end. it should add 30 entries.

repeat process for venues table and venues.csv
if successful it should generate 32 entries.

verify by query:
select * from all_venues;
select * from all_users;
