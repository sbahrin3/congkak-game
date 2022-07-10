
game.CreditScreen = me.ScreenObject.extend({
    // reset function
    onResetEvent : function () {

        var backgroundImage = new me.Sprite(0, 0, {
                image: me.loader.getImage('background3'),
        });

        // position and scale to fit with the viewport size
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

        // add to the world container
        me.game.world.addChild(backgroundImage, 1);
        

        var gameTitle = me.pool.pull("game_title", me.game.viewport.width/2 - 370, 5);
        me.game.world.addChild(gameTitle, 2);    

        var menuBack = me.pool.pull("menu_back", 10, me.game.viewport.height - 70);
        me.game.world.addChild(menuBack, 2);

        var posy = 230;
        var txt = me.pool.pull("info_text", me.game.viewport.width/2 - 130, posy);
        txt.text = 'Programmed by:';
        me.game.world.addChild(txt, 2);

        posy += 30;
        txt = me.pool.pull("info_text", me.game.viewport.width/2 - 130, posy);
        txt.text = 'Shamsul Bahrin Abd Mutalib';
        me.game.world.addChild(txt, 2);
        
        posy += 40;
        txt = me.pool.pull("info_text", me.game.viewport.width/2 - 130, posy);
        txt.text = 'Congkak Board Designed by:';
        me.game.world.addChild(txt, 2);
        
        posy += 30;
        txt = me.pool.pull("info_text", me.game.viewport.width/2 - 130, posy);
        txt.text = 'Iszuddin Ismail';
        me.game.world.addChild(txt, 2);

        


        //don't show ad when get back to intro
        showAd = false;

    },
  
    // destroy function
    onDestroyEvent : function () {
      // ...
    }
  });




game.EndGameScreen = me.ScreenObject.extend({
  // reset function
  onResetEvent : function () {

      var backgroundImage = new me.Sprite(0, 0, {
              image: me.loader.getImage('background2'),
      });

      // position and scale to fit with the viewport size
      backgroundImage.anchorPoint.set(0, 0);
      backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

      // add to the world container
      me.game.world.addChild(backgroundImage, 1);

      var titleQuit = me.pool.pull("title_quit", me.game.viewport.width/2 - 180, 120);
      me.game.world.addChild(titleQuit, 4);
      var quitYes = me.pool.pull("quit_yes", me.game.viewport.width/2 - 140, 220);
      me.game.world.addChild(quitYes, 5);
      var quitNo = me.pool.pull("quit_no", me.game.viewport.width/2 + 70, 220);
      me.game.world.addChild(quitNo, 5);

      //don't show ad when get back to intro
      showAd = false;

  },

  // destroy function
  onDestroyEvent : function () {
    // ...
  }
});



game.ContinueNextScreen = me.ScreenObject.extend({
  // reset function
  onResetEvent : function () {

      //don't show ad when get back to intro
      showAd = false;

      var backgroundImage = new me.Sprite(0, 0, {
              image: me.loader.getImage('introscreen'),
      });

      // position and scale to fit with the viewport size
      backgroundImage.anchorPoint.set(0, 0);
      backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

      // add to the world container
      me.game.world.addChild(backgroundImage, 1);

      



  },

  // destroy function
  onDestroyEvent : function () {
    // ...
  }
});