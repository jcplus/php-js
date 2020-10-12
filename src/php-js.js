/**
 * Return all the keys or a subset of the keys of an object
 *
 * @param  {object} obj
 * @return {array}
 */
function json_keys (obj) {
    if (gettype(obj) !== 'object') throw 'json_keys requires an object';
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
}

/**
 * Return all the values of an array
 *
 * @param  {object} obj
 * @return {array}
 */
function json_values (obj) {
    if (gettype(obj) !== 'object') throw 'json_values requires an object';
    var values = [];
    for (var key in obj) {
        values.push(obj[key]);
    }
    return values;
}

/**
 * Returns a string formatted according to the given format string using
 * the given integer timestamp or the current time if no timestamp is given.
 *
 * @param   {string}  format
 * @param   {number} timestamp
 * @returns {string}
 */
function date (format, timestamp) {
	if (gettype(new Date(timestamp)) !== 'date') throw 'Invalid timestamp';
	if (gettype(format) !== 'string') format = 'Y-m-d H:i:s';
	var obj = timestamp ? new Date(timestamp) : new Date(),
		last_day = new Date(obj.getFullYear(), obj.getMonth() + 1, -1),
		hours = obj.getHours(),
		small_hours = hours > 12 ? 24 - hours : hours,
		suffix = 'th',
		result = '';
	if (obj.getDate() === 1) suffix = 'st';
	if (obj.getDate() === 2) suffix = 'nd';
	if (obj.getDate() === 3) suffix = 'rd';
	format.split().forEach(function (char) {
		switch (char) {
			case 'Y': // A full numeric representation of a year, 4 digits
				result += char.replace('Y', obj.getFullYear().toString());
				break;
			case 'y': // A two digit representation of a year
				result += char.replace('y', obj.getFullYear().toString().slice(2));
				break;
			case 'L': // Whether it's a leap year
				result += char.replace('L', is_leap_year(obj.getFullYear()) ? '1' : '0');
				break;
			case 'F': // A full textual representation of a month, such as January or March
				result += month_name(obj.getMonth());
				break;
			case 'M': // A short textual representation of a month, three letters
				result += month_name(obj.getMonth(), true);
				break;
			case 'm': // Numeric representation of a month, with leading zeros
				result += obj.getMonth() + 1 > 9 ? obj.getMonth() + 1 : '0' + (obj.getMonth() + 1);
				break;
			case 'n': // Numeric representation of a month, without leading zeros
				result += obj.getMonth() + 1;
				break;
			case 't': // Number of days in the given month
				result += last_day.getDate();
				break;
			case 'd': // Day of the month, 2 digits with leading zeros
				result += obj.getDate() > 9 ? obj.getDate() : '0' + obj.getDate();
				break;
			case 'D': // A textual representation of a day, three letters
				result += week_name(obj.getDay(), true);
				break;
			case 'j': // Day of the month without leading zeros
				result += obj.getDate();
				break;
			case 'l': // A full textual representation of the day of the week (lowercase 'L')
				result += week_name(obj.getDay());
				break;
			case 'N': // ISO-8601 numeric representation of the day of the week
				result += obj.getDay() === 0 ? '7' : obj.getDay();
				break;
			case 'S': // English ordinal suffix for the day of the month, 2 characters
				result += suffix;
				break;
			case 'w': // Numeric representation of the day of the week
				result += obj.getDay();
				break;
			case 'z': // The day of the year (starting from 0)
				result += day_of_year(obj);
				break;
			case 'W': // ISO-8601 week number of year, weeks starting on Monday
				result += week_number(obj);
				break;
			case 'H': // 24-hour format of an hour with leading zeros
				result += hours > 9 ? hours : '0' + hours;
				break;
			case 'G': // 24-hour format of an hour without leading zeros
				result += hours;
				break;
			case 'h': // 12-hour format of an hour with leading zeros
				result += small_hours > 9 ? small_hours : '0' + small_hours;
				break;
			case 'g': // 12-hour format of an hour without leading zeros
				result += small_hours;
				break;
			case 'i': // Minutes with leading zeros
				result += obj.getMinutes() > 9 ? obj.getMinutes() : '0' + obj.getMinutes();
				break;
			case 's': // Seconds with leading zeros
				result += obj.getSeconds() > 9 ? obj.getSeconds() : '0' + obj.getSeconds();
				break;
			case 'v': // Milliseconds
				result += new Date().toISOString().split('.')[1].replace('Z', '');
				break;
			case 'U': // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
				result += obj.getTime();
				break;
		}
	});
	return result;
}

/**
 * The day of the year (starting from 0)
 *
 * @param   {date}   obj
 * @returns {number}
 */
function day_of_year (obj) {
	if (gettype(obj) !== 'date') throw 'day_of_year requires now to be a valid Date object';
	var start = new Date(obj.getFullYear(), 0, 0),
		diff = (obj - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
	return Math.floor(diff / 1000 * 60 * 60 * 24);
}

/**
 * Determine whether a variable is empty
 *
 * @param   {any}     param
 * @returns {boolean}
 */
function empty (param) {
	switch (gettype(param)) {
		case 'array':
			return !param.length;
		case 'null':
			return true;
		case 'object':
			return !Object.keys(param).length;
		case 'string':
			return !param.replace(/\s+/g, '').length;
		default:
			throw '"' + gettype(param) + '" is unsupported';
	}
}

/**
 * Get the type of a variable
 *
 * @param   {any} param
 * @returns {string}
 */
function gettype (param) {
	switch (typeof param) {
		case 'number':
			if (param.toString().indexOf('.') > -1) return 'float';
			return 'integer';
		case 'object':
			if (param === null) return 'null';
			switch (param.constructor) {
				case Array:
					return 'array';
				case Date:
					if (param.toString() === 'Invalid Date') return 'date_invalid';
					return 'date';
				case Object:
					return 'object';
				default:
					if (
						param.constructor.toString().indexOf('HTML') > -1
						&& param.constructor.toString().indexOf('Element') > -1
					) return 'html';
					return param.constructor.toString().toLowerCase();
			}
		default:
			return typeof param;
	}
}

/**
 * Hash a string using MD5
 * 
 * @credit http://pajhome.org.uk/crypt/md5/md5.html
 * @param  {string} str
 * @return {string}
 */
function md5 (str) {
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binl_md5 (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a =  1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d =  271733878;

        for(var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2rstr (input) {
        var output = '';
        for (var i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn (q, a, b, x, s, t) {return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b)}
    function md5_ff (a, b, c, d, x, s, t) {return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)}
    function md5_gg (a, b, c, d, x, s, t) {return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)}
    function md5_hh (a, b, c, d, x, s, t) {return md5_cmn(b ^ c ^ d, a, b, x, s, t)}
    function md5_ii (a, b, c, d, x, s, t) {return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)}

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    function rstr2binl (input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i ++) output[i] = 0;
        for( var i = 0; i < input.length * 8; i += 8) output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    }

    /*
     * Convert a raw string to a hex string
     */
    function rstr2hex (input) {
        var hexcase = 0, output = '', x;
            hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';

        for (var i = 0; i < input.length; i ++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt( x & 0x0F);
        }
        return output;
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    function str2utf8 (str) {
        var result = '', i = -1, x, y;

        while(++i < str.length) {
            /* Decode utf-16 surrogate pairs */
            x = str.charCodeAt(i);
            y = i + 1 < str.length ? str.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i ++;
            }

            /* Encode result as utf-8 */
            if (x <= 0x7F) {
                result += String.fromCharCode(x);
            } else if (x <= 0x7FF) {
                result += String.fromCharCode(
                    0xC0 | ((x >>> 6 ) & 0x1F),
                    0x80 | ( x         & 0x3F)
                );
            } else if (x <= 0xFFFF) {
                result += String.fromCharCode(
                    0xE0 | ((x >>> 12) & 0x0F),
                    0x80 | ((x >>> 6 ) & 0x3F),
                    0x80 | ( x         & 0x3F)
                );
            } else if(x <= 0x1FFFFF) {
                result += String.fromCharCode(
                    0xF0 | ((x >>> 18) & 0x07),
                    0x80 | ((x >>> 12) & 0x3F),
                    0x80 | ((x >>> 6 ) & 0x3F),
                    0x80 | ( x         & 0x3F)
                );
            }
        }
        return result;
    }

    var utf8_str = str2utf8(str),
        raw_str_md5 = binl2rstr(binl_md5(rstr2binl(utf8_str), utf8_str.length * 8));
    return rstr2hex(raw_str_md5);
}

/**
 * Checks if a value exists in an array
 *
 * @param {any}       needle   // The searched value.
 * @param {array}     haystack // The array.
 * @param {boolean}   strict   // If the third parameter strict is set to TRUE then the in_array() function will also check the types of the needle in the haystack.
 * @returns {boolean}
 */
function in_array (needle, haystack, strict) {
	if (gettype(haystack) !== 'array') throw 'in_array requires haystack to be an array';
	if (empty(haystack)) return false;
	var result = false;
	haystack.forEach(function (each) {
		if (gettype(strict) && strict === true) {
			if (each == needle) result = true;
		} else {
			if (each === needle && gettype(each) === gettype(needle)) result = true;
		}
	});
	return result;
}

/**
 * Finds whether a variable is an array
 *
 * @param   {any}     param
 * @returns {boolean}
 */
function is_array (param) {
	return typeof param === 'object' && param.constructor === Array;
}

/**
 * Finds out whether a variable is a boolean
 *
 * @param  {any}     param
 * @return {Boolean}       [description]
 */
function is_bool (param) {
	return typeof param === 'boolean';
}

/**
 * Finds whether the type of a variable is float
 *
 * @param  {any}     param
 * @return {Boolean}
 */
function is_float (param) {
	return typeof param === 'number' && param.toString().indexOf('.') > -1;
}

/**
 * Find whether the type of a variable is integer
 *
 * @param  {any}     param
 * @return {Boolean}
 */
function is_int (param) {
	return typeof param === 'number' && param.toString().indexOf('.') === -1;
}

/**
 * Find whether the year is a leap year
 *
 * @param  {integer}  year Four digit year number
 * @return {Boolean}
 */
function is_leap_year (year) {
    if (gettype(year) !== 'integer') throw 'is_leap_year requires an integer';
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * inds whether a variable is NULL
 *
 * @param  {any}     param
 * @return {Boolean}
 */
function is_null (param) {
	return typeof param === 'object' && param === null;
}

/**
 * Finds whether a variable is an object
 *
 * @param  {any}     param
 * @return {Boolean}
 */
function is_object (param) {
	return typeof param === 'object' && param.constructor === Object;
}

/**
 * Find whether the type of a variable is string
 *
 * @param   {any}     param
 * @returns {boolean}
 */
function is_string (param) {
	return typeof param === 'string';
}

/**
 * Get the month name
 *
 * @param   {number}  n
 * @param   {boolean} short
 * @returns {string}
 */
function month_name (n, short) {
	if (gettype(n) !== 'integer' || n > 11 || n < 0) throw 'Invalid month number';
	var names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
			'September', 'October', 'November', 'December'];
	return short ? names[n].substr(0, 3) : names[n];
}

/**
 * Return a formatted string
 *
 * @param   {string} format
 * @returns {string}
 */
function sprintf () {
	if (arguments.length < 1) throw 'sprintf requires the first parameter to be a string';
	var args = arguments, format = args[0], i = 0, result = '';

    // No replacements given
    if (arguments.length === 1) return format;

    format = format.replace(/%s/g, function(match) {
        i ++;
        return typeof args[i] !== 'undefined' ? args[i] : match;
    });
	return format;
}

/**
 * Get the week day name
 *
 * @param   {number}  n
 * @param   {boolean} short
 * @returns {string}
 */
function week_name (n, short) {
	if (gettype(n) !== 'integer' || n > 6 || n < 0) throw 'Invalid week number';
	var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return short ? names[n].substr(0, 3) : names[n];
}

/**
 * Get the week number of a given date object
 *
 * @param   {date}   obj
 * @returns {number}
 */
function week_number (obj) {
	if (gettype(obj) !== 'date') throw 'week_number requires 1 parameter and it must be a valid Date object';
	var week_number, year_start;
	obj = new Date(Date.UTC(obj.getFullYear(), obj.getMonth(), obj.getDate()));
	obj.setUTCDate(obj.getUTCDate() + 4 - (obj.getUTCDay()||7));
	year_start = new Date(Date.UTC(obj.getUTCFullYear(), 0, 1));
	week_number = Math.ceil((((obj - year_start) / 86400000) + 1) / 7);
	return [obj.getUTCFullYear(), week_number];
}
