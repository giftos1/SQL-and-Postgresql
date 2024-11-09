**Utility Operators, Keywords, and Functions(Postgres)**

GREATEST

Gives the greatest value from the values provided

**SELECT GREATEST(200, 10, 30);**

Example

Compute the cost to ship each item

Shipping is the maximum of (weight \* $2) or $30

**SELECT name, weight, GREATEST(30, 2 \* weight)**

**FROM products;**

LEAST

This will give the least value from the list given

**SELECT LEAST(1, 20, 50, 100)**

Example

All products are on sale and the rule to calculate the sale price of a product is

Price is the least of the products price \* 0.5 or $400

**SELECT name, price, LEAST(price \* 0.5, 400)**

**FROM products;**

**The case keyword**

Example

Print each product and its price. Also, print a description of the price

If price > 600 then ‘high’, if price > 300 then ‘medium’ else print ‘cheap’

**SELECT**

**name,**

**price,**

**CASE**

**WHEN price > 600 THEN 'high'**

**WHEN price > 300 THEN 'medium'**

**ELSE 'cheap'**

**END**

**FROM products;**

**Else keyword isn’t compulsory(but if there is a row that doesn’t satisfy the two conditions, then we will end up with a default value of 1**


**PGAdmin**

- Tool to manage and inspect a Postgres database
- Can connect to local or remote databases
- Can view/change just about anything in PG

Postgres Server

- A PG Server can contain multiple databases
- All data for a single app lives in a single DB
- Having multiple DB’s is more about working with more than one app on your machine

**Data types**

- Integer
- Date/time
- Boolean
- Currency
- Character
- Range
- Xml
- Binary
- JSON
- Arrays
- UUID
- Geometric

**Numeric types**

- Smallint, integer and bigint -> Numbers without any decimal points
- Smallserial, serial and bigserial -> No decimal point, auto increment
- Decimal, numeric, real, double precision and float -> Number with decimal points

| **Numeric types** | **Range** |
| --- | --- |
| Smallint | \-32768 to 32767 |
| Integer | \-2147583648 to 2174483647 |
| Bigint | \-922337203685775808 to 9223372036854775807 |
| smallserial | 1 to 32767 |
| serial | 1 to 2147483647 |
| bigserial | 1 to 9223372036854775807 |
| decimal | 131072 digits before decimal point, 16383 after |
| Numeric | 131072 before decimal point, 16383 after |
| Real | 1E-37 to 1E37 with at least 6 places precision |
| Double precision | 1E-307 to 1E308 with at least 15 place precision |
| float | Same as real or double precision |

**Fast Rules on Numeric Data Types**

|     | ‘id’ column of any table | Mark the column as **serial** |
| --- | --- | --- |
|     | Need to store a number without a decimal | Mark the column as **integer** |
| Bank balance, grams of gold, scientific calculations | Need to store a number **with a decimal and this data needs to be very accurate** | Mark the column as **numeric** |
| Kilograms of trash in a landfill, litres of water in a lake, air pressure in a tire | Need to store a number **with a decimal and the decimal doesn’t make a big difference** | Mark the column as **double precision** |

Floats are notoriously known for being inaccurate

SCRIPTS

SELECT 2 + 2; // returns a column with value 4

SELECT (2.0::INTEGER); // converts the datatype from numeric to integer

**Character Types**

CHAR(5) – Store some characters, length will always be 5 even if PG has to insert spaces

VARCHAR – Store any length of string

VARCHAR(40) – Store a string up to 40 characters, automatically remove extra characters

TEXT – Store any length of string

_NB: There is no performance difference in these character types unlike other types of databases_

**Boolean Types**

true, yes, on, 1, t, y - TRUE

false, no, off, 0, f, n - FALSE

null - NULL

Example

SELECT ('y'::BOOLEAN); // returns TRUE

SELECT ('n'::BOOLEAN); // returns FALSE

SELECT (NULL::BOOLEAN); // returns \[null\]

**DATE**

1980-11-20 -> 20 November 1980

Nov-20-1980 -> 20 November 1980

20-Nov-1980 -> 20 November 1980

1980-Novemberr-20 -> 20 November 1980

November 20, 1980 -> 20 November 1980

**_NB: PostgreSQL converts any date format into a fixed date value as above_**

**_SELECT ('NOV-20-1980'::DATE);_**

**_SELECT ('NOV 20 1980'::DATE);_**

**_SELECT ('NOV,20,1980'::DATE);_**

**_SELECT ('NOV 20,1980'::DATE);_**

_Gives –> 1980-11-20_

**TIME, Time without time zone**

01:23 AM -> 01:23, no time zone

05:23 PM -> 17:23, no time zone

20:34 -> 20:34, no time zone

**SELECT ('01:23 AM'::TIME); SELECT ('01:23 PM'::TIME WITHOUT TIME ZONE);**

Returns 01:23:00

**SELECT ('01:23 PM'::TIME);**

Returns 13:23:00

**SELECT ('02:30'::TIME);**

Returns 02:30:00

**TIME WITH TIME ZONE**

01:23 AM EST -> 01:23-05:00 (The minus 5 indicates, 5 hrs behind UTC time)

05:23 PM PST -> 17:23-08:00

05:23 PM UTC -> 17:23+00:00

05:23 PM UTC -> 17:23+00:00

**SELECT ('01:23:23 AM EST'::TIME WITH TIME ZONE);**

**SELECT ('01:23:23 AM Z'::TIME WITH TIME ZONE); (z is utc)**

**SELECT ('01:23:23 AM UTC'::TIME WITH TIME ZONE); (utc)**

**TIMESTAMP WITH TIME ZONE**

Nov-20-1980 05:23 PM PST -> 1980-11-20 18:23:00-07

**SELECT ('NOV-20-1980 1:23 AM PST'::TIMESTAMP WITH TIME ZONE);**

Returns -> 1980-11-20 19:23:00+10

**INTERVAL**

1 day -> 1 day

1 D -> 1 day

1 D 1M 1S -> 1 day 1 minute 1 second

Think of an interval as a duration of time

**SELECT ('1 day'::INTERVAL);**

**SELECT ('1 D'::INTERVAL);**

**SELECT ('1 D 20 H'::INTERVAL);**

Returns -> 1 day 20:00:00

**SELECT ('1 D 20 H 30 M 40 S'::INTERVAL);**

Returns -> 1 day 20:30:40

Can perform operations like:

**SELECT ('1 D 20 H 30 M 40 S'::INTERVAL) - ('1 D'::INTERVAL);**

Returns -> 20:30:40

**SELECT ('NOV-20-1980 1:23 AM EST':: TIMESTAMP WITH TIME ZONE) - ('1 D'::INTERVAL);**

Returns -> 1980-11-19 16:23:00+10

**SELECT**

**('NOV-20-1980 1:23 AM EST':: TIMESTAMP WITH TIME ZONE)**

**\-**

**('NOV-10-1980 1:23 AM EST':: TIMESTAMP WITH TIME ZONE);**

Returns -> 10 days

It can work with different time zones as well:

**SELECT**

**('NOV-20-1980 1:23 AM EST':: TIMESTAMP WITH TIME ZONE)**

**\-**

**('NOV-10-1980 5:43 AM PST':: TIMESTAMP WITH TIME ZONE);**

Returns -> 9 days 16:40:00