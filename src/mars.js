#!/usr/bin/env node
var program = require('commander');

var exec = require('child_process').exec, child;

program
   .version('0.0.1')

program
	.command('latest')
	.description('displays latest temperature')
	.action(function()
			{
				child = exec('node latest_temp.js', function (error, stdout, stderr) 
				{
					if (error !== null) 
				      	console.log('exec error: ' + error);
				    console.log(stdout);
				});
			});
					
program
	.command('range [start] [end]')
	.description('displays temperature in given as \'range start_date end_date\': syntax:- range YYYY-MM-DD YYYY-MM-DD') 
	.action(function(start,end)
			{
				end = end || 'end_empty';
				start = start || 'start_empty';
    			//console.log('results will be displayed form %s to %s', start, end);
    			var internal_command='node temp_time_range_synchronous.js '+start+' '+end;
    			child = exec(internal_command, function (error, stdout, stderr) 
				{
				 	if (error !== null) 
				       	console.log('exec error: ' + error);
				    console.log(stdout);
				});
			});

program
	.command('graph [start] [end]')
	.description('plots temperature in given as \'range start_date end_date\': syntax:- range YYYY-MM-DD YYYY-MM-DD \n note: may raise error if number of stats to be plotted exceed the allowed maximum for google chart api ') 
	.action(function(start,end)
			{
				end = end || 'end_empty';
				start = start || 'start_empty';
    			//console.log('results will be displayed form %s to %s', start, end);
    			var internal_command='node temp_time_range_with_graph.js '+start+' '+end;
    			child = exec(internal_command, function (error, stdout, stderr) 
				{
				 	if (error !== null) 
				       	console.log('exec error: ' + error);
				    console.log(stdout);
				});
			});

program
   .command('*')
   .description('undefined subcommand')
   .action(function() 
   			{
     			console.log('wrong subcommand');
   			});

  program.parse(process.argv);
