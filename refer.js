var script_version = "0.2 beta";

var dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false });

var last_session_hist;
var last_session_hist_str = "";
last_session_hist_str = G_getCookie("last_multiply_session_hist");
//console.log("sess_str="+last_session_hist_str);

var multiply_hist;
var multiply_hist_str = "";
multiply_hist_str = G_getCookie("multiply_hist_arr");
//console.log ("multiply_hist_str="+multiply_hist_str);

var max_consecutive_losts = G_getCookie('max_consecutive_losts');
var max_consecutive_losts_inplay = G_getCookie('max_consecutive_losts_inplay');
var max_consecutive_losts_session = G_getCookie('max_consecutive_losts_session');
var max_consecutive_losts_inplay_session = G_getCookie('max_consecutive_losts_inplay_session');
var curr_multiply_balance = G_getCookie('curr_multiply_balance');
var max_bet_session = G_getCookie('max_bet_session');
var tot_multiply_sessions = G_getCookie('tot_multiply_games');
var tot_multiply_bets = G_getCookie('tot_multiply_bets');
var tot_multiply_play = G_getCookie('tot_multiply_play');
var last_multiply = G_getCookie("last_multiply"); 

if ( isNaN(parseInt(max_consecutive_losts_inplay_session))) max_consecutive_losts_inplay_session=0;
if ( isNaN(parseInt(max_consecutive_losts_session))) max_consecutive_losts_session=0;
if ( isNaN(parseInt(max_consecutive_losts_inplay)) ) max_consecutive_losts_inplay=0;
if ( isNaN(parseInt(max_consecutive_losts)) ) max_consecutive_losts = 0;
if ( isNaN(parseFloat(curr_multiply_balance)) ) curr_multiply_balance=0;
if ( isNaN(parseFloat(max_bet_session))) max_bet_session=0;
if ( isNaN(parseFloat(tot_multiply_sessions)) ) tot_multiply_sessions = 0;
if ( isNaN(parseFloat(tot_multiply_bets)) ) tot_multiply_bets = 0;
if ( isNaN(parseFloat(tot_multiply_play)) ) tot_multiply_play = 0;
if ( isNaN(parseInt(last_multiply)) ) last_multiply = 0;
if ( last_session_hist_str.length != 0 ) { 
	last_session_hist = JSON.parse(last_session_hist_str);
	//console.log ("last_session_hist="+last_session_hist);
}
if ( multiply_hist_str.length != 0) {
	multiply_hist = JSON.parse(multiply_hist_str);
	//console.log("multiply_hist="+multiply_hist)
}


(function() {
    'use strict';
    console.log('%c>>>> Level 50, welcome Referrer', 'font-weight:bold; color: coral');
  
    setTimeout(function(){ panel_referral_init(); }, 3200 );
    setTimeout(function(){ graphs_init(); }, 3500 );

})();

function panel_referral_init(){

	var script_output_css, script_output;	

	var d = new Date();
	var last_multiply_diff = Math.floor(d.getTime() - last_multiply);
	//console.log("last multiply "+(last_multiply_diff/1000/60)+" minutes ago")
	var milli_between_multiplies = Math.floor(G_MULTIPLY_WAIT_HOURS*60*60*1000);
	var ref_multiply_missing_hours = Math.floor((milli_between_multiplies - last_multiply_diff)/1000/60/60);
	if (ref_multiply_missing_hours < 0) ref_multiply_missing_hours = 0;

	// Estimated Winnings Calc
	var estimate_winnings_session = parseFloat(G_BAS_BET*G_MAX_PLAY).toFixed(8);
	if (G_MULTIPLY_WAIT_HOURS == 0) {
		var estimate_winnings_day = parseFloat( estimate_winnings_session * 24 * G_ROLL_P/10).toFixed(8);
	} else {
		var estimate_winnings_day = parseFloat( estimate_winnings_session * (24/G_MULTIPLY_WAIT_HOURS)).toFixed(8);
	}
	var estimate_winnings_month = parseFloat(estimate_winnings_day * 30).toFixed(8);

	var L_SPEED; var L_HIGH_LOW;
	script_output_css =  "<style>";
	//script_output_css += ".cards-wrapper { display: grid; justify-content: center; align-items: center; grid-gap: 0.5rem; grid-template-columns: 1fr 1fr; padding: 0.5rem 0rem; margin: 0 auto; width: max-content; }";
	script_output_css += ".cards-wrapper-1col { grid-template-columns: 1fr; }";
	script_output_css += ".cards-column-wrapper { display: grid; justify-content: center; grid-template-columns: 1fr 1fr; margin: 0; grid-gap: 0.5em; }";	
	script_output_css += ".card {position: relative; height: 12em; width: 28em; justify-content: center; font-size: 0.8em; border-radius: 1em ;padding:0.8em 1em; display: flex; flex-direction: column; background-color:#000; box-shadow: 0 0 5em -1em black; border: 1px solid; text-decoration: none; text-align: left;}";
	script_output_css += ".card-double-size {width: 56em; }";
	script_output_css += ".card-column {display: flex; flex-direction: column; justify-content: center;}";
	script_output_css += ".script referreal .card-button { box-shadow: 0 0 5em -1em white; }";
	//script_output_css += ".card-button:hover {    background-color: #efefef;}";
	script_output_css += ".card-button-num {font-size: 1.4em; margin-top:0.2em;}";
	script_output_css += ".colored .white {color:white; }";
	script_output_css += ".colored .card {border-color: lime; }"
	script_output_css += ".colored .card .purple {color:plum; }";
	script_output_css += ".colored .card .orange {color: #ffc250} ";
	script_output_css += ".colored .card .yellow {color: #fbff50} ";
	script_output_css += ".colored .card .coral {color:coral; }";
	script_output_css += ".colored .card .lime {color:lime; }";
	script_output_css += ".colored .card .lgrey {color:#bbb; }";
	script_output_css += ".colored .card .bg-yellow {background-color: #feffa4} ";
	script_output_css += ".colored .card .bg-orange {background-color: #ffa275; color: #333;} ";
	script_output_css += ".script_referral {font-size: 12px; background: #bbb; border: 2px groove #09ff00; margin-bottom: 1em;}";
	script_output_css += ".script_referral h1 {font-size: 1.4em; margin: 0;}";
	script_output_css += ".script_referral h2 {font-size: 1.2em; color: #28731a; margin:0; }";
	script_output_css += ".script_referral.grayed {color: #a9a9a9}";
	script_output_css += ".card .true {color:lime; }";
	script_output_css += ".card .false {color:darkred; }";
	script_output_css += ".card h3 {font-size:1.3em; color: aquamarine; position: absolute; top: 0.3em; left: 50%; transform: translate(-50%,0);}";
	script_output_css += ".card h4 {font-size:1.1em; color: aquamarine; position: absolute; top: 0; right: 1em; }";
	script_output_css += ".card h5 {font-size:1.1em; color: aquamarine; margin:0}";	
	script_output_css += ".card .mt1 { margin-top:0.5em; }";
	script_output_css += ".card .mb1 { margin-bottom:0.5em; }";
	script_output_css += ".cards-wrapper-1col.pt0 { padding-top:0; }";
	script_output_css += ".cards-wrapper-1col.pb0 { padding-bottom:0; }";
	
	script_output_css += " @media screen and (max-width: 500px) { .card {max-width: calc(100vw - 4rem); } } ";
	script_output_css += "</style>";


	script_output =  "<div class='center free_play_bonus_box_large script_referral colored' id='script_referral'>";
	script_output += "<h1>Multiply Betting System v."+script_version+"</h1>";
	script_output += "<h2>For Referrals</h2>";
	script_output += "<div class='cards-wrapper cards-wrapper-1col white'>";
	
	script_output += "<div class='cards-wrapper'>";	

	script_output += "<div id='card1' class='card'>";
	script_output += "<div id='card1' class='cards-column-wrapper'>"; // card 1 column wrapper

	script_output += "<div id='card1-left' class='card-column'>"; //card 1 left
	script_output += "<span>Multiply: <span id='ref_multiply_status' class='bold'></span></span>";
	script_output += "<span>Multiply at night: <span id='ref_multiply_at_night' class='bold'></span></span>";
	script_output += "<span>Strategy: <span id='ref_multiply_strategy' class='bold purple'></span></span>";
	script_output += "<span>Speed: <span id='ref_multiply_speed' class='bold coral'></span></span>";
	script_output += "<span>Play Probability: <span id='ref_multiply_speed' class='bold coral'>"+G_ROLL_P+"/100</span></span>";
	script_output += "</div>"; //card 1 left close

	script_output += "<div id='card1-right' class='card-column'>"; //card 1 right
	script_output += "<div id='card1-buttons-container' class='cards-column-wrapper'>" // button wrapper
	script_output += "<div id='hours_beetween_multiply' class='card-button'><span>Wait H</span><span class='bold coral card-button-num'>"+G_MULTIPLY_WAIT_HOURS+"</span></div>";
	script_output += "<div class='card-button'><span>Missing H</span><span id='ref_multiply_missing_hours' class='bold coral card-button-num'>"+ref_multiply_missing_hours+"</span></div>";
	script_output += "<div class='card-button'><span>Max Bets </span><span class='bold coral card-button-num'>"+G_MAX_ROLLS_AT_MULTIPLY+"</span></div>";
	script_output += "<div class='card-button'><span>Max Plays </span><span class='bold coral card-button-num'>"+G_MAX_PLAY+" </span></div>";
	script_output += "</div>"; //card 1 right buttons close
	script_output += "</div>"; //card 1 right close

	script_output += "</div>"; //card 1 column wrapper close
	script_output += "</div>"; //card 1 close

	script_output += "<div id='card2' class='card'>";
	script_output += "<div class='cards-column-wrapper'>"; // card 2 column wrapper

	script_output += "<div class='card-column'>"; //card 2 left
	script_output += "<div class='cards-column-wrapper'>" // button wrapper
	script_output += "<div class='card-button'><span>Wait Loss</span><span class='bold coral card-button-num'>"+G_MIN_LOSSES_BEFORE_PLAY+"</span></div>";
	script_output += "<div class='card-button'><span>Wait Wins</span><span class='bold coral card-button-num'>"+G_WAIT_PLAY_AFTER_LOSSES+"</span></div>";
	script_output += "<div class='card-button'><span>Odds</span><span class='bold coral card-button-num'>"+G_ODDS+"</span></div>";
	script_output += "<div class='card-button'><span>Increase</span><span class='bold coral card-button-num'>"+G_INCR+"%</span></div>";
	script_output += "</div>"; //card 2 left buttons close
	script_output += "</div>"; //card 2 left close

	script_output += "<div id='card2-right' class='card-column' style='text-align: right'>"; //card 2 right
	script_output += "<h5>Bets</h5>";
	script_output += "<span>Min: <span class='bold lime'>"+parseFloat(G_MIN_BET).toFixed(8)+"</span></span>";
	script_output += "<span>Base: <span class='bold lime'>"+parseFloat(G_BAS_BET).toFixed(8)+"</span></span>";
	script_output += "<span>Max: <span class='bold lime'>"+parseFloat(G_MAX_BET).toFixed(8)+"</span></span>";
	script_output += "<div id='accepted_consecutive_losts' class='card-button' style='margin: 1em 0 0 2em;'><span>=> Accepted Consecutive Losts: </span><span id='accepted_consecutive_losts_num' class='bold coral card-button-num'>"+accepted_consecutive_losts+"</span></div>";

	script_output += "</div>"; //card 2 right close

	script_output += "</div>"; //card 2 column wrapper close
	script_output += "</div>"; //card 2 close

	// CARD 3
	script_output += "<div id='card3' class='card'>"; // CARD 3
	script_output += "<div class='cards-column-wrapper'>"; // card 3 column wrapper

	script_output += "<div class='card-column'>"; //card 3 left
	script_output += "<div class='cards-column-wrapper'>" // button wrapper
	script_output += "<div class='card-button'><span>Sessions</span><span class='bold coral card-button-num'>"+tot_multiply_sessions+"</span></div>";
	script_output += "<div class='card-button'><span>Plays</span><span class='bold coral card-button-num'>"+tot_multiply_play+"</span></div>";
	script_output += "<div class='card-button'><span>Bets</span><span class='bold coral card-button-num'>"+tot_multiply_bets+"</span></div>";
	script_output += "</div>"; //card 3 left buttons close
	script_output += "</div>"; //card 3 left close

	script_output += "<div class='card-column' style='text-align: right'>"; //card 3 right
	script_output += "<h5>Estimated Winnings</h5>";
	script_output += "<span>Session: <span class='bold lime' >"+estimate_winnings_session+"</span></span>";
	script_output += "<span>Day: <span class='bold lime'>"+estimate_winnings_day+"</span></span>";
	script_output += "<span class='mb1'>Month: <span class='bold lime'>"+estimate_winnings_month+"</span></span>";
	script_output += "<h5>Max Consecutive Losts Always</h5>";
	script_output += "<span>1st str: <span class='bold lime' >"+max_consecutive_losts+"</span></span>";
	script_output += "<span>2nd str: <span class='bold lime'>"+max_consecutive_losts_inplay+"</span></span>";
	script_output += "</div>"; //card 3 right close

	script_output += "</div>"; //card 3 column wrapper close
	script_output += "</div>"; //card 3 close
	
	// CARD 4
	script_output += "<div id='card4' class='card'>";
	script_output += "<div class='cards-column-wrapper'>" // 4 column wrapper
	script_output += "<div class='card-column' >";
	script_output += "<h5>Max Consecutive Losts</h5>";
	script_output += "<h5>Last Session</h5>";
	script_output += "<div class='cards-column-wrapper'>" // button wrapper
	script_output += "<div class='card-button'><span>1st str</span><span class='bold coral card-button-num'>"+max_consecutive_losts_session+"</span></div>";
	script_output += "<div class='card-button'><span>2nd str</span><span class='bold coral card-button-num'>"+max_consecutive_losts_inplay_session+"</span></div>";
	script_output += "</div>"; //card 4 button wraper close	
	script_output += "</div>"; //card 4 column close	
	script_output += "<div class='card-column' style='text-align: right'>"; // column right
	script_output += "<h5>Last Session Stats</h5>";	
	script_output += "<span id='last_multiply_play_time' class='bold coral mb1'></span>";
	script_output += "<span>Max Bet: <span class='bold lime'>"+parseFloat(max_bet_session).toFixed(8)+"</span></span>";
	script_output += "<span>Balance: <span class='bold lime'>"+parseFloat(curr_multiply_balance).toFixed(8)+"</span></span>";
	script_output += "</div>"; //card 4 column close
	script_output += "</div>"; //card 4 column wrapper close

	script_output += "<div class='card-column mt1' style='text-align: center'>"; // central column
	script_output += "<h5>Messages (alfa)</h5>";	
	script_output += "<span id='ref_help_message' class='lime'>";
	script_output += "<span id='ref_help_message1' class='bold'> Configuration is ok </span><br />";
	script_output += "<span id='ref_help_message2' style='font-size:0.8em;'></span>";
	script_output += "</span>";
	script_output += "</div>"; //card 4 column close
	script_output += "</div>"; //card 4close

	script_output += "</div>"; //card wrapper 4 cards close

	script_output += "<div class='cards-wrapper cards-wrapper-1col pt0 pb0'>"; //card wrapper 1 card open	
	script_output += "<div id='card4' class='card card-double-size'>";
	script_output += "<canvas id='myChart_last_session'></canvas>";
	script_output += "</div>"; //card 3close
	script_output += "</div>"; //card wrapper 1 cards close

	script_output += "<div class='cards-wrapper cards-wrapper-1col pt0'>"; //card wrapper 1 card open	
	script_output += "<div id='card5' class='card card-double-size'>";
	script_output += "<canvas id='myChart_total'></canvas>";
	script_output += "</div>"; //card 3close
	script_output += "</div>"; //card wrapper 1 cards close

	script_output += "</div>"; //card wrapper close
	script_output += "</div>"; //main div close 

	$('head').append(script_output_css);
	$('#script_output').after(script_output);


	// Colors and texts in cards
	if (Boolean(G_MULTIPLY)) {
		$('#ref_multiply_status').addClass('true').text('Enabled');
	} else {
		$('#ref_multiply_status').addClass('false').text('Disabled');
		$('#script_referral').removeClass('colored').addClass('grayed');
	}
	if (Boolean(G_MULTIPLY_AT_NIGHT)) {
		$('#ref_multiply_at_night').addClass('lime').text('Enabled');
	} else {
		$('#ref_multiply_status').addClass('false').text('Disabled');
	}
	if (G_SPEED == 0 ) {
		L_SPEED="Slow";
		$("#ref_multiply_speed").text('really slow');
	} else if (G_SPEED == 1 ) {
		L_SPEED="Human";
		$("#ref_multiply_speed").text('Human Simulation');
	} else if (G_SPEED == 2 ) {
		L_SPEED="Medium";
		$("#ref_multiply_speed").text('Medium');
	} else if (G_SPEED == 3 ) {
		L_SPEED="Fast";
		$("#ref_multiply_speed").text('Fast');
	}  

	if (G_HIGH_LOW == 0) {
		L_HIGH_LOW = "Random";
	} else if (G_HIGH_LOW == 1) {
		L_HIGH_LOW = "H";
	} else if (G_HIGH_LOW == 2) {
		L_HIGH_LOW = "L";
	} else if (G_HIGH_LOW == 3) {
		L_HIGH_LOW = "Olaer";
	} 

	if (G_STRATEGY == 0) {
		$('#ref_multiply_strategy').text('Mart Classic (0)');	
	} else if (G_STRATEGY == 1) {
		$('#ref_multiply_strategy').text('Mart After '+G_MIN_LOSSES_BEFORE_PLAY+' Losses');	
	} else if (G_STRATEGY == 2) {
		$('#ref_multiply_strategy').text('Mart After '+G_MIN_LOSSES_BEFORE_PLAY+'+ Losses and '+G_WAIT_PLAY_AFTER_LOSSES+' win');	
	} else if (G_STRATEGY == 3) {
		$('#ref_multiply_strategy').text('Mart After '+G_MIN_LOSSES_BEFORE_PLAY+'++ Losses and '+G_WAIT_PLAY_AFTER_LOSSES+' win');	
	}

	// get accepte consecutive losts and set it
	var accepted_consecutive_losts=0; stat_bet = G_BAS_BET;
	while (stat_bet <= G_MAX_BET) {
		stat_bet=stat_bet+(stat_bet*G_INCR/100);
		accepted_consecutive_losts++;
	}
	$('#accepted_consecutive_losts_num').text(accepted_consecutive_losts);

    // Begin Message Construction
    var balance = parseFloat($('#balance').text()).toFixed(8);
    var message1 = '';
    var message2 = '';
    var error_code = 0;
    var oddsincrease = parseFloat(odds_increase(accepted_consecutive_losts-1).split(":")[0]).toFixed(8);
    var totwagered = parseFloat(odds_increase(accepted_consecutive_losts-1).split(":")[1]).toFixed(8);
    console.log ("[ref] final win and wagered -- win: "+oddsincrease+" wag:"+totwagered);
    var alertmsg = ""

    if (G_MAX_BET > balance ) {
    	message1 = "MAX BET is higher then Balance. Can't play.";
    	message2 = "Decrease MAX_BET";
    	error_code = 3;
    } else if (oddsincrease < 0) {
    	message1 = "Odds and Increase param not good";
    	message2 = "Loosing Combination "+oddsincrease+" after "+(accepted_consecutive_losts-1)+" games";
    	error_code = 3;
    } else if (accepted_consecutive_losts < 5 && G_ODDS >= 2) {
    	message1 = "Max accepted Consecutive lost param is low";
    	message2 = "Dec BAS_BET, Inc MAX_BET, Dec INCR";
    	$('#accepted_consecutive_losts').addClass('bg-orange');
    	error_code = 2;
    } else if (oddsincrease < G_BAS_BET) {
    	message1 = "Odds and Increase param warning";
    	message2 = "You'll get "+oddsincrease+" after "+(accepted_consecutive_losts-1)+" games";
    	error_code = 1;
    } else if (accepted_consecutive_losts < 10 && G_ODDS >= 2) {
    	message1 = "Max accepted Consecutive Lost param is risky";
    	message2 = "Dec BAS_BET, Inc MAX_BET, Dec INCR";
    	$('#accepted_consecutive_losts').addClass('bg-yellow');
    	error_code = 1;
    } else if (G_MULTIPLY_WAIT_HOURS <= 5) {
    	message1 = "Play mult too often is risky";
    	message2 = "Increase HOURS_BETWEEN_MULTIPLY";
    	$('#hours_beetween_multiply').addClass('bg-yellow');
    	error_code = 1;
    }

    if (G_MULTIPLY_WAIT_HOURS <= 1 && error_code <= 2) {
    	message1 = "If you play multiply every hour you will lose";
    	message2 = "Increase MULTIPLY_WAIT_HOURS at 6+";
    	$('#hours_beetween_multiply').addClass('bg-orange');
    	$('#hours_beetween_multiply .coral').removeClass('coral');
    	error_code = 2;
    }

    if (error_code > 0) {
    	$('#ref_help_message1').text(message1);
    	$('#ref_help_message2').html(message2);
    } 
    if (error_code == 4) $('#ref_help_message').removeClass('lime').addClass('false');
    else if (error_code == 3) $('#ref_help_message').removeClass('lime').addClass('coral');
  	else if (error_code == 2) $('#ref_help_message').removeClass('lime').addClass('orange');  
  	else if (error_code == 1) $('#ref_help_message').removeClass('lime').addClass('yellow');  

  	//find last time multiply in hh:mm 
	var [{ value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute }] = dateTimeFormat.formatToParts(last_multiply);
	// console.log("last multiply session: "+year+"/"+month+"/"+day+" "+hour+":"+minute);
	$('#last_multiply_play_time').text(month+" "+day+", "+hour+":"+minute);
  	
	// Script output on multiply page
	// Show force Button in Multiply

	// var multiply_output=""; 
	script_output_css =  "<style>";
	script_output_css += "  .multiply-full-container {display: flex; flex-direction: column; position: relative; width: 80%; text-align: center; color: white; font-weight: bold; font-size: 15px;} "
	script_output_css += "  .multiply-full-container {background-color: #1e2022; border: 2px groove #09ff00; border-radius: 5px; margin: 1em auto;}";
	script_output_css += "  .multiply-container {display: grid; grid-template-columns: 2fr 3fr 1fr; } "
	script_output_css += "  .multiply-full-container .multiply-button {margin: 0 auto; cursor: pointer; border-radius: 10px; text-shadow: 1px 1px 4px black; box-shadow: 0 0 1em 0em #ffffff88; height: 30px; width: 80px; display: flex; flex-direction: column; justify-content: center;}";
	script_output_css += "  .multiply-full-container .single-column .multiply-button:not(:first-child) {margin-top: 0.5em; } ";
	script_output_css += "  .multiply-full-container .single-column .spaced span { width: 20%; } ";
	script_output_css += "  .multiply-full-container .single-row { display: flex; justify-content: space-around; } ";
	script_output_css += "  .multiply-full-container .green-bg {background-color: lime; }";
	script_output_css += "  .multiply-full-container .red-bg {background-color: #ff3407; }";
	script_output_css += "  .multiply-full-container .coral-bg {background-color: coral; }";
	script_output_css += "  .multiply-full-container .red {color: #ff3407; }";
	script_output_css += "  .multiply-full-container .ta-r {text-align:right;}";
	script_output_css += "  .multiply-full-container .ta-c {text-align:center;}";
	script_output_css += "  .multiply-full-container .jc {justify-content: center;}";
	script_output_css += "  .multiply-full-container .mt3 {margin-top: 3em;}";
	script_output_css += "  .multiply-full-container .mb1 {margin-bottom: 1em;}";
	script_output_css += "  .multiply-full-container .p1 {padding: 1em;}";
	script_output_css += "  .multiply-full-container .bb {border-bottom: 1px dashed #333;}";
	script_output_css += "  .multiply-full-container .br {border-right: 1px dashed #333;}";
	script_output_css += "  .multiply-full-container .bl {border-left: 1px dashed #333;}";
	script_output_css += "  .multiply-full-container .bt {border-top: 1px dashed #333;}";
	script_output_css += "	.multiply-full-container h1 {font-size: 1em; color: #bbb;} ";
	script_output_css += "	.multiply-full-container h3 {font-size: 0.9em; color: #ccc;} ";
	script_output_css += "	.multiply-full-container h4 {font-size: 0.7em; color: #666; margin:0;} ";
	script_output_css += "	.multiply-full-container .multiply-info {font-size: 0.6em; color: #ddd; font-family: monospace} ";
	script_output_css += "	.multiply-full-container .multiply-info.strat { font-size: 0.8em; line-height: 2em; text-align: center; background: #333; border-radius: 5px;} ";
	script_output_css += "	.multiply-full-container .multiply-info b {color: lime; } ";
	script_output_css += "	.multiply-full-container .multiply-info b.coral {color: coral; } ";	
	script_output_css += "	.multiply-full-container #multiply_status b {padding: 2px; transition: background-color 0.5s ease; border-radius: 2px;}";
	script_output_css += "  @media screen and (max-width: 700px) { .multiply-container { grid-template-columns: 1fr; } } ";

	script_output_css += "</style>";

	multiply_output =  "	<div id='multiply_full_container' class='multiply-full-container'>";


	multiply_output += "		<div class='multiply-container'>";

	
	multiply_output += "			<div class='single-column ta-r jc br p1'>";
	multiply_output += "				<span class='multiply-info strat mb1'>Strategy: <b>"+G_STRATEGY+"</b></span>";
	multiply_output += "				<div class='cards-column-wrapper ta-r'>";
	multiply_output += "					<div class='single-column ta-r'>";
	multiply_output += "						<span class='multiply-info ta-c mb1'>Incr: <b>"+G_INCR+"%</b></span>";
	multiply_output += "						<h4>Amounts:</h4>";
	multiply_output += "						<span class='multiply-info'>MinBet: <b>"+parseFloat(G_MIN_BET).toFixed(8)+"</b></span>";
	multiply_output += "						<span class='multiply-info mb1'>BasBet: <b>"+parseFloat(G_BAS_BET).toFixed(8)+"</b></span>";
	multiply_output += "						<h4>Play Mode:</h4>";
	multiply_output += "						<span class='multiply-info'>H/L: <b>"+L_HIGH_LOW+"</b></span>";
	multiply_output += "						<span class='multiply-info mb1'>Speed: <b>"+L_SPEED+"</b></span>";
	multiply_output += "					</div>";
	multiply_output += "					<div class='single-column ta-r'>";
	multiply_output += "						<span class='multiply-info ta-c mb1'>Odds: <b>"+G_ODDS+"</b></span>";
	multiply_output += "						<h4>Play Conditions:</h4>";
	multiply_output += "						<span class='multiply-info'>Wait losses: <b>"+G_MIN_LOSSES_BEFORE_PLAY+"</b></span>";
	multiply_output += "						<span class='multiply-info mb1'>Wait wins: <b>"+G_WAIT_PLAY_AFTER_LOSSES+"</b></span>";
	multiply_output += "						<h4>Exit Conditions:</h4>";
	multiply_output += "						<span class='multiply-info'>MaxRolls: <b>"+G_MAX_ROLLS_AT_MULTIPLY+"</b></span>";
	multiply_output += "						<span class='multiply-info'>MaxPlays: <b>"+G_MAX_PLAY+"</b></span>";
	multiply_output += "						<span class='multiply-info'>MaxBet: <b>"+parseFloat(G_MAX_BET).toFixed(8)+"</b></span>";
	multiply_output += "						<span class='multiply-info mb1'>MaxWin: <b>"+parseFloat(G_MAX_WIN).toFixed(8)+"</b></span>";
	multiply_output += "					</div>";
	multiply_output += "				</div>";
	multiply_output += "			</div>";
	
	multiply_output += "			<div class='single-column ta-c br'>";
	multiply_output += "				<h3 class='bb p1'>Multiply Betting System v. "+script_version+"</h3>";
	multiply_output += "				<div class='single-column jc' style='height: 80%;'>";
	multiply_output += "					<p id='multiply_message' class='multiply-info'>";
	//multiply_output += "					<span>With this configuration you have a PLost: <b>0.012%</b></span>";
	//multiply_output += "					<span>After <b>12</b> bets</span>";
	multiply_output += "					</p>";
	multiply_output += "				</div>";
	multiply_output += "			</div>";
	
	multiply_output += "			<div class='single-column jc'>";
	multiply_output += "    		<div id='forced_start_roll' class='multiply-button green-bg'>Start</div>";
	multiply_output += "    		<div id='softed_stop_roll' class='multiply-button coral-bg'>Stop Soft</div>";
	multiply_output += "    		<div id='forced_stop_roll' class='multiply-button red-bg'>Stop Now</div>";
	multiply_output += "			</div>";

	multiply_output += "		</div>";

	multiply_output += "		<div id='multiply_status' class='single-row multiply-info ta-r bt p1'>";
	multiply_output += "			<div class='single-column'>";
	multiply_output += "				<span id='multiply_bet_count'>Rolls: <b>0</b></span>";
	multiply_output += "				<span id='multiply_play_count'>Plays: <b>0</b></span>";
	multiply_output += "			</div>";
	multiply_output += "			<div class='single-column'>";
	multiply_output += "				<span id='multiply_cons_losts'>Cons Losts: <b class='coral'>0</b></span>";
	multiply_output += "				<span id='multiply_max_cons_losts'>Max Cons Losts: <b class='coral'>0</b></span>";
	multiply_output += "			</div>";
	multiply_output += "			<div class='single-column'>";
	multiply_output += "				<span id='multiply_cons_wins'>Cons Wins: <b>0</b></span>";
	multiply_output += "				<span id='multiply_max_bet'>Max Bet: <b>0</b></span>";
	multiply_output += "			</div>";
	multiply_output += "			<div class='single-column'>";
	multiply_output += "				<span id='balance_before'>Balance Before: <b>0.00000000</b></span>";
	multiply_output += "				<span id='balance_now'>Balance Now: <b>0.00000000</b></span>";
	multiply_output += "			</div>";
	multiply_output += "			<div class='single-column'>";
	multiply_output += "				<span id='multiply_wagered'>Wagered: <b>0.00000000</b></span>";
	multiply_output += "				<span id='multiply_profit'>Profit: <b>0.00000000</b></span>";
	multiply_output += "			</div>";
	multiply_output += "		</div>";

	multiply_output += "	</div>";
	
	if (typeof G_script_version !== 'undefined') {
		var ver = G_script_version.replaceAll('.','').padEnd(3, '0');
		console.log('[god] version: '+ver);
		if ( ver >= 362) { 
	    	// the variable is defined
			$('head').append(script_output_css);
			$('#double_your_btc').before(multiply_output);
		}
	}

} 

function odds_increase (accepted_consecutive_losts) {
	var win = 0; var winlessspent; var spent = 0; 
	var nbet = G_BAS_BET; var nwin;

	for (i=1; i<=accepted_consecutive_losts; i++){
		spent += nbet;
		win = nbet + (nbet * (G_ODDS - 1));
		winlessspent = win - spent;
		//console.log("--bet:"+nbet.toFixed(8)+",spent:"+spent.toFixed(8)+",win:"+win.toFixed(8)+",diff:"+winlessspent.toFixed(8));	
		nbet = nbet + (nbet * (G_INCR / 100));
		nwin = nbet + (nbet * (G_ODDS - 1));
	}
	return winlessspent+":"+spent;
}

function graphs_init () {
	var ctx = document.getElementById('myChart_last_session').getContext('2d');
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: last_session_hist,
	        datasets: [{
	            label: 'Last Session Multiply Balance',
	            backgroundColor: 'rgb(255, 127, 80)',
	            borderColor: 'rgb(255, 127, 80)',
	            data: last_session_hist,
	            pointRadius: 2
	        }]
	    },

	    // Configuration options go here
	    options: {
	    	legend: {
	            display: true,
	            labels: {
	                fontColor: 'rgb(255, 127, 80)',
	                fontSize: 11
	            }
        	},
        	aspectRatio: 5,
			scales:{
	            xAxes: [{
	                display: false //this will remove all the x-axis grid lines
	            }],
	            yAxes: [{
		            ticks: {
		                display: false
		            }
		        }]
	        }
    	}
	});
	
	var ctx1 = document.getElementById('myChart_total').getContext('2d');
	var chart = new Chart(ctx1, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: multiply_hist,
	        datasets: [{
	            label: 'Total Balance in Multiply',
	            backgroundColor: 'rgb(0, 255, 0)',
	            borderColor: 'rgb(0, 255, 0)',
	            data: multiply_hist,
	            pointRadius: 3
	        }]
	    },

	    // Configuration options go here
	    options: {
	    	legend: {
	            display: true,
	            labels: {
	                fontColor: 'rgb(0, 255, 0)',
	                fontSize: 11
	            }
        	},
        	aspectRatio: 5,
			scales:{
	            xAxes: [{
	                display: false //this will remove all the x-axis grid lines
	            }],
	            yAxes: [{
		            ticks: {
		                display: false
		            }
		        }]
	        }
    	}
	});
}

function G_getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function G_setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
