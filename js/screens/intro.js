/*
 * https://melonjs.github.io/melonJS/docs/me.state.html
 */
game.IntroScreen = me.ScreenObject.extend({
	// reset function
	onResetEvent : function () {

		//make sure
		resetGameValues();
		me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

		var backgroundImage = new me.Sprite(0, 0, {
			image: me.loader.getImage('introscreen'),
		});

		// position and scale to fit with the viewport size
		backgroundImage.anchorPoint.set(0, 0);
		backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

		// add to the world container
		me.game.world.addChild(backgroundImage, 1);


		var gameTitle = me.pool.pull("game_title", me.game.viewport.width/2 - 370, -40);
		me.game.world.addChild(gameTitle, 2);

		var menuPlay = me.pool.pull("menu_play", me.game.viewport.width - 150, me.game.viewport.height - 70);
		me.game.world.addChild(menuPlay, 2);
		
		var menuCredit = me.pool.pull("menu_credit", 10, me.game.viewport.height - 70);
		me.game.world.addChild(menuCredit, 2);

		var menuHighScorers = me.pool.pull("menu_highscorers", 10, me.game.viewport.height - 140);
		me.game.world.addChild(menuHighScorers, 2);
		
		var hasExtraHard = true;

		var py = hasExtraHard ? 180 : 200;
		playOptions[0] = me.pool.pull("option", me.game.viewport.width/2 - 100, py);
		playOptions[0].optionNo = 0;
		playOptions[0].label = 'friend';
		playOptions[0].text = 'Play with your friend';
		playOptions[0].selected = '';
		playOptions[0].chooseUnselect();
		me.game.world.addChild(playOptions[0], 2);

		py += 60;
		playOptions[1] = me.pool.pull("option", me.game.viewport.width/2 - 100, py);
		playOptions[1].optionNo = 1;
		playOptions[1].label = 'computer';
		playOptions[1].text = 'Play with computer (Easy)';
		playOptions[1].selected = '';
		playOptions[1].chooseUnselect();
		me.game.world.addChild(playOptions[1], 2);

		py += 60;
		playOptions[2] = me.pool.pull("option", me.game.viewport.width/2 - 100, py);
		playOptions[2].optionNo = 2;
		playOptions[2].label = 'computer2';
		playOptions[2].text = 'Play with computer (Hard)';
		playOptions[2].selected = '';
		playOptions[2].chooseUnselect();
		me.game.world.addChild(playOptions[2], 2);
		
		if ( hasExtraHard ) {
			
			py += 60;
			
			//initiate timer
			secondCounter = timerInMinute * 60 * 1000;
			
			playOptions[3] = me.pool.pull("option", me.game.viewport.width/2 - 100, py);
			playOptions[3].optionNo = 3;
			playOptions[3].label = 'computer3';
			playOptions[3].text = 'Play with computer (Extra-hard)';
			playOptions[3].selected = '';
			playOptions[3].chooseUnselect();
			me.game.world.addChild(playOptions[3], 2);
		}
		
		playOptions[lastOptionNo].selected = 'yes';
		playOptions[lastOptionNo].chooseSelect();
		
		if ( lastOptionNo == 0 ){
	        twoPlayers = true;
	        name1 = 'Player 1';
	        name2 = 'Player 2';
	        gameLevel = 0;
	    } else if ( lastOptionNo == 1 ) {
	        twoPlayers = false;
	        name1 = 'You';
	        name2 = 'Computer';
	        gameLevel = 0;
	    } else if ( lastOptionNo == 2 ) {
	        twoPlayers = false;
	        name1 = 'You';
	        name2 = 'Computer';
	        gameLevel = 1;
	    } else if ( lastOptionNo == 3 ) {
	        twoPlayers = false;
	        name1 = 'You';
	        name2 = 'Computer';
	        gameLevel = 2;
	    }

		gameEnded = false;

	},

	// destroy function
	onDestroyEvent : function () {
		// ...
		console.log('intro screen destroyed');
	}
});