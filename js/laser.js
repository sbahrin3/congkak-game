game.Laser = me.Entity.extend({
    init: function (x, y) {
        this._super(me.Entity, "init", [x, y, { width: game.Laser.width, height: game.Laser.height }]);
        //this.z = 5;
        //this.body.setVelocity(0, 80);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init: function () {
                this._super(me.Renderable, "init", [0, 0, game.Laser.width, game.Laser.height]);
            },
            destroy: function () {},
            draw: function (renderer) {
                //var color = renderer.getColor();
                renderer.setColor('#ff0000');
                renderer.fillRect(0, 0, this.width, this.height);
                //renderer.setColor(color);
                
            }
        }));
        this.alwaysUpdate = true;
        this.direction = 1;
        this.fromHole = 0;
        this.toHole = 0;
        this.cnt = 0;
       
    },

    onCollision: function (res, other) {

        if (other.body.collisionType == me.collision.types.ENEMY_OBJECT) {
            
            me.game.world.removeChild(this);
   
            var totalCnt = holes[this.fromHole].seeds + holes[this.toHole].seeds;
            
            if ( this.direction == 1)
                holes[7].seeds += totalCnt;
            else if ( this.direction == 2)
                holes[15].seeds += totalCnt;

            holes[this.fromHole].seeds = 0;
            holes[this.toHole].seeds = 0;
            var holeNumber = this.toHole;
            holes[this.toHole].chooseBoom();
            setTimeout( function() { 
                holes[holeNumber].chooseTembak(); 
            }, 300);
            if ( this.direction == 1 ) {
                if ( checkGameEnded() ) {
                    displayScore();
                }
            } else {
                if ( checkGameEnded() ) {
                    displayScore();
                }
            }
            
            return true;
        }
    },

    update: function (time) {

        
 
        if ( this.direction == 1 ) {
            console.log('laser1 = ' + this.pos.y);
            this.body.vel.y -= this.body.accel.y * time / 10000;
        }
        else if ( this.direction == 2) {
            console.log('laser2 = ' + this.pos.y);
            this.body.vel.y += this.body.accel.y * time / 10000;
        }

        if (this.pos.y + this.height <= 0 ) {
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    }
});

game.Laser.width = 10;
game.Laser.height = 10;

