
var wait_text;
var start_no;

game.ListWinnersScreen = me.ScreenObject.extend({
    // reset function
    onResetEvent : function () {

    //me.game.world.addChild(new me.ColorLayer("background", "#2680d8"), 0);
    
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
    txt.text = 'Congkak - Other Winners';
    me.game.world.addChild(txt, 2);
    
    posy += 30;
    var txt = me.pool.pull("score_text", 0, posy);
    txt.text = '(e:easy, h-hard, x-extra hard)';
    me.game.world.addChild(txt, 2);
    
    var viewTopScorers = me.pool.pull("view_topscorers", 10, me.game.viewport.height - 40);
    me.game.world.addChild(viewTopScorers, 2);
    
	/*
    if ( winnerPage < 19 ) {
    		var viewNextPageWinners = me.pool.pull("view_next_page_winners", me.game.viewport.width - 180, me.game.viewport.height - 40);
    		me.game.world.addChild(viewNextPageWinners, 2);
    		viewNextPageWinners.text = 'Page ' + (winnerPage + 1) + ' >';
    }
    if ( winnerPage > 0 ) {
    		var viewPrevPageWinners = me.pool.pull("view_prev_page_winners", me.game.viewport.width - 300, me.game.viewport.height - 40);
		me.game.world.addChild(viewPrevPageWinners, 2);
		viewPrevPageWinners.text = '<';
    }
    */
	
	var openListWinners = me.pool.pull("open_list_winners", me.game.viewport.width - 300, me.game.viewport.height - 40);
	me.game.world.addChild(openListWinners, 2);
	openListWinners.text = 'List of Winners >';
	
    
    console.log('page = ' + winnerPage);
    start_no = 8 + (27 * winnerPage);
    
    listWinners(start_no);
    
    },
  
    // destroy function
    onDestroyEvent : function () {
    
    	// ...
    console.log('scores screen destroyed');
    
    }
});


//startNo = 8
function listWinners(startNo) {
	var posy = 80;
	var posx = 0;
	var numOfLine = 9;
	listCol(startNo, numOfLine, posx, posy);
	
	posy = 80;
	posx += 300;
	startNo += numOfLine;
	listCol(startNo, numOfLine, posx, posy);
	
	posy = 80;
	posx += 300;
	startNo += numOfLine
	listCol(startNo, numOfLine, posx, posy);
	
}

function listCol(startNo, numOfLine, posx, posy) {
	for ( var i=startNo; i < startNo + numOfLine; i++ ) {
		s1 = hs_names[i] != null ? hs_names[i] : "---";
		s2 = hs_scores[i] != null ? hs_scores[i] : "--";
		s3 = hs_levels[i] != null ? (hs_levels[i] == 0 ? "e" : hs_levels[i] == 1 ? "h" : "x") : "--";
		
		posy += 35;
		txt = me.pool.pull("score_text", posx, posy);
		txt.text = s1 + ', ' + s2 + s3;
		me.game.world.addChild(txt, 2);
		
	}
}
