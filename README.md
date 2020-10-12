# PHP-AS-JS
A JavaScript library that enables some PHP function for browsers.

##### add_class (_element_, _..._)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {element} | _element_ | HTML element to add class on | |
| {array|string} | _..._ | Array or string of the class | |

> **Returns** {element}   
> The element with class added

##### date (_format_, _timestamp_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {string} | _format_ | Support PHP date format | |
| {number} | _timestamp_ | Uses current time if not given | Yes |

> **Returns** {string}   
> A formatted according to the given format

##### day_of_year (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {date} | _var_ | A valid date object | |

> Returns {number}   
> The day of the year

##### empty (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to check | |

> Returns {boolean}   
> _TRUE_ if empty, otherwise _FALSE_

##### get_element (_qs_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {string} | _qs_ | Query selector | |

> Returns {element|null}   
> The element if valid, otherwise _NULL_

##### get_elements (_qs_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {string} | _qs_ | Query selector | |

> Returns {array|null}   
> An array of the elements if valid, otherwise _NULL_

##### gettype (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to check | |

> Returns {string}   
> The type of the given variable

##### md5 (_var_)

| Type | Parameters | Description | Optional | Credit |
| --- | --- | --- | --- | --- |
| {any} | _var_ | The variable to hash | | [Paul Johnston](http://pajhome.org.uk/crypt/md5/md5.html) |

> Returns {string}   
> An MD5 hashed string

##### in_array (_needle_, _haystack_, _strict_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _needle_ | The value to search | |
| {array} | _haystack_ | The array to be searched | |
| {boolean} | _strict_ | Determine to check types | |

> Returns {boolean}   
> _TRUE_ for found in the given array, otherwise _FALSE_

##### intval (_var_, _base_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to convert | |
| {number} | _base_ | Default is 10 for decimal output and 16 for hex output | Yes |

> Returns {number|string}   
> A converted decimal integer, or a hex string

##### is_array (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to check | |

> Returns {boolean}   
> _TRUE_ if an array, otherwise _FALSE_

##### is_bool (_var_)


| {any} | _var_ | The variable to check | |

> Returns {boolean}   
> _TRUE_ if a boolean, otherwise _FALSE_

##### is_float (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to check | |

> Returns {boolean}   
> _TRUE_ if a float, otherwise _FALSE_

##### is_int (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to check | |

> Returns {boolean}   
> _TRUE_ if an integer, otherwise _FALSE_

##### is_leap_year (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The year number to check | |

> Returns {boolean}   
> _TRUE_ if a leap year, otherwise _FALSE_

##### is_null (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to check | |

> Returns {boolean}   
> _TRUE_ if _NULL_, otherwise _FALSE_

##### is_object (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to check | |

> Returns {boolean}   
> _TRUE_ if an object, otherwise _FALSE_

##### is_string (_var_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {any} | _var_ | The variable to check | |

> Returns {boolean}   
> _TRUE_ if a string, otherwise _FALSE_

##### month_name (_n_, _short_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {number} | _n_ | The month number which is an integer between 0 and 11 | |
| {boolean} | _short_ | Determine if returns the first 3 letters or full names | Yes |

> Returns {string}   
> The name of the month

##### sprintf (_format_, ...)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {string} | _format_ | Supports %s only at the moment | |
| {string} | ... | variables to replace the format | |

> Returns {string}   
> The replaced string

##### ucfirst (_str_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {string} | _str_ | Source string | |

> Returns {string}   
> The string with the first letter converted to uppercase

##### uniqid (_len_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {number} | _len_ | The length of the generated hex string | |

> Returns {string}   
> The generated hex string

##### week_name (_n_, _short_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {number} | _n_ | Week number between 0 and 6 | |
| {boolean} | _short_ | Determine if return the first 3 letters or full names | |

> Returns {string}   
> The name of the week

##### week_number (_obj_)

| Type | Parameters | Description | Optional |
| --- | --- | --- | --- |
| {date} | _obj_ | Date object | |

> Returns {number}   
> The week number in the year
