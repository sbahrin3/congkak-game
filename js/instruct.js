game.Instruct = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
            image: "instruct",
            width: 24,
            height: 24
        }]);

        var frame = 1;
        this.chooseImage(frame);

        this.settings = settings;
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
        
        this.name = 'instruct';
        this.text = 'This is instruction.';
        this.posX = 100;
        this.posY = 10;
        this.label = 'none';
        this.selected = '';
        
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
        if ( this.selected == 'yes' ) {
            this.chooseUnselect();
        } else {
            this.chooseSelect();
        }

    },

    draw : function (renderer) {
        var context = renderer.getContext();
        var label = new me.Font("arial", 34, "#3669a2", "middle");
        label._drawFont(context, this.text, 20, -15);
        
        return this._super(me.Entity, "draw", [ renderer ]);
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        //this.body.update();

        return true;
    }
});
