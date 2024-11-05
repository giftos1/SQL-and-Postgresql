**SQL NOTES**

**SQL STATEMENTS**

**SELECT name, area FROM cities WHERE area BETWEEN 2000 AND 4000;**

(Gives cities with an area that is between 2000 and 4000)

name area

Delhi 2240

Sao Paulo 3043

**SELECT name, area FROM cities WHERE name IN ('Delhi', 'Shanghai');**

(gives only cities with the name Shanghai or Delhi)

name area

Delhi 2240

Shanghai 4015

**SELECT name, area FROM cities WHERE name NOT IN ('Delhi', 'Shanghai');**

**(**gives every city that its name is not Delhi or Shanghai)

name area

Tokyo 8223

Sao Paulo 3043

**SELECT name, area FROM cities WHERE area NOT IN (3043, 8223);**

(Gives every city that has an area that is not 3043 or 8223)

name area

Delhi 2240

Shanghai 4015

**SELECT name, area FROM cities WHERE area NOT IN (3043, 8223) AND name = 'Delhi';**

(Gives every city that has an area that is not 3043 or 8223 and is named ‘Delhi’)

name area

Delhi 2240

**SELECT name, area FROM cities WHERE area NOT IN (3043, 8223) OR name = 'Delhi';**

(Gives every city that has an area that is not 3043 or 8223 or is named ‘Delhi’)

name area

Delhi 2240

Shanghai 4015

**SELECT name, area FROM cities WHERE area NOT IN (3043, 8223) OR name = 'Delhi' OR name = 'Tokyo';**

name area

Tokyo 8223

Delhi 2240

Shanghai 4015

Calculating in where clause

**SELECT name, population / area AS population_density FROM cities WHERE population / area > 6000**;

| **name** | **population_density** |
| --- | --- |
| **Delhi** | **12555** |
| **Sao Paulo** | **6879** |

Updating rows

UPDATE cities SET population = 39505000 WHERE name = 'Tokyo';

| **name** | **population** |
| --- | --- |
| Tokyo | 39505000 |

Deleting rows

DELETE FROM cities WHERE name ='Tokyo'; (Deletes Tokyo row from the table)

DELETE FROM cities WHERE name != 'Tokyo'; (Deletes all other rows apart from Tokyo row)

**Relationships in SQL**

1. **_One-to-Many_**

e.g. A user _has many_ photos, A boat has many crew members.

2\. **_Many-to-One_**

e.g. A photo _has one_ user, A comment has one photo

3\. **_Many-to-Many_**

e.g. Students have many classes and classes have many students

e.g. Movies have many actors and Actors have many movies

4\. **_One-to-One_**

e.g. A boat has only one captain and one captain has only one boat.

**Keys in SQL**

Primary key – Uniquely identifies this record in this table.

**Primary key attributes**

1. Each row in every table has one primary key
2. No other row in the same table can have the same value
3. 99% of the time called ‘id’
4. Either an integer or UUID
5. Will never change

Foreign key – Identifies a record (usually in another table) that this row is associated with

**Foreign Key attributes**

1. Rows only have this if they belong to another record
2. Many rows in the same table can have the same foreign key
3. Name varies, usually called something like ‘xyz_id’
4. Exactly equal to the primary key of the referenced row
5. Will change if the relationship changes

**\*(_‘Many’ side of the relationship gets the foreign key column_)**

**SQL STATEMENTS**

The serial word ensures that the primary key gets added automatically every time we add a user.

1. _( Auto-generated ids)_

**CREATE table Users (id SERIAL PRIMARY KEY, username VARCHAR(50));**

**INSERT INTO users (username)**

**VALUES ('monahan93'), ('pferrer'), ('si93onis'), ('99stroman');**

**select \* FROM users;**

| **id** | **username** |
| --- | --- |
| **1** | **monahan93** |
| **2** | **pferrer** |
| **3** | **si93onis** |
| **4** | **99stroman** |

2\. (Creating Foreign key columns)

A table named photos is created with a primary key that is automatically generated, a column named url and column named ‘user_id’ that is a foreign key from the table named users. The ‘user_id’ column will be referencing the primary id column in the users table.

**CREATE table photos (id serial PRIMARY key, url varchar (200), user_id integer REFERENCES users (id));**

**INSERT INTO photos (url, user_id)**

**VALUES ('<http://two.jpg>', 1), ('<http://25.jpg>', 1), ('<http://36.jpg>', 1), ('<http://754.jpg>', 2), ('<http://35.jpg>', 3), ('<http://256.jpg>', 4);  
select \* FROM photos;**

id url user_id

1 <http://one.jpg> 4

2 <http://two.jpg> 1

3 <http://25.jpg> 1

4 <http://36.jpg> 1

5 <http://754.jpg> 2

6 <http://35.jpg> 3

7 <http://256.jpg> 4

3\. (Running queries on associated data - above)

**SELECT \* FROM photos WHERE user_id = 4;**

id url user_id

1 <http://one.jpg> 4

7 <http://256.jpg> 4

The join statements combines the users and photos table allowing us to call the columns url and username from the different tables.

**SELECT url, username FROM photos JOIN users ON users.id = photos.user_id;**

url username

<http://36.jpg> monahan93

<http://25.jpg> monahan93

<http://two.jpg> monahan93

<http://754.jpg> pferrer

<http://35.jpg> si93onis

<http://256.jpg> 99stroman

<http://one.jpg> 99stroman

3 (Foreign Key Constraints Around Insertion)

Inserts a photo that isn’t tied to any user(the null keyword comes in handy)

The user_id column then has a value of NULL

**INSERT INTO photos (url, user_id)**

**VALUES ('<http://jpg>', NULL);**

**Constraints around deletion**

**_Effects of different delete statements in SQL (What happens if you try to delete a user when a photo is still referencing it)_**

_On delete restrict_ -> Throw an error (The default if nothing is specified)

_On delete action_ -> Throw an error

_On delete cascade_ -> Delete the photo too!

_On delete set null_ -> set the ‘user_id’ of the photo to ‘NULL’

_On delete set default_ -> set the ‘user_id’ of the photo to a default value, if one is provided

**SQL STATEMENTS**

**(Testing deletion constraints)**

Deletes entire photos table

**DROP TABLE photos;**

The on delete cascade ensures that if a user is deleted, all related photos to that users id will be deleted too

**CREATE TABLE photos (**

**id SERIAL PRIMARY KEY,**

**url VARCHAR(200),**

**user_id INTEGER REFERENCES users(id) ON DELETE CASCADE**

**);**

The result:

| **id** | **url** | **user_id** |
| --- | --- | --- |
| 1   | http:/one.jpg | 4   |
| 5   | http:/754.jpg | 2   |
| 6   | http:/35.jpg | 3   |
| 7   | http:/256.jpg | 4   |

**ON DELETE SET NULL (example):**

CREATE TABLE photos (

id SERIAL PRIMARY KEY,

url VARCHAR(200),

user_id INTEGER REFERENCES users(id) ON DELETE SET NULL

);

INSERT INTO photos (url, user_id)

VALUES

('http:/one.jpg', 4),

('http:/754.jpg', 2),

('http:/35.jpg', 3),

('http:/256.jpg', 4);

DELETE FROM users WHERE id = 4;

select \* FROM photos;

**_Photos that were related to user_id 4 were converted to null_**

| **id** | **url** | **user_id** |
| --- | --- | --- |
| 2   | http:/754.jpg | 2   |
| 3   | http:/35.jpg | 3   |
| 1   | http:/one.jpg | null |
| 4   | http:/256.jpg | null |

**Joins and Aggregation**

**Joins help:**

1. Find all the comments for the photo with id = 3, along with the username of the comment author.
2. Find the photo with ID = 10 and get the number of comments attached to it
3. Find the user with the most activity (most comments + most photos)

**Aggregation help:**

1. Calculate the average number of characters per comment
2. Find the average number of comments per photo
3. Find the photo with the most comments attached to it

**_Joins_**

Produces values by merging rows from different related tables

Use a join most times that you’re asked to find data that involves multiple resources

**_Aggregation_**

Looks at many rows and calculates a single value

Words like ‘most’, ‘average’, ‘least’ are a sign that you need to use an aggregation

**SQL STATEMENTS**

This displays the column ‘contents’ from the comments table and column ‘username’ from the users table

**_SELECT contents, username_**

**_FROM COMMENTS_**

**_JOIN users on users.id = comments.user_id;_**

**Notes on Joins**

1. Table order between ‘FROM’ and ‘JOIN’ frequently makes a difference
2. We must give context if column names collide
3. Tables can be renamed using the ‘AS’ keyword
4. There are a few kinds of joins!

**SQL STATEMENTS (Alternate Forms of Syntax)**

Its important to specify the exact id column from a specific table in a database to avoid any errors. In this case, we use the id column from the photos table through the statement ‘select photos.id’.

(**Be specific if columns in different tables have the same column name and you are joining the two tables**)

**_SELECT photos.id, contents_**

**_FROM comments_**

**_JOIN photos ON photos.id = comments.photo_id;_**

Columns can always be renamed to something else if they appear on more than one table. Example below prints the both id columns for photo and comment tables. The comment id column was renamed to ‘comment_id’ to prevent any errors from being generated.

SELECT comments.id AS comment_id, photos.id

FROM comments

JOIN photos ON photos.id = comments.photo_id;

**RENAMING TABLES**

Comments table has been renamed to c.

**_SELECT c.id AS comment_id, photos.id_**

**_FROM COMMENTS AS c_**

**_JOIN photos ON photos.id = c.photo_id;_**

\*Can be done without the ‘**AS**’ keyword

**_SELECT c.id AS comment_id, photos.id_**

**_FROM COMMENTS AS c_**

**_JOIN photos ON photos.id = c.photo_id;_**

**DIFFERENT KINDS OF JOINS**

_Removes any rows that do not match the query from either of the two tables_

1. **_Inner Join_**

SELECT url, username FROM photos **JOIN** users ON users.id = photos.user_id;

_Left joins the NULL rows from the photos table (left table) as part of the results._

1. **_Left Outer Join_**

SELECT url, username FROM photos **LEFT JOIN** users on users.id = photos.user_id;

_Right joins the NULL rows from the users table (right table) as part of the results_

1. **_Right Outer Join_**

SELECT url, username FROM photos **RIGHT JOIN** users ON users.id = photos.user_id;

Gives all rows from both the photos and users table (adds ‘NULL’ values to the other columns)

1. **_Full Join_**

SELECT url, username FROM photos **FULL JOIN** users ON users.id = photos.user_id;

**_\*The order matters when it comes to left and right outer joins_**

**WHERE WITH JOIN**

Selects url and contents(comments) of users who commented(contents) on their own photos(url) that they posted.

**SELECT url, contents**

**FROM COMMENTS JOIN photos ON photos.id = comments.photo_id**

**WHERE comments.user_id = photos.user_id;**

**THREE WAY JOIN**

Selects the username and their comments that they posted to their own photos (url) that they uploaded.

**SELECT username, contents, url**

**FROM comments**

**JOIN photos ON photos.id = comments.photo_id**

**JOIN users ON users.id = photos.user_id AND users.id = comments.user_id;**

**Example**

Write a query that will return the title of each book, along with the name of the author, and the rating of a review.  Only show rows where the author of the book is also the author of the review.

**SELECT title, name, rating FROM reviews**

**JOIN books ON books.author_id = reviews.book_id**

**JOIN authors ON authors.id = reviews.reviewer_id AND authors.id = books.author_id;**

AGGREGATING OF RECORDS

**_Grouping_**

1. Reduces many rows down to fewer rows
2. Done by using the ‘**GROUP BY’** keyword
3. Visualizing the result is key to use

**_Aggregates_**

1. Reduces many values down to one
2. Done by using ‘aggregate functions’

Finds the set of all unique user_ids

Takes each row and assigns it to a group based on its user_id

_\*We can only select a grouped column_

**SELECT user_id FROM comments**

**GROUP BY user_id;**

**Aggregate Functions**

COUNT() – Returns the number of values in a group of values

SUM() – Finds the sum of a group of numbers

AVG() – Finds the average of a group of numbers

MIN() – Returns the minimum value of a group of numbers

MAX() – Returns the maximum value of a group of numbers

**SELECT MAX(id)**

**FROM comments;**

| **max** |
| --- |
| **100** |

**SELECT MIN(id)**

**FROM comments;**

| **min** |
| --- |
| **1** |

**SELECT AVG(id)**

**FROM comments;**

| **avg** |
| --- |
| **50.5000000000000000** |

**SELECT COUNT(id)**

**FROM comments;**

| **count** |
| --- |
| **100** |

**SELECT SUM(id)**

**FROM comments;**

| **sum** |
| --- |
| **5050** |

_\*You cannot select a column and an aggregate at the same time. You will end up getting an error._

**Combining Group BY and Aggregates**

Groups comments with their user_ids and selects the largest comment(id) each unique user has

**SELECT user_id, MAX(id)**

**FROM comments**

**GROUP BY user_id;**

| **user_id** | **max** |
| --- | --- |
| **1** | **79** |
| **3** | **100** |
| **5** | **99** |
| **4** | **96** |
| **2** | **91** |

| **user_id** | **num_comments_created** |
| --- | --- |
| **1** | **23** |
| **3** | **17** |
| **5** | **20** |

Shows the number of comments each user  has created

**SELECT user_id, COUNT(user_id) AS num_comments_created**

**FROM comments**

**GROUP BY user_id;**

| **user_id** | **num_comments_created** |
| --- | --- |
| **1** | **23** |
| **3** | **17** |
| **5** | **20** |

**A Gotcha with Count**

Null values are not counted

SELECT COUNT(user_id) FROM photos;

To correct, write:

SELECT COUNT(\*) FROM photos;

**Correct way of counting**

**The statement shows the total number of comments each user posted**

SELECT user_id, COUNT(\*) AS num_of_comments

FROM COMMENTS

GROUP BY user_id;

Grouping with a join

**SELECT name, COUNT(\*)**

**FROM authors JOIN books ON books.author_id = authors.id**

**GROUP BY authors.name;**

| **name** | **COUNT(\*)** |
| --- | --- |
| **JK Rowling** | **2** |
| **Stephen King** | **1** |
| **Agatha Christie** | **2** |

**Filtering Groups with Having**

Having – Filters the set of groups

Having and group by go hand in hand (if you want to do any filtering on the groups, having comes in place)

Quiz

Find the number of comments for each photo where the photo_id is less than 3 and the photo has more than 2 comments

**SELECT photo_id, COUNT(\*)**

**FROM COMMENTS WHERE photo_id < 3**

**GROUP BY photo_id**

**HAVING COUNT(\*) > 2;**

More on having

Quiz

Find the users where the user has commented on the first 50 photos and the user added more than 20 comments on those photos

SELECT user_id, COUNT(\*)

FROM COMMENTS

WHERE photo_id <= 50

GROUP BY user_id

HAVING COUNT(\*) >= 20;

**user_id count**

**1 23**

**5 20**

**4 22**

Main quiz

Given a table of phones, print the names of manufacturers and total revenue (price \* units_sold) for all phones.  Only print the manufacturers who have revenue greater than 2,000,000 for all the phones they sold.

Answer  
SELECT manufacturer, SUM (price \* units_sold)

FROM phones

GROUP BY manufacturer

HAVING SUM (price \* units_sold) > 2000000;

**Working with large datasets**

QUIZ

Write a query to print the number of paid and unpaid orders

**SELECT paid, COUNT(\*)**

**FROM orders**

**GROUP BY paid;**

| **paid** | **count** |
| --- | --- |
| false | 273 |
| true | 277 |

**SORTING RECORDS**

_Selects a group of products and sorts them by their price(least to most expensive)_

**SELECT \* FROM products**

**ORDER BY price;**

_Selects a group of products and sorts them by their price(most to least expensive)_

**SELECT \* FROM products**

**ORDER BY price DESC;**

_Selects a group of products and sorts them by their price(least to most expensive) then weight(ASC order)_

**SELECT \* FROM products**

**ORDER BY price, weight;**

Ascending price then descending weight

**SELECT \* FROM products**

**ORDER BY price, weight DESC;**

**OFFSET AND LIMIT**

Offset 3 – Skip the first three rows of the result set

Limit 2 – Only give the first two rows of the result set

_Skips the first forty rows of users_

**SELECT \* FROM users OFFSET 40;**

Selects only the the first 5 rows of the users table

**SELECT \* FROM users LIMIT 5;**

_Shows the five most expensive products except for the most expensive one_

**SELECT \* FROM products**

**ORDER BY price DESC**

**LIMIT 5**

**OFFSET 1;**

_Write a query that shows the names of only the second and third most expensive phones._

**SELECT name FROM phones**

**ORDER BY price DESC**

**LIMIT 2**

**OFFSET 1;**

**UNIONS AND INTERSECTIONS WITH SETS**

Handling Sets with Union

The union keyword displays only a unique set of rows.(If the same rows are in the separate select statements, the union keyword only lists one of the rows)

UNION ALL – prevents any duplicates from being removed

Quiz

Find the 4 products with the highest price and the 4 products with the highest price/weight ratio

Answer

**(SELECT \* FROM products**

**ORDER BY price DESC**

**LIMIT 4)**

**UNION**

**(SELECT \* FROM products**

**ORDER BY price/weight DESC**

**LIMIT 4)**

**COMMONALITIES WITH INTERSECT**

UNION – Join together the results of two queries and remove duplicate rows

UNION ALL – Join together results of two queries (keeps duplicate rows)

INTERSECT – Find the rows common in the results of two queries. Remove duplicates

INTERSECT ALL – Find the rows common in the results of two queries

EXCEPT – Find the rows that are present in the first query but not the second query. Remove duplicates

EXCEPT ALL – Find the rows that are present in first query but not second query.

**(SELECT \* FROM products**

**ORDER BY price DESC**

**LIMIT 4)**

**INTERSECT**

**(**

**SELECT \* FROM products**

**ORDER BY price / weight DESC**

**LIMIT 4**

**);**

This row is common in both queries due to the intersect word

| **id** | **name** | **department** | **price** | **weight** |
| --- | --- | --- | --- | --- |
| **7** | **Incredible Granite Mouse** | **Home** | **989** | **2** |

**Removing Commonalities with Except**

**(SELECT \* FROM products**

**ORDER BY price DESC**

**LIMIT 4)**

**EXCEPT**

**(**

**SELECT \* FROM products**

**ORDER BY price / weight DESC**

**LIMIT 4**

**);**

One row was removed that was common in both queries(that’s what EXCEPT keyword does)

| **id** | **name** | **department** | **price** | **weight** |
| --- | --- | --- | --- | --- |
| 38  | Awesome Fresh Keyboard | Home | 982 | 30  |
| 46  | Incredible Granite Bacon | Music | 982 | 9   |
| 80  | Small Fresh Gloves | Garden | 991 | 8   |

QUIZ

Write a query that will print the manufacturer of phones where the phone's price is less than 170.  Also print all manufacturer that have created more than two phones.

IMPORTANT: You don't need to wrap each query with parenthesis! Your solution should not have any parens in it

**SELECT manufacturer**

**FROM phones**

**WHERE price < 170**

**UNION**

**SELECT manufacturer**

**FROM phones**

**GROUP BY manufacturer**

**HAVING COUNT(\*) > 2;**

**ASSEMBLING QUERIES WITH SUB QUERIES**

**Quiz**

List the name and price of all products that are more expensive than all products in the ‘Toys’ department

**SELECT name, price**

**FROM products**

**WHERE price > (**

**SELECT MAX(price) FROM products WHERE department = 'Toys'**

**);**

Selects all products that have a higher price than the most expensive product in the toys department

| **name** | **price** |
| --- | --- |
| **Incredible Granite Mouse** | **989** |
| **Practical Rubber Mouse** | **948** |
| **Handmade Rubber Chicken** | **959** |
| **Awesome Fresh Keyboard** | **982** |
| **Incredible Granite Bacon** | **982** |
| **Fantastic Fresh Chips** | **966** |
| **Small Fresh Gloves** | **991** |

Scalar query – A query that results in one row, one column (single value)

**Subqueries in a select**

A subquery written in a select statement should result in a single value

Examples

**SELECT name, price, (**

**SELECT MAX(price) FROM products**

**)**

**FROM products**

**WHERE price > 876;**

**SELECT name, price, (**

**SELECT price FROM products WHERE id = 3**

**) AS id_3_price**

**FROM products**

**WHERE price > 876;**

**MAJOR QUIZ**

Write a query that prints the name and price for each phone.  In addition, print out the ratio of the phones price against max price of all phones (so price / max price).  Rename this third column to price_ratio

**SELECT name, price, price / (SELECT MAX(price) FROM phones) AS price_ratio**

**FROM phones;**

| **name** | **price** | **price_ratio** |
| --- | --- | --- |
| **N1280** | **199** | **0.49874686716791977** |
| **Iphone 4** | **399** | **1** |
| **Galaxy S** | **299** | **0.7493734335839599** |
| **S5620 Monte** | **250** | **0.6265664160401002** |
| **N8** | **150** | **0.37593984962406013** |
| **Droid** | **150** | **0.37593984962406013** |
| **Wave S8500** | **175** | **0.43859649122807015** |

**Subqueries in a from**

Whenever a subquery is made inside a from statement, and alias (e.g. **_AS P_**) must be applied to it

Example

**SELECT name, price_weight_ratio**

**FROM (SELECT name, price / weight AS price_weight_ratio FROM products) AS p**

**WHERE price_weight_ratio > 5;**

_QUIZ_

Calculate the average price

**SELECT MAX(average_price) AS max_average_price**

**FROM (**

**SELECT AVG(price) AS average_price FROM phones**

**GROUP BY manufacturer**

**) AS average_prices;**
