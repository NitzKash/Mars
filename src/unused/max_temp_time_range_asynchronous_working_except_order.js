var request = require('request');
var date=[undefined,undefined];
process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
  if (index>1)					//index 0 is 'node' while index 1 is '<filename>.js' from index 2 are the needed arguments
  	date[index - 2] = val;
});
//console.log(date[0]+ "  "+date[1]);
var page='1';
url='http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start='+date[0]+'&terrestrial_date_end='+date[1]+'&page='+page;

request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	var details=JSON.parse(body);
        //console.log("maximum temperature on "+details.report.terrestrial_date+" is "+details.report.max_temp+" in Celcius"); 
     	//console.log(details);
     	var count=details.count;
     	//console.log(count);
     	no_of_page=Math.ceil(count/10);
     	var sl=1;
     	var mini_count=0;
     	console.log('count= '+count);
     	while(mini_count<10&&count>0)
    	{
   			console.log(sl+" maximum temperature on "+details.results[mini_count].terrestrial_date+" is "+details.results[mini_count].max_temp+" in Celcius");
   			mini_count++;
   			//console.log(mini_count);
     		count--;
     		sl++;
     	}
     	console.log();
     	
     	var i=1;
   		while(i<no_of_page)
   		{
   			i+=1;
   			page=i;
   			console.log('page='+page);
			url='http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start='+date[0]+'&terrestrial_date_end='+date[1]+'&page='+page;
   			console.log(url);
   			
   			request(url, function (error1, response1, body1)
   			{
   				//console.log("inside req");
   				if (!error1 && response1.statusCode == 200)
   				{
   					//console.log("inside if");
     				var details1=JSON.parse(body1);
     				var mini_count=0;
     				if(details1.next!==null)
     				{
     					while(mini_count<10)
		    			{
		     				console.log(sl+" maximum temperature on "+details1.results[mini_count].terrestrial_date+" is "+details1.results[mini_count].max_temp+" in Celcius");
		     				mini_count++;
		     				//console.log(mini_count);
		     				//count--;
		     				sl++;
		     			}
		     		}
		     		else
		     		{
		     			while(details1.results[mini_count]!==undefined)
		    			{
		     				console.log(sl+" maximum temperature on "+details1.results[mini_count].terrestrial_date+" is "+details1.results[mini_count].max_temp+" in Celcius");
		     				mini_count++;
		     				//console.log(mini_count);
		     				//count--;
		     				sl++;
		     			}
		     		}
		     		console.log();
		     	}
		     	else
		     	{
   					console.log("error: "+error1);	
		     		count=0;
		     	}
   			}); 
   			
   		}	
     }
    else
    	console.log("error: "+error);
});