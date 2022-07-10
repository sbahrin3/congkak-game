game.MenuPlay = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "menuplay",
            width: 150,
            height: 70
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        me.state.change(me.state.PLAY);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});


game.MenuHighScorers = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "highscorers",
            width: 278,
            height: 60
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        me.state.change(me.state.SCORE);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.MenuCredit = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "menucredits",
            width: 181,
            height: 60
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        me.state.change(me.state.CREDITS);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.MenuOK = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "ok",
            width: 66,
            height: 60
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        me.state.change(me.state.CREDITS);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.MenuBack = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "back",
            width: 162,
            height: 60
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        resetGameValues();
        me.state.change(me.state.MENU);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.Title = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "game_title",
            width: 779,
            height: 230
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

game.InfoText = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            width: 400,
            height: 72
        }]);
        this.text = '';
    },
    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("arial", 24, "#fff", "middle");
        label._drawFont(context, this.text, 0, 0);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.ScoreText = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            width: 400,
            height: 72
        }]);
        this.text = '';
    },
    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("times", 28, "#000", "middle");
        label._drawFont(context, this.text, 0, 0);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.ViewWinners = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            width: 400,
            height: 72
        }]);
        this.text = 'Other Winners >';
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
    		me.state.change(VIEW_WINNERS);
    },
    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("courier", 28, "#000", "middle");
        label._drawFont(context, this.text, 0, 0);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.OpenListWinners = me.Entity.extend( {
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            width: 200,
            height: 72
        }]);
        this.text = '>';
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        console.log('VIEW LIST OF WINNERS ON INTERNET BROWSER');
        window.open('http://mylebah.com/playresult/scores.html');
    },
    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("courier", 28, "#000", "middle");
        label._drawFont(context, this.text, 0, 0);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.ViewNextPageWinners = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            width: 200,
            height: 72
        }]);
        this.text = '>';
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
    		winnerPage++;
    		me.state.change(VIEW_WINNERS + winnerPage);
    },
    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("courier", 28, "#000", "middle");
        label._drawFont(context, this.text, 0, 0);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.ViewPrevPageWinners = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            width: 100,
            height: 72
        }]);
        this.text = '<';
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
    		winnerPage--;
    		me.state.change(VIEW_WINNERS + winnerPage);
    },
    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("courier", 28, "#000", "middle");
        label._drawFont(context, this.text, 0, 0);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.ViewTopScorers = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            width: 400,
            height: 72
        }]);
        this.text = '< High Scorers';
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
    		me.state.change(me.state.SCORE);
    },
    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("courier", 28, "#000", "middle");
        label._drawFont(context, this.text, 0, 0);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

//--- results
game.YouWin = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "youwin",
            width: 500,
            height: 170
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        resetGameValues();
        me.state.change(me.state.MENU);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.YouLose = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "youlose",
            width: 500,
            height: 170
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        resetGameValues();
        me.state.change(me.state.MENU);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.WinPlayer1 = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "winplayer1",
            width: 500,
            height: 170
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        resetGameValues();
        me.state.change(me.state.MENU);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.WinPlayer2 = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "winplayer2",
            width: 500,
            height: 170
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        resetGameValues();
        me.state.change(me.state.MENU);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.Draw = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "draw",
            width: 500,
            height: 170
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        resetGameValues();
        me.state.change(me.state.MENU);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});

game.TimesUp = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, {
            image: "timesup",
            width: 500,
            height: 170
        }]);
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
    },
    onSelect: function(event) {
        resetGameValues();
        me.state.change(me.state.MENU);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);
        return true;
    }
});








