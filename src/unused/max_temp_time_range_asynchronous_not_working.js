var request = require('request');
var date=[undefined,undefined];
process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
  if (index>1)					//index 0 is 'node' while index 1 is '<filename>.js' from index 2 are the needed arguments
  	date[index - 2] = val;
});

var no_of_page,count;
var url='http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start='+date[0]+'&terrestrial_date_end='+date[1];

request(url, function (error, response, body) 
{
    if (!error && response.statusCode == 200) 
    {
    	var details=JSON.parse(body);
     	count=details.count;
     	no_of_page=Math.ceil(count/10);
     	console.log('count= '+count+' no of pages= '+no_of_page);
     }
     else
    	console.log("error: "+error);
});
   	

var page, i=0,sl=1;


while(i<=no_of_page)
{
	console.log('inside while at i= '+i);
	i++;
	page=''+i;
	url='http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start='+date[0]+'&terrestrial_date_end='+date[1]+'&page='+page;
	console.log(url);
	
	request(url, function (error, response, body) 
	{
    	if (!error && response.statusCode == 200) 
    	{
    		var details=JSON.parse(body);
    		var mini_count=0;
    		while(mini_count<10 && count>0)
			{
				console.log(sl+" maximum temperature on "+details.results[mini_count].terrestrial_date+" is "+details.results[mini_count].max_temp+" in Celcius");
	  			mini_count++;
	  			//console.log(mini_count);
	  			sl++;
	  			count--;
			}
			console.log();
    	}
    	else
    		console.log("error: "+error);
    });
}