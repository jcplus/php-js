# PHP-JS
A JavaScript library that enables some PHP function for browsers.

### date

##### Parameters

- {string} Support PHP date format
    
- {number} Timestamp integer uses current time if not given (optional)

##### Returns

{string} Formatted according to the given format
    
### day_of_year

##### Parameters

- {date} object
    
##### Returns

{number} The day of the year

### empty

##### Parameters

- {any} variable to be checked

### gettype

##### Parameters

- {any} variable to be checked

##### Returns

{string} type of the given variable

### md5

##### Credited

[Paul Johnston](http://pajhome.org.uk/crypt/md5/md5.html)

##### Parameters

- {any} variable to hash

##### Returns

{string} MD5 hashed string

### in_array

##### Parameters

- {any} the value to search
- {array} the array to be searched
- {boolean} TRUE to check if type matched

##### Returns

{boolean} TRUE for found in the given array, otherwise FALSE

### intval

##### Parameters

- {any} variable to convert
- {number} default is 10 for decimal and 16 for hex (optional)

##### Returns

{number} An integer

### is_array

##### Parameters

- {any} variable to check

##### Returns

{boolean} TRUE is an array, otherwise FALSE