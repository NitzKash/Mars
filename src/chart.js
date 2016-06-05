var quiche = require('quiche');

 var chart = quiche('line');
 chart.setTitle('Something with lines');
 //chart.addData([3000, 2900, 1500], 'Blah', '008000');
 chart.addData([1000, 1500, 2000], 'max temp', '0000FF');
 chart.addAxisLabels('date', [[new Date(2016,05,01),1000], [new Date(2016,05,02),1500], [new Date(2016,05,03)],2000]);
 chart.setAutoScaling();
 chart.setTransparentBackground();

 var imageUrl = chart.getUrl(true); 
 console.log(imageUrl);

