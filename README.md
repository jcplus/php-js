# PHP-AS-JS
A JavaScript library that enables some PHP function for browsers.

##### date (_format_, _timestamp_)

- {string} _format_ Support PHP date format
- {number} _timestamp_ Uses current time if not given (optional)

{string} Returns a formatted according to the given format
    
##### day_of_year (_var_)

- {date} _var_ A valid date object
    
{number} Returns the day of the year

##### empty (_var_)

- {any} _var_ The variable to check

{boolean} Return _TRUE_ if empty, otherwise _FALSE_

##### get_element (_qs_)

- {string} _qs_ Query selector

{element|null} Returns the element if valid, otherwise _NULL_

##### get_elements (_qs_)

- {string} _qs_ Query selector

{array|null} Returns an array of the elements if valid, otherwise _NULL_

##### gettype (_var_)

- {any} _var_ The variable to check

{string} Return the type of the given variable

##### md5 (_var_)

_Credited to [Paul Johnston](http://pajhome.org.uk/crypt/md5/md5.html)_

- {any} _var_ The variable to hash

{string} Return an MD5 hashed string

##### in_array (_needle_, _haystack_, _strict_)

- {any} _needle_ The value to search
- {array} _haystack_ The array to be searched
- {boolean} _strict_ Determine to check types

{boolean} Returns _TRUE_ for found in the given array, otherwise _FALSE_

##### intval (_var_, _base_)

- {any} _var_ The variable to convert
- {number} _base_ Default is 10 for decimal output and 16 for hex output (optional)

{number} Returns a converted integer

##### is_array (_var_)

- {any} _var_ The variable to check

{boolean} Returns _TRUE_ if an array, otherwise _FALSE_

##### is_bool (_var_)

- {any} _var_ The variable to check

{boolean} Returns _TRUE_ if a boolean, otherwise _FALSE_

##### is_float (_var_)

- {any} _var_ The variable to check

{boolean} Returns _TRUE_ if a float, otherwise _FALSE_

##### is_int (_var_)

- {any} _var_ The variable to check

{boolean} Returns _TRUE_ if an integer, otherwise _FALSE_

##### is_leap_year (_var_)

- {any} _var_ The year number to check

{boolean} Returns _TRUE_ if a leap year, otherwise _FALSE_

##### is_null (_var_)

- {any} _var_ The variable to check

{boolean} Returns _TRUE_ if _NULL_, otherwise _FALSE_

##### is_object (_var_)

- {any} _var_ The variable to check

{boolean} Returns _TRUE_ if an object, otherwise _FALSE_

##### is_string (_var_)

- {any} _var_ The variable to check

{boolean} Returns _TRUE_ if a string, otherwise _FALSE_

##### month_name (_n_, _short_)

- {number} _n_ The month number which is an integer between 0 and 11
- {boolean} _short_ Determine if returns the first 3 letters or full names

{string} Returns the name of the month

##### sprintf (_format_, ...)

- {string} _format_ Supports %s only at the moment
- {string} ... variables to replace the format

{string} Returns replaced string

##### ucfirst (_str_)

- {string} _str_ Source string

{string} String with the first letter converted to uppercase

##### uniqid (_len_)

- {number} _len_ The length of the generated hex string

{string} Return generated hex string

##### week_name (_n_, _short_)

- {number} _n_ Week number between 0 and 6
- {boolean} _short_ Determine if return the first 3 letters or full names

{string} Return the name of the week

##### week_number (_obj_)

- {date} _obj_ Date object

{number} Returns the week number in the year