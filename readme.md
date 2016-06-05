#Mars Temperature

This is a simple project made using [node.js](http://nodejs.org) which provides the temperature details of Mars with the help of the [Mars Atmospheric Aggregation System {MAAS} API](http://marsweather.ingenology.com/) provided by [NASA](https://www.nasa.gov/)

##Introduction

After download make sure the current directory of the shell being used is the `src` folder which is inside the `root` folder.
For the first time and if any changes are made to the mars.js file the following command is to be used:
	
	$ npm install -g


##Help

To see the list of operations that can be done use the following:

	$ Mars -h

##Latest information

To see the latest temperatute details of Mars, use the following command:

	$ Mars latest

##Information in a range of date

To see the information in a range of rage, use the followong command:
	
	$ Mars range <start date> <end date>

For example: 

1. if we want the information from 11th of April, 2016 to 10th of May, 2016, use the following command:
	
    	$ Mars range 2016-04-11 2016-05-10

2. if we want the information on date 12th of April, 2016, use the command:

		$ Mars range 2016-04-12 2016-04-12

Note: The {MAAS} API does not provide information daily, so some dates might show no results

##Information represented as a graph

To see a line graph for the information on a given range of date use the following command:

	$ Mars graph <start date> <end date>

For example: 

if we want the graph of the information from 11th of April, 2016 to 10th of May, 2016, use the following command:
		
	$ Mars graph 2016-04-11 2016-05-10

This will produce a `URL` on the shell, by following which the graph can be viewed

This graph is created using the [google chart API](https://developers.google.com/chart/)

Note: An error may occur if the number of stats to be plotted exceeds a given maximum 
