
var titleQuit, quitYes, quitNo;

game.ButtonBack = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
            image: "buttonback",
            width: 80,
            height: 80
        }]);

        this.settings = settings;
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));

        
    },

    chooseImage: function (frame) {
        this.renderable.addAnimation("idle", [frame], 1);
        this.renderable.setCurrentAnimation("idle");
    },

    chooseActive: function () {
        this.renderable.addAnimation("idle", [1], 1);
        this.renderable.setCurrentAnimation("idle");
    },

    chooseInactive: function () {
        this.renderable.addAnimation("idle", [0], 1);
        this.renderable.setCurrentAnimation("idle");
    },

    onSelect: function(event) {
    	console.log('BUTTON BACK is pressed');
    	
        //save game state
        for ( var i=0; i < 16; i++ ) {
            holeSeeds[i] = holes[i].seeds;
        }
        //-- 
        
        if ( gameEnded ) {
        	
        	quitGameDialog = false;
            resetGameValues();
            showAd = true;
            me.state.change(me.state.MENU);
        	
        } else {
        		me.state.change(me.state.GAME_END);
        }
        
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.TitleQuit = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "title_quit",
            width: 400,
            height: 200
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.QuitYes = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "quit_yes",
            width: 103,
            height: 70
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    
    onSelect: function(event) {
        quitGameDialog = false;
        resetGameValues();
        showAd = true;
        me.state.change(me.state.MENU);

    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.QuitNo = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "quit_no",
            width: 81,
            height: 70
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        quitGameDialog = false;
        me.state.change(me.state.PLAY);


    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.MusicOnOff = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "music_on_off",
            width: 80,
            height: 80
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
        if ( playMusic == 0 )
            this.chooseImage(1);
        else
            this.chooseImage(0);
    },
    onSelect: function(event) {

        if ( playMusic == 0 ) {
            me.audio.playTrack("nongga");
            this.chooseImage(0);
            playMusic = 1;
        }
        else {
            me.audio.stopTrack();
            this.chooseImage(1);
            playMusic = 0;
        }
    },
    chooseImage: function (frame) {
        this.renderable.addAnimation("idle", [frame], 1);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.SoundOnOff = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "sound_on_off",
            width: 80,
            height: 80
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
        if ( playSound == 0 )
            this.chooseImage(1);
        else
            this.chooseImage(0);
    },
    onSelect: function(event) {

        if ( playSound == 0 ) {
            playSound = 1;
            this.chooseImage(0);
        }
        else {
            playSound = 0;
            this.chooseImage(1);
        }
    },
    chooseImage: function (frame) {
        this.renderable.addAnimation("idle", [frame], 1);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});


function calculateAllSeeds() {
    var tot = 0;
    for ( var i=0;i<16;i++) {
        tot += holes[i].seeds;
    }
    console.log('count seeds = ' + tot);
    console.log('collectCount1 = ' + collectCount1);
    console.log('collectCount2 = ' + collectCount2);
    var totseeds = tot + collectCount1 + collectCount2;
    console.log('total seeds = ' + totseeds);
}



