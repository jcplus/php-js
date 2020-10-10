function AidUtil () {}

function date (format, timestamp) {
	var week_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		week_full_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		month_full_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		obj = timestamp ? new Date(timestamp) : new Date(),
		last_day = new Date(obj.getFullYear(), obj.getMonth() + 1, -1),
		suffix = 'th';
	if (obj.getDate() === 1) suffix = 'st';
	if (obj.getDate() === 2) suffix = 'nd';
	if (obj.getDate() === 3) suffix = 'rd';
	if (gettype(obj) === 'date_invalid') throw 'Error: invalid timestamp';
	if (gettype(format) !== 'string') format = 'Y-m-d H:i:s';
	format = format.replace(/Y/g, obj.getFullYear()) // A full numeric representation of a year, 4 digits
		.replace(/y/g, obj.getFullYear().toString().slice(2)) // A two digit representation of a year
		.replace(/L/g, is_leap_year(obj.getFullYear()) ? '1' : '0') // Whether it's a leap year

		.replace(/F/g, month_full_names[obj.getMonth()]) // A full textual representation of a month, such as January or March
		.replace(/M/g, month_names[obj.getMonth()]) // A short textual representation of a month, three letters
		.replace(/m/g, obj.getMonth() + 1 > 9 ? obj.getMonth() + 1 : '0' + (obj.getMonth() + 1)) // Numeric representation of a month, with leading zeros
		.replace(/n/g, (obj.getMonth() + 1).toString()) // Numeric representation of a month, without leading zeros
		.replace(/t/g, last_day.getDate().toString()) // Number of days in the given month

		.replace(/d/g, obj.getDate() > 9 ? obj.getDate() : '0' + obj.getDate()) // Day of the month, 2 digits with leading zeros
		.replace(/D/g, week_names[obj.getDay()]) // A textual representation of a day, three letters
		.replace(/j/g, (obj.getDate() + 1).toString()) // Day of the month without leading zeros
		.replace(/l/g, week_full_names[obj.getDay()]) // A full textual representation of the day of the week (lowercase 'L')
		.replace(/N/g, obj.getDay() === 0 ? '7' : obj.getDay()) // ISO-8601 numeric representation of the day of the week
		.replace(/s/g, suffix) // English ordinal suffix for the day of the month, 2 characters
		.replace(/w/g, obj.getDay().toString()) // Numeric representation of the day of the week
		.replace(/z/g, day_of_year(obj).toString()) // The day of the year (starting from 0)

		.replace(/W/g, week_number(obj).toString()) // ISO-8601 week number of year, weeks starting on Monday

		.replace(/H/g, obj.getHours() > 9 ? obj.getHours() : '0' + obj.getHours())
		.replace(/i/g, obj.getMinutes() > 9 ? obj.getMinutes() : '0' + obj.getMinutes())
		.replace(/s/g, obj.getSeconds() > 9 ? obj.getSeconds() : '0' + obj.getSeconds())
		;
	return format;
}

function day_of_year (now) {
	if (gettype(now) !== 'date') throw 'day_of_year requires now to be a valid Date object';
	var start = new Date(now.getFullYear(), 0, 0),
		diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
	return Math.floor(diff / 1000 * 60 * 60 * 24);
}

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

function is_string (param) {
	return typeof param === 'string';
}

function week_number (obj) {
	if (gettype(obj) !== 'date') throw 'week_number requires 1 parameter and it must be a valid Date object';
	var week_number, year_start;
	obj = new Date(Date.UTC(obj.getFullYear(), obj.getMonth(), obj.getDate()));
	obj.setUTCDate(obj.getUTCDate() + 4 - (obj.getUTCDay()||7));
	year_start = new Date(Date.UTC(obj.getUTCFullYear(), 0, 1));
	week_number = Math.ceil((((obj - year_start) / 86400000) + 1) / 7);
	return [obj.getUTCFullYear(), week_number];
}