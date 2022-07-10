
game.CongkakBoard = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, "init", [0, 80,  {
            image: "congkakboard",
            width: 840,
            height: 330
        }]);

        this.chooseImage(0);

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
