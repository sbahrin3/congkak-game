
"use strict";

//color of seeds
var color1 = "#6eb8fa";
var color2 = "#ffbf00";
var color3 = "#e86441";
var color4 = "#acb3b7"; // "#e91e63"; //"#64defc";

//if i want to test, set the modeTesting to true
var modeTesting = false;
var ignoreTembakTest = false;

var sendGameResult = true;

//var resultServerUrl = "http://192.168.0.4:9292";
var resultServerUrl = "http://mylebah.com";
var playerName = "Player 1";
var countryName = "";
var resultScore = 0;
var resultRound = 0;

var timerInMinute = 5;
var secondCounter = timerInMinute * 60 * 1000; //for playTimer

//counter for ad
var counterAd = 0;

//for play_manager.js
var instruct1, instruct2, buttonback, musicOnOff;
var condition1, condition2;
var youwin, youlose, winplayer1, winplayer2, timesup;
var isRunning1 = false, isRunning2 = false;
var hand1, hand2;
var press1, press2;
var pause = false;
var scoop1 = false, scoop2 = false;
var laser;
//

//winners list page
var winnerPage = 0;

var playMusic = 1;
var playSound = 0;

/**
 * sowingSpeed : playerHandSpeed
 * 1000 : 90
 * 400 : 200
 */

var sowingSpeed = 400; //400; //the higher the slower
var playerHandSpeed = 200; //the lower the slower

console.log('Sowing Speed: ' + sowingSpeed);
console.log('Hand Speed: ' + playerHandSpeed);

var roundNumber = 0;
var lastOptionNo = 3; // 0;

var score1 = 0;
var score2 = 0;

var playOptions = new ArrayBuffer(3);

var holes = new ArrayBuffer(14);
var holeSeeds = new ArrayBuffer(14);
for ( var i=0; i < 16; i++ ) {
    
    if ( i == 7 ) {
        holeSeeds[i] = 0;
    } else if ( i == 15 ) {
        holeSeeds[i] = 0;
    } else {
        holeSeeds[i] = 7;
    }
}

var tempSeeds = new ArrayBuffer(7);

var tempHoleSeeds = new ArrayBuffer(14);

var collectCount1 = 7;
var collectCount2 = 7;

var holePosition1 = 0;
var holePosition2 = 8;

var runPlayer1 = false;
var runPlayer2 = false;

var stoppedInHome1 = false;
var stoppedInHome2 = false;

var stoppedPlayer1 = true;
var stoppedPlayer2 = true;

var gameFirstStart = true;

//if play with computer make this as false
var twoPlayers = true;
var name1 = 'Player 1';
var name2 = 'Player 2';

var turnPlayer1 = true;
var turnPlayer2 = true;

var computerIsRunning = false;

var roundPlayer1 = 0;
var roundPlayer2 = 0;
var totalRoundPlayer1 = 0;
var totalRoundPlayer2 = 0;

var tembak;

var gameEnded = false;

var showAd = false;


var thinkCounter = 0;
var quitGameDialog = false;
var gameLevel = 0; //0=easy, 1=difficult

var arrowRun1, arrowRun2;
var savedStatus1 = 'run', savedStatus2 = 'run';

var STATE_CONTINUE;
var VIEW_WINNERS;

var hs_names = new ArrayBuffer(100);
var hs_scores = new ArrayBuffer(100);
var hs_levels = new ArrayBuffer(100);
var hs_dateTime = new ArrayBuffer(100);

var game = {
    
    // Run on page load.
    "onload" : function () {
        // Initialize the video. 640 x 480
        // 853, 480
        if (!me.video.init(853, 480, {wrapper : "screen", scale : 'auto'})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        /*
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }
        */

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    "loaded" : function () {

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.MENU, new game.IntroScreen());
        me.state.set(me.state.CREDITS, new game.CreditScreen());
        me.state.set(me.state.SCORE, new game.ScoreScreen());
        me.state.set(me.state.GAME_END, new game.EndGameScreen());

        me.state.set(me.state.VIEW_WINNERS, new game.ListWinnersScreen());

        // set a global fading transition for the screen
        me.state.transition("fade", "#ebebeb", 100);

        // add entities in the entity pool
        me.pool.register("player", game.Player);
        me.pool.register("laser", game.Laser);
        
        //me.pool.register("seed", game.Seed);
        
        me.pool.register("hole", game.Hole);
        me.pool.register("instruct", game.Instruct);
        me.pool.register("congkakboard", game.CongkakBoard);
        me.pool.register("buttonback", game.ButtonBack);
        me.pool.register("menu_play", game.MenuPlay);
        me.pool.register("menu_credit", game.MenuCredit);

        me.pool.register("menu_highscorers", game.MenuHighScorers);
        
        me.pool.register("view_winners", game.ViewWinners);  //intromenus.js
        me.pool.register("view_next_page_winners", game.ViewNextPageWinners); //
        me.pool.register("view_prev_page_winners", game.ViewPrevPageWinners); //
        me.pool.register("view_topscorers", game.ViewTopScorers);  //intromenus.js

        me.pool.register("open_list_winners", game.OpenListWinners); //open list of winners in browsers

        me.pool.register("menu_ok", game.MenuOK);
        me.pool.register("menu_back", game.MenuBack);
        
        me.pool.register("game_title", game.Title);
        
        me.pool.register("info_text", game.InfoText);
        me.pool.register("score_text", game.ScoreText);
        me.pool.register("play_timer", game.PlayTimer);

        me.pool.register("title_quit", game.TitleQuit);
        me.pool.register("quit_yes", game.QuitYes);
        me.pool.register("quit_no", game.QuitNo);
        me.pool.register("music_on_off", game.MusicOnOff);
        me.pool.register("sound_on_off", game.SoundOnOff);

        me.pool.register("youwin", game.YouWin);
        me.pool.register("youlose", game.YouLose);
        me.pool.register("winplayer1", game.WinPlayer1);
        me.pool.register("winplayer2", game.WinPlayer2);
        me.pool.register("draw", game.Draw);
        me.pool.register("timesup", game.TimesUp);
        
        me.pool.register("option", game.Option);

        me.pool.register("run_player1", game.RunPlayer1);
        me.pool.register("run_player2", game.RunPlayer2);

        me.pool.register("hand1", game.Hand1);
        me.pool.register("hand2", game.Hand2);
        
        me.pool.register("press1", game.Press);
        me.pool.register("press2", game.Press);
        
        me.pool.register("tembak", game.Tembak);


        // start the game
        me.state.change(me.state.MENU);
        
        console.log("============");
        console.log("Game will begin...");
        console.log("Congkak Game created by SAM.BAHRIN");
        console.log("Congkak is a Traditional Board Game of MALAYSIA");
        console.log("============");
        
        
    }
};


function resetGameValues() {

    score1 = 0;
    score2 = 0;

    for ( var i=0; i < 16; i++ ) {
        holeSeeds[i] = 7;
    }
    
    collectCount1 = 7;
    collectCount2 = 7;

    holePosition1 = 0;
    holePosition2 = 8;

    runPlayer1 = false;
    runPlayer2 = false;

    stoppedInHome1 = false;
    stoppedInHome2 = false;

    stoppedPlayer1 = true;
    stoppedPlayer2 = true;

    gameFirstStart = true;

    //if play with computer make this as false
    twoPlayers = true;
    name1 = 'Player 1';
    name2 = 'Player 2';

    turnPlayer1 = true;
    turnPlayer2 = true;

    computerIsRunning = false;

    roundPlayer1 = 0;
    roundPlayer2 = 0;

    gameEnded = false;

    thinkCounter = 0;
    quitGameDialog = false;
    gameLevel = 0;


    for ( var i=0; i < 16; i++ ) {
    
        if ( i == 7 ) {
            holeSeeds[i] = 0;
        } else if ( i == 15 ) {
            holeSeeds[i] = 0;
        } else {
            holeSeeds[i] = 7;
        }
    }

    savedStatus1 = 'run';
    savedStatus2 = 'run';
    
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playsound(type) {
	if ( playSound == 1 ) {
		me.audio.play(type);
	}
}

