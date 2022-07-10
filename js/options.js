

game.Option = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
            image: "options",
            width: 50,
            height: 50
        }]);

        this.chooseUnselect();

        this.settings = settings;
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
        
        this.name = 'option';
        this.text = 'This is option.';
        this.posX = 100;
        this.posY = 10;
        this.label = 'none';
        this.optionNo = 0;
        this.selected = '';
        
    },

    chooseSelect: function () {
        this.renderable.addAnimation("idle", [1], 1);
        this.renderable.setCurrentAnimation("idle");
    },

    chooseUnselect: function () {
        this.renderable.addAnimation("idle", [2], 1);
        this.renderable.setCurrentAnimation("idle");
    },

    onSelect: function(event) {
        console.log('clicked ' + this.label);
        
        console.log(this.label);
        playOptions[lastOptionNo].chooseUnselect();

        if ( this.label == 'computer' ) {
            twoPlayers = false;
            name1 = 'You';
            name2 = 'Computer';
            gameLevel = 0;
        } else if ( this.label == 'computer2') {
            twoPlayers = false;
            name1 = 'You';
            name2 = 'Computer';
            gameLevel = 1;
        } else if ( this.label == 'computer3') {
            twoPlayers = false;
            name1 = 'You';
            name2 = 'Computer';
            gameLevel = 2;
        } else {
            twoPlayers = true;
            name1 = 'Player 1';
            name2 = 'Player 2';
            gameLevel = 0;
        }

        this.chooseSelect();
        lastOptionNo = this.optionNo;

    },

    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("arial", 30, "#3f51b5", "middle");
        label._drawFont(context, this.text, 30, -20);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);

        return true;
    }
});
