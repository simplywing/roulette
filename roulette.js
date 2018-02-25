//Statistics
var anzgreen = 0;			//anzahl Grün in einem Spiel
var anzred = 0;				//anzahl Rot in einem Spiel
var anzblack = 0;			//anzahl Schwarz ein einem Spiel
var wins = 0;				//gewinn-serien Pufferspeicher
var looses = 0;				//verlier-serien Pufferspeicher
var winningstreaks = [];	//gewinnserien
var loosingstreaks = [];	//verlierserien 
var colors = ["black", "red"];

//Vars
var kapital, betammount, games, bet; //Kapital, Einsatz, anzahl Spiele, Wettfarbe (Rot || Schwarz)

//schreibt auf die Standardausgabe
function write(arg, loc){
	$(loc).append(arg  + "</br>");
}

//spielt roulette und gibt rot schwarz oder grün zurück
function roulette(){
	var res;
	var rand = Math.floor(Math.random() * 37);
	if (rand === 0){
		res = "green";
		anzgreen++;
	}
	if (rand > 0 && rand < 19){
		res = "red";
		anzred++;
	}
	if (rand > 18 && rand < 37){
		res = "black";
		anzblack++;
	}

	return res;
}

//spielt roulette und berechnet den gewinn oder verlust bei einem definierten Einsatz
function game(kapital, betammount, bet){

	var r = roulette();
	var outcome = 0;
	outcome = outcome - betammount; //Der Einsatz wird abgezogen
	if(r === bet){ //Wurde richtig getippt, wird der Einsatz verdoppelt
		outcome = outcome + betammount * 2;
	}
	if(r === "green"){ //Wenn Grün kommt wird die Hälfte des Einsatzes zurückerstattet
		outcome = outcome + betammount / 2;
	}
	return outcome; //Der Gewinn (Negativ oder Positiv) wird zurückgegeben.

}

$(document).ready(function(){
	$(".stdout").html("<tr><th>#</th><th>Kapital</th><th>Gewinn</th><th>gewettet auf</th></tr>");

	$(".roulette-go").on("click", function(){

		$(".stats-panel").html("");
		$(".stdout").html("<tr><th>#</th><th>Kapital</th><th>Gewinn</th><th>gewettet auf</th></tr>");

		anzgreen = 0;
		anzred = 0;
		anzblack = 0;
		winningstreaks = [];
		loosingstreaks = [];
		wins = 0;
		looses = 0;
		kapital = parseInt($(".kapital-val").val());
		betammount = parseInt($(".einsatz-val").val());
		games = parseInt($(".games-val").val());

		//Farbmodus
		var colormode = $(".color-mode").prop("selectedIndex");
		if(colormode === 0){
			bet = "black";
		}
		if(colormode === 1){
			bet = "red";
		}
		if(colormode === 2 || colormode === 3){
			//Nach Gewinn wird Farbe gewechselt &
			//Nach Gewinn wird zufällg gewählt
			bet = colors[Math.round(Math.random())];
		}

		var startkapital = kapital;
		var tempbet = betammount;
		
		for(var i = 0; i < games || looses != 0; i++){

			if(kapital > tempbet && kapital > 0){
				var gewinn = game(kapital, tempbet, bet);
			}
			else{
				loosingstreaks.push(looses);
				looses = 0;
				winningstreaks.push(wins);
				wins = 0;
				gewinn = 0;
			}

			if (gewinn > 0){
				kapital = kapital + gewinn;
				tempbet = betammount;
				$(".stdout").append('<tr class="success"><td>' + parseInt(i + 1) + '</td><td>' + kapital + '</td><td>' + gewinn + '</td><td>' + bet + '</td></tr>');
				
				loosingstreaks.push(looses);
				looses = 0;
				wins++;

				if(colormode === 2){
					if(bet === "black") bet = "red";
					else if(bet === "red") bet = "black";
				}
				if(colormode === 3){
					bet = colors[Math.round(Math.random())];
				}
			}
			else if (gewinn < 0){
				kapital = kapital + gewinn;
				tempbet = tempbet * 2;
				$(".stdout").append("<tr><td>" + parseInt(i + 1) + "</td><td>" + kapital + "</td><td>" + gewinn + "</td><td>" + bet + "</td></tr>");
				
				winningstreaks.push(wins);
				wins = 0;
				looses++;
			}
		}
		loosingstreaks.push(looses);
		winningstreaks.push(wins);
		var gewinn = kapital - startkapital;

		write("<strong>Startkapital: " + startkapital + "</strong>", ".stats-panel");
		write("<strong>Endkapital: " + kapital + "</strong>", ".stats-panel");	
		write("<strong>Gewinn: " + gewinn + "</strong>", ".stats-panel");
		write("</br>	Grün: " + anzgreen + "</br> Rot: " + anzred + "</br> Schwarz: " + anzblack, ".stats-panel");
		$(".out-table").scrollTop($(".out-table")[0].scrollHeight);

		if($(".endkapital-val").is(":checked")){
			$(".kapital-val").val(kapital);
		}		
		write("Längste Winningstreak: " + Math.max.apply(Math, winningstreaks), ".stats-panel");
		write("Längste Loosingstreak: " + Math.max.apply(Math, loosingstreaks), ".stats-panel");
	});	
});			