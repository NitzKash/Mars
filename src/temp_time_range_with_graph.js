var request = require('sync-request');

var date=[undefined,undefined];
process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
  if (index>1)          //index 0 is 'node' while index 1 is '<filename>.js' from index 2 are the needed arguments
    date[index - 2] = val;
});

var oneDay = 24*60*60*1000;
var startDate = new Date(date[0]);
var endDate = new Date(date[1]);

var diffDays= Math.round(Math.abs((endDate.getTime() - startDate.getTime())/(oneDay))); 


var url='http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start='+date[0]+'&terrestrial_date_end='+date[1];
var res = request('GET', url);
//console.log(res.getBody());
var details=JSON.parse(res.getBody());
//console.log(details1);
var count=details.count;
var no_of_page=Math.ceil(count/10);
var sl=1,i=no_of_page,mini_count;
//console.log('i= '+i+' and no_of_page= '+no_of_page);
console.log('no of stats= '+count); //can plot to 166 values only (for single), for double it is 110
if(count==0)
  console.log('incase of unexpected value of number of stats please see help ');

var flag=0,last_mini_count=count-(no_of_page-1)*10;


var xaxis=[];
var y1axis=[];
var y2axis=[];

while(i>0)
{
  //console.log('inside while at i= '+i);
  page=''+i;
  i--;
  url='http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start='+date[0]+'&terrestrial_date_end='+date[1]+'&page='+page;
  //console.log(url);
  
  res = request('GET', url);
  details=JSON.parse(res.getBody());
  mini_count=9;
  while(mini_count>=0 && count>0)
  {
     if(flag==0)
     {
        flag=1;
        mini_count=last_mini_count-1;
      //  console.log(mini_count);
     }
     console.log(sl+". temperature on "+details.results[mini_count].terrestrial_date+" is maximum "+details.results[mini_count].max_temp+" and minimum "+details.results[mini_count].min_temp+" in Celcius");
     var currentDay=new Date(details.results[mini_count].terrestrial_date);
     var day= Math.round(Math.abs((currentDay.getTime() - startDate.getTime())/(oneDay)));
     xaxis.push(day);
     y1axis.push(details.results[mini_count].max_temp);
     y2axis.push(details.results[mini_count].min_temp);
     mini_count--;
     //console.log(mini_count);
     sl++;
     count--;
  }
  console.log();
}

//console.log(xaxis);
//console.log(yaxis);

var quiche = require('quiche');

 var chart = quiche('line');
 chart.setTitle('dates_VS_temp');
 chart.addData(y2axis, 'min temp', '008000');
 chart.addData(y1axis, 'max temp', '0000FF');
 chart.addAxisLabels('dates', xaxis);
 chart.setAutoScaling();
 chart.setTransparentBackground();

 var imageUrl = chart.getUrl(true); 
 console.log();
 console.log('press the following URL to see the graph: ');
 console.log(imageUrl);
 console.log();
