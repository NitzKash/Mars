var request = require('sync-request');

var date = [undefined,undefined];
process.argv.forEach(function (val, index, array) 
  {
    //console.log(index + ': ' + val);
      if (index > 1)          //index 0 is 'node' while index 1 is '<filename>.js' from index 2 are the needed arguments
          date[index - 2] = val;
  });

var url = 'http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start='+date[0]+'&terrestrial_date_end='+date[1];
var res = request('GET', url);
//console.log(res.getBody());
var details = JSON.parse(res.getBody());
//console.log(details1);
var count = details.count;

var no_of_page = Math.ceil(count/10);
var sl = 1, i = 0, mini_count;
//console.log('i= '+i+' and no_of_page= '+no_of_page);

console.log('no of stats= ' + count);
if(count == 0)
  console.log('incase of unexpected value of number of stats please see help ');


while(i < no_of_page)
{
  flag = 0;
  //console.log('inside while at i= '+i);
  i++;
  page = ''+i;
  url = 'http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start='+date[0]+'&terrestrial_date_end='+date[1]+'&page='+page;
  //console.log(url);
  
  res = request('GET', url);
  details = JSON.parse(res.getBody());
  mini_count = 0;
  while(mini_count < 10  &&  count > 0)
  {
     console.log(sl+". temperature on "+details.results[mini_count].terrestrial_date+" is maximum "+details.results[mini_count].max_temp+" and minimum "+details.results[mini_count].min_temp+" in Celcius");
     mini_count++;
     //console.log(mini_count);
     sl++;
     count--;
  }
  console.log();
}