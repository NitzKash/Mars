var request = require('request');

request('http://marsweather.ingenology.com/v1/latest/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	details=JSON.parse(body);
        console.log("Temperature on "+details.report.terrestrial_date+" is maximum "+details.report.max_temp+" and minimum "+details.report.min_temp+" in Celcius"); 
     }
    else
    	console.log("error: "+error);
})