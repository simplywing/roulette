/*
Written by Joël Ammann July 2016

https://livetrax.ch

http://javascriptcompressor.com/
http://jscompress.com/
*/

var time = {

	mysql2qts: function(date){
		// expected format: 2016-07-11 13:12:07
		var separator = date.split(" ");
		var datepart = separator[0].split("-");
		var timepart = separator[1].split(":");

		var year = parseFloat(datepart[0]);
		var month = parseFloat(datepart[1] - 1);
		var day = parseFloat(datepart[2]);
		var h = parseFloat(timepart[0]);
		var m = parseFloat(timepart[1]);
		var s = parseFloat(timepart[2]);

		var dateobj = new Date(year, month, day, h, m, s, 0);
		return Math.round(dateobj.getTime()/1000);
	},

	mysql2userCH: function(date){
		// expected format: 2016-07-11 13:12:07
		var separator = date.split(" ");
		var datepart = separator[0].split("-");
		var timepart = separator[1].split(":");

		var year = parseFloat(datepart[0]);
		var month = parseFloat(datepart[1]);
		var day = parseFloat(datepart[2]);
		var h = parseFloat(timepart[0]);
		var m = parseFloat(timepart[1]);
		var s = parseFloat(timepart[2]);

		if(month < 10) month = "0" + month;
		if(day < 10) day = "0" + day;
		if(h < 10) h = "0" + h;
		if(m < 10) m = "0" + m;
		if(s < 10) s = "0" + s;

		var res = day + "." + month + "." + year + " " + h + ":" + m + ":" + s;
		return res;
	},

	qts2mysql: function(date){
		var milsec = date  * 1000;
		var dateobj = new Date(milsec);
		var year = dateobj.getFullYear();
		var month = dateobj.getMonth() + 1;
		var day = dateobj.getDate();
		var h = dateobj.getHours();
		var m = dateobj.getMinutes();
		var s = dateobj.getSeconds();

		if(month < 10) month = "0" + month;
		if(day < 10) day = "0" + day;
		if(h < 10) h = "0" + h;
		if(m < 10) m = "0" + m;
		if(s < 10) s = "0" + s;

		var res = year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
		return res;
	},

	qts2userCH: function(date){
		var milsec = date  * 1000;
		var dateobj = new Date(milsec);
		var year = dateobj.getFullYear();
		var month = dateobj.getMonth() + 1;
		var day = dateobj.getDate();
		var h = dateobj.getHours();
		var m = dateobj.getMinutes();
		var s = dateobj.getSeconds();

		if(month < 10) month = "0" + month;
		if(day < 10) day = "0" + day;
		if(h < 10) h = "0" + h;
		if(m < 10) m = "0" + m;
		if(s < 10) s = "0" + s;

		var res = day + "." + month + "." + year + " " + h + ":" + m + ":" + s;
		return res;
	},

	qts2userEN: function(date){
		var milsec = date  * 1000;
		var dateobj = new Date(milsec);
		var year = dateobj.getFullYear();
		var month = dateobj.getMonth() + 1;
		var day = dateobj.getDate();
		var h = dateobj.getHours();
		var m = dateobj.getMinutes();
		var s = dateobj.getSeconds();

		if(month < 10) month = "0" + month;
		if(day < 10) day = "0" + day;
		if(h < 10) h = "0" + h;
		if(m < 10) m = "0" + m;
		if(s < 10) s = "0" + s;

		var res = year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
		return res;
	},

	qts2dev: function(date){
		var milsec = date  * 1000;
		var dateobj = new Date(milsec);
		var year = dateobj.getFullYear();
		var month = dateobj.getMonth() + 1;
		var day = dateobj.getDate();
		var h = dateobj.getHours();
		var m = dateobj.getMinutes();
		var s = dateobj.getSeconds();

		return {
			year: year,
			month: month,
			day: day,
			h: h,
			m: m,
			s: s
		}
	}
}

var random = {

	generateString: function(length){

		    var text = [];
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for(var i=0; i < length; i++){
		    	// Zahl zwischen 0 und 1 multipliziert mit 62 gerundet auf Ganzzahl
		        text[i] = possible.charAt(Math.floor(Math.random() * possible.length));
		    }

		    return text.join("");
		
	},

	generateHex: function(length){

		    var text = [];
		    var possible = "0123456789abcdef";

		    for(var i=0; i < length; i++){
		    	// Zahl zwischen 0 und 1 multipliziert mit 62 gerundet auf Ganzzahl
		        text[i] = possible.charAt(Math.floor(Math.random() * possible.length));
		    }

		    return text.join("");
		
	},
}