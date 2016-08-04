var express = require('express') ,
	router = express.Router();
var http = require('http');
var request = require('request');
var soap = require('soap');

var url = "http://www.aircheck.net.au/aircheck_webservice/radioinfoservice.asmx?wsdl";

router.get('/airplay',function(req,res){
		var ret = '';
	soap.createClient(url, function(err, client) {
		client.GetWeeklyAirplay(function(err, result) {
			ret += '<table class="layoutTable aircheck">'+
					'<caption class="p-a-0">'+
						'<img src="https://www.radioinfo.com.au/sites/default/files/aircheck-chart.png" alt="Aircheck: National Radio Airplay Chart" style="width: 100%;">'+
					'</caption>'+
					'<thead>'+
					'<tr>'+
						'<th colspan="12" style="text-align:right;border-bottom:1px solid black">Chart Date  :'+result.GetWeeklyAirplayResult.anyType[0].ChartDate+'</th>'+
					
					'</tr>'+
						'<tr>'+
							'<th colspan="2" class="twRank lwRank">Rank</th>'+
							'<th rowspan="2" class="title">Title</th>'+
							'<th rowspan="2" class="artist">Artist</th>'+
							'<th rowspan="2" class="distribution">Distribution</th>'+
							'<th rowspan="2" class="twSpins">TW Spins</th>'+
							'<th rowspan="2" class="lwSpins">LW Spins</th>'+
							'<th colspan="2" class="differenceSpins differencePercent">Difference</th>'+
							'<th rowspan="2" class="weeks">Weeks</th>'+
							'<th rowspan="2" class="lifeSpins">Life Spins</th>'+
						'</tr>'+
						'<tr>'+
							'<th class="twRank">TW</th>'+
							'<th class="lwRank">LW</th>'+
							'<th class="differenceSpins">Spins</th>'+
							'<th class="differencePercent">%</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>';
		    	result.GetWeeklyAirplayResult.anyType.forEach(function(song){
				ret += '<tr>';
							
							
				ret += '<td class="twRank">'+song.RankThisWeek+'</td>';
				ret += '<td class="lwRank">'+song.RankLastWeek+'</td>';
				ret += '<td class="title">'+song.Title+'</td>';
				ret += '<td class="artist">'+song.Artist+'</td>';
				ret += '<td class="distribution">'+song.Label+'</td>';
				ret += '<td class="twSpins">'+song.PlaysThisWeek+'</td>';
				ret += '<td class="lwSpins">'+song.PlaysLastWeek+'</td>';
				ret += '<td class="differenceSpins">'+song.SpinsDifference+'</td>';
				ret += '<td class="differencePercent">'+song.SpinsPercentage+'</td>';
				ret += '<td class="weeks">'+song.Weeks+'</td>';
				ret += '<td class="lifeSpins">'+song.Life+'</td>';
				ret += '</tr>';
			})
	ret +='<tr><td class="twRank lifeSpins airplay_black_white padding_bottom_none" colspan="11" >The National Radio Airplay Chart is song data from all 54 commercial radio stations in Sydney, Melbourne, Brisbane, Gold Coast, Adelaide, Perth, Central Coast, Newcastle & Geelong, plus triple j, ABC Local Radio in Sydney, Melbourne, Brisbane, Adelaide & Perth, FBi Radio & Fresh 92.7.  AirCheck reports each airplay on triple j as one play nationally. Detailed data by song or station, including MTV, MTV Dance, MTV Music & Channel [V] is also available on <a class="airplay_black_white" href="http://www.AirCheck.net.au" target="_blank">www.AirCheck.net.au </a></td></tr></td></tr>';
			ret += '</tbody></table>';
			res.send(ret);
		});
	
	});
	
})

module.exports = router;