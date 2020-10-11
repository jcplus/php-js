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

function is_boolean (param) {
	return typeof param === 'boolean';
}

function is_float (param) {
	return typeof param === 'number' && param.toString().indexOf('.') > -1;
}

function is_int (param) {
	return typeof param === 'number' && param.toString().indexOf('.') === -1;
}

function is_leap_year (year) {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function is_null (param) {
	return typeof param === 'object' && param === null;
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
        return typeof args[i] !== 'undefined' : args[i] : match;
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
