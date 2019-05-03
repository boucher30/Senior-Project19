CREATE PROCEDURE `likes_count` (in cv int)
BEGIN
SELECT COUNT(b.type) FROM (
SELECT a.type,a.carve  FROM (
SELECT * FROM all_likes
WHERE all_likes.type = 'likes' 
) a JOIN media m ON m.carve = a.carve
) b JOIN carves c ON cv = b.carve;
END