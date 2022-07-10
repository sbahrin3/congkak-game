game.PlayScreen = me.ScreenObject.extend({

    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        console.log('Play Screen: onResetEvent');
        console.log('Game Level = ' + gameLevel);
        

        //me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        
        
        var backgroundImage = new me.Sprite(0, 0, {
            image: me.loader.getImage('background2'),
        });
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);
        me.game.world.addChild(backgroundImage, 1);
        

        this.holeManager = new game.HoleManager();
        this.holeManager.createHoles();

        me.game.world.addChild(this.holeManager, 3);

        
        this.congkakboard = new game.CongkakBoard();
        this.congkakboard.chooseImage(gameLevel);
        
        me.game.world.addChild(this.congkakboard, 2);
        
        
        if ( playMusic == 1) {
            me.audio.playTrack("nongga");
        }
        
        //show ad after play and when get back to intro
        showAd = true;
        

    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        console.log('play screen destroyed');

        if ( playMusic == 1) {
            me.audio.stopTrack();
        }

        showAd = true;
    }
});
