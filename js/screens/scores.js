


var wait_text;

game.ScoreScreen = me.ScreenObject.extend({
	// reset function
	onResetEvent : function () {

		//me.game.world.addChild(new me.ColorLayer("background", "#a34d4d"), 0);
		
		var backgroundImage = new me.Sprite(0, 0, {
			image: me.loader.getImage('background2'),
		});

		// position and scale to fit with the viewport size
		backgroundImage.anchorPoint.set(0, 0);
		backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

		// add to the world container
		me.game.world.addChild(backgroundImage, 1);


		var posy = 20;
		var txt = me.pool.pull("score_text", 0, posy);
		txt.text = 'Congkak High Scorers';
		me.game.world.addChild(txt, 2);


		posy += 40;
		wait_text = me.pool.pull("score_text", me.game.viewport.width/2 - 130, posy);
		wait_text.text = "Retrieving Data from Server...";
		me.game.world.addChild(wait_text, 2);

		var menuBack = me.pool.pull("menu_back", 10, me.game.viewport.height - 70);
		me.game.world.addChild(menuBack, 2);

		var viewWinners = me.pool.pull("view_winners", me.game.viewport.width - 250, me.game.viewport.height - 50);
		me.game.world.addChild(viewWinners, 2);

		winnerPage = 0;
		getHighScorers();

		//don't show ad when get back to intro
		showAd = false;

	},

	// destroy function
	onDestroyEvent : function () {
		// ...
		console.log('scores screen destroyed');
	}
});

function displayScores() {
	var playerName;
	var posy = 80;
	var cnt = 0;


	header1 = me.pool.pull("score_text", 40, posy);
	header1.text = "Name";
	me.game.world.addChild(header1, 2);

	header2 = me.pool.pull("score_text", 300, posy);
	header2.text = "Point"
		me.game.world.addChild(header2, 2);


	header3 = me.pool.pull("score_text", 400, posy);
	header3.text = "Level";
	me.game.world.addChild(header3, 2);


	header4 = me.pool.pull("score_text", 500, posy);
	header4.text = "Date Time";
	me.game.world.addChild(header4, 2);

	//---
	posy += 20;
	header1_ = me.pool.pull("score_text", 40, posy);
	header1_.text = "----";
	me.game.world.addChild(header1_, 2);

	header2_ = me.pool.pull("score_text", 300, posy);
	header2_.text = "-----"
		me.game.world.addChild(header2_, 2);


	header3_ = me.pool.pull("score_text", 400, posy);
	header3_.text = "-----";
	me.game.world.addChild(header3_, 2);

	header4_ = me.pool.pull("score_text", 500, posy);
	header4_.text = "---------";
	me.game.world.addChild(header4_, 2);


	for ( var i=0; i < 8; i++ ) {
		posy += 35;

		cnt = i + 1;
		scoreCnt = me.pool.pull("score_text", 0, posy);
		scoreCnt.text = cnt + ")";
		me.game.world.addChild(scoreCnt, 2);

		playerName = me.pool.pull("score_text", 40, posy);
		playerName.text = hs_names[i] != null ? hs_names[i] : "---";
		me.game.world.addChild(playerName, 2);

		playerScore = me.pool.pull("score_text", 300, posy);
		playerScore.text = hs_scores[i] != null ? hs_scores[i] : "--";
		me.game.world.addChild(playerScore, 2);


		playerLevel = me.pool.pull("score_text", 400, posy);
		playerLevel.text =  hs_levels[i] != null ? (hs_levels[i] == 0 ? "Easy" : (hs_levels[i] == 2) ? "X-Hard" : "Hard") : "--";
		me.game.world.addChild(playerLevel, 2);

		dateTime = me.pool.pull("score_text", 500, posy);
		dateTime.text = hs_dateTime[i] != null ? hs_dateTime[i] : "--";
		me.game.world.addChild(dateTime, 2);


	}

	me.game.world.removeChild(wait_text);
}


function getHighScorers() {

	var getJSON = function(url, callback) {
		
		console.log("List High Scorers: " + url);
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			var status = xhr.status;
			if (status === 200) {
				callback(null, xhr.response);
			} else {
				callback(status, xhr.response);
			}
		};
		xhr.send();
	};

	var url = resultServerUrl + "/playresult/servlet/my.play.congkak.ListHighScorers";

	getJSON(url,
			function(err, data) {
		if (err !== null) {
			console.log('Something went wrong: ' + err);
		} else {
			for ( var i = 0; i < data.length; i++) {
				hs_names[i] = data[i].playerName;
				hs_scores[i] = data[i].score;
				hs_levels[i] = data[i].level;
				hs_dateTime[i] = data[i].dateTime;
			}
			displayScores();
		}
	});

}
