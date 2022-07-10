game.Press = me.Entity.extend({
	init: function (x, y) {
		this._super(me.Entity, "init", [x, y, {
			image: "press",
			width: 128,
			height: 128
		}]);

	},



	draw : function (renderer) {
		var context = renderer.getContext();
		
		return this._super(me.Entity, "draw", [ renderer ]);
	},

	update: function (time) {
		this._super(me.Entity, "update", [time]);
		return true;
	}

});

game.Tembak = me.Entity.extend({
	init: function (x, y) {
		this._super(me.Entity, "init", [x, y, {
			image: "tembak",
			width: 106,
			height: 300
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

game.RunPlayer1 = me.Entity.extend({
	init: function (x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "run_player1",
			width: 60,
			height: 80
		}]);

		this.settings = settings;
		this.body.setVelocity(0, 0);
		this.name = 'runPlayer1';
		this.cnt = 0;
		this.frame = 0;
		this.status = 'run';
		this.chooseImage(2);
	},
	chooseImage: function (frame) {
		this.renderable.addAnimation("idle", [frame], 1);
		this.renderable.setCurrentAnimation("idle");
	},   

	update: function (time) {
		this._super(me.Entity, "update", [time]);


		this.cnt++;

		if ( this.cnt == 20 ) {
			this.cnt = 0;
			if ( this.status == 'run' ) {
				this.chooseImage(this.frame);
			} else {
				this.chooseImage(2);
			}
			this.frame++;
			if ( this.frame > 1 ) this.frame = 0;
		}


		return true;
	}
});




game.RunPlayer2 = me.Entity.extend({
	init: function (x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "run_player2",
			width: 60,
			height: 80
		}]);

		this.settings = settings;
		this.body.setVelocity(0, 0);
		this.name = 'runPlayer2';
		this.cnt = 0;
		this.frame = 0;
		this.status = 'run';
		this.chooseImage(2);
	},
	chooseImage: function (frame) {
		this.renderable.addAnimation("idle", [frame], 1);
		this.renderable.setCurrentAnimation("idle");
	},   

	update: function (time) {
		this._super(me.Entity, "update", [time]);


		this.cnt++;

		if ( this.cnt > 20 ) {
			this.cnt = 0;
			if ( this.status == 'run' ) {
				this.chooseImage(this.frame);
			} else {
				this.chooseImage(2);
			}
			this.frame++;
			if ( this.frame > 1 ) this.frame = 0;
		}


		return true;
	}
});


game.Hand1 = me.Entity.extend({
	init: function (x, y) {
		this._super(me.Entity, "init", [x, y, {
			image: "hand1",
			width: 36,
			height: 35
		}]);

		this.far = 0;
		this.velx = playerHandSpeed;
		this.move = false;
		this.direction = "left";
		this.pause = false;
	},


	draw : function (renderer) {
		var context = renderer.getContext();

		if ( collectCount1 > 0 ) {
			drawScoopSeeds(context, collectCount1, 1, this.far);
		}
		return this._super(me.Entity, "draw", [ renderer ]);
	},

	update: function (time) {
		this._super(me.Entity, "update", [time]);
		if ( this.move && !this.pause ) {
			if ( this.direction == "left" )
				this.pos.x -= this.velx * time / 1000;
			else if ( this.direction == "right" )
				this.pos.x += this.velx * time / 1000;
			else if ( this.direction == "up" ) 
				this.pos.y -= this.velx * time / 1000;
			else if ( this.direction == "down" ) 
				this.pos.y += this.velx * time / 1000;
		}
		return true;
	}

});

game.Hand2 = me.Entity.extend({
	init: function (x, y) {
		this._super(me.Entity, "init", [x, y, {
			image: "hand2",
			width: 36,
			height: 35
		}]);

		this.far = 0;
		this.velx = playerHandSpeed;
		this.move = false;
		this.direction = "left";		
		this.pause = false;
	},



	draw : function (renderer) {
		var context = renderer.getContext();
		if ( collectCount2 > 0 ) {
			drawScoopSeeds(context, collectCount2, 2, this.far);
		}
		return this._super(me.Entity, "draw", [ renderer ]);
	},

	update: function (time) {
		this._super(me.Entity, "update", [time]);
		if ( this.move && !this.pause ) {
			if ( this.direction == "left" )
				this.pos.x -= this.velx * time / 1000;
			else if ( this.direction == "right" )
				this.pos.x += this.velx * time / 1000;
			else if ( this.direction == "up" ) 
				this.pos.y -= this.velx * time / 1000;
			else if ( this.direction == "down" ) 
				this.pos.y += this.velx * time / 1000;			
		}
		return true;
	}

});


game.PlayTimer = me.Entity.extend({
	init: function (x, y) {
		this._super(me.Entity, "init", [x, y, {
			width: 400,
			height: 72
		}]);
		this.text = '--:--';
	},
	draw : function (renderer) {
		var context = renderer.getContext();
		var label = new me.Font("arial", 80, "#000", "middle");
		label._drawFont(context, this.text, 0, 0);

		return this._super(me.Entity, "draw", [ renderer ]);
	},
	update: function (time) {
		this._super(me.Entity, "update", [time]);
		return true;
	}
});


function drawScoopSeeds(context, seedCount, no, far) {



	if ( seedCount == 1 ) {
		var cx = 0;
		var cy = 0;
		arc2(context, cx, cy, no, far);
	}
	else if ( seedCount == 2 ) {
		var cx = -10;
		var cy = 0;
		for ( var n=0;n<2;n++) {
			arc2(context, cx, cy, no, far);

			cx += 20;
		}
	}
	else if ( seedCount == 3 ) {
		var cx = -10;
		var cy = -6;
		for ( var n=0;n<2;n++) {
			arc2(context, cx, cy, no, far);
			cx += 20;
		}
		cx = 0;
		cy = 12;
		arc2(context, cx, cy, no, far);
	}
	else if ( seedCount == 4 ) {
		var cx = -10;
		var cy = -8;
		for ( var n=0;n<2;n++) {
			arc2(context, cx, cy, no, far);
			cx += 20;
		}
		cx = -10;
		cy = 12;
		for ( var n=0;n<2;n++) {
			arc2(context, cx, cy, no, far);
			cx += 20;
		}
	}
	else if ( seedCount > 4 ) {
		var cnt = 0;
		var cx = -10;
		var cy = -8;
		for ( var n=0;n<2;n++) {
			arc2(context, cx, cy, no, far);
			cx += 20;
		}
		cx = -10;
		cy = 12;
		for ( var n=0;n<2;n++) {
			arc2(context, cx, cy, no, far);
			cx += 20;
		}
		cnt = 4;

		//5
		if (  cnt++ < seedCount ) {
			cx = 28;
			cy = 0;
			arc2(context, cx, cy, no, far);
		}
		//6
		if (  cnt++ < seedCount ) {
			cx = -28;
			cy = 0;
			arc2(context, cx, cy, no, far);
		}
		//7
		if (  cnt++ < seedCount ) {
			cx = 0;
			cy = -26;
			arc2(context, cx, cy, no, far);
		}
		//8
		if (  cnt++ < seedCount ) {
			cx = 0;
			cy = 29;
			arc2(context, cx, cy, no, far);
		}
		//9
		if (  cnt++ < seedCount ) {
			cx = 24;
			cy = -22;
			arc2(context, cx, cy, no, far);
		}
		//10
		if (  cnt++ < seedCount ) {
			cx = -24;
			cy = -22;
			arc2(context, cx, cy, no, far);
		}
		//11
		if (  cnt++ < seedCount ) {
			cx = -24;
			cy = 22;
			arc2(context, cx, cy, no, far);
		}
		//12
		if (  cnt++ < seedCount ) {
			cx = 24;
			cy = 22;
			arc2(context, cx, cy, no, far);
		}

		//13
		if (  cnt++ < seedCount ) {
			cx = 17;
			cy = -34;
			arc2(context, cx, cy, no, far);
		}
		//14
		if (  cnt++ < seedCount ) {
			cx = -17;
			cy = -34;
			arc2(context, cx, cy, no, far);
		}
		//15
		if (  cnt++ < seedCount ) {
			cx = 17;
			cy = 35;
			arc2(context, cx, cy, no, far);
		}
		//16
		if (  cnt++ < seedCount ) {
			cx = 17;
			cy = -35;
			arc2(context, cx, cy, no, far);
		}
		//17
		if (  cnt++ < seedCount ) {
			cx = 17;
			cy = -24;
			arc2(context, cx, cy, no, far);
		}
		//18
		if (  cnt++ < seedCount ) {
			cx = -19;
			cy = -24;
			arc2(context, cx, cy, no, far);
		}
		//19
		if (  cnt++ < seedCount ) {
			cx = 19;
			cy = -24;
			arc2(context, cx, cy, no, far);
		}
		//20
		if (  cnt++ < seedCount ) {
			cx = -30;
			cy = -18;
			arc2(context, cx, cy, no, far);
		}
		//21
		if (  cnt++ < seedCount ) {
			cx = 0;
			cy = 34;
			arc2(context, cx, cy, no, far);
		}
		//22
		if (  cnt++ < seedCount ) {
			cx = 0;
			cy = 32;
			arc(context, cx, cy, no, far);
		}
		//23
		if (  cnt++ < seedCount ) {
			cx = 0;
			cy = -32;
			arc2(context, cx, cy, no, far);
		}
		//24
		if (  cnt++ < seedCount ) {
			cx = 0;
			cy = -12;
			arc2(context, cx, cy, no, far);
		}
		//25
		if (  cnt++ < seedCount ) {
			cx = 0;
			cy = 12;
			arc2(context, cx, cy, no, far);
		}
		//26
		if (  cnt++ < seedCount ) {
			cx = -33;
			cy = 0;
			arc2(context, cx, cy, no, far);
		}
		//27
		if (  cnt++ < seedCount ) {
			cx = 33;
			cy = 0;
			arc2(context, cx, cy, no, far);
		}
		//28
		if (  cnt++ < seedCount ) {
			cx = 33;
			cy = 10;
			arc2(context, cx, cy, no, far);
		}
		//29
		if (  cnt++ < seedCount ) {
			cx = -33;
			cy = 10;
			arc2(context, cx, cy, no, far);
		}
		//30
		if (  cnt++ < seedCount ) {
			cx = 33;
			cy = 14;
			arc2(context, cx, cy, no, far);
		}
		//31
		if (  cnt++ < seedCount ) {
			cx = -33;
			cy = 14;
			arc2(context, cx, cy, no, far);
		}
		//32
		if (  cnt++ < seedCount ) {
			cx = 33;
			cy = 16;
			arc2(context, cx, cy, no, far);
		}
		//32
		if (  cnt++ < seedCount ) {
			cx = -33;
			cy = 16;
			arc2(context, cx, cy, no, far);
		}
		//33
		if (  cnt++ < seedCount ) {
			cx = 40;
			cy = 0;
			arc2(context, cx, cy, no, far);
		}
		//34
		if (  cnt++ < seedCount ) {
			cx = -40;
			cy = 0;
			arc2(context, cx, cy, no, far);
		}   
		//35
		if (  cnt++ < seedCount ) {
			cx = 38;
			cy = -20;
			arc2(context, cx, cy, no, far);
		}
		//36
		if (  cnt++ < seedCount ) {
			cx = -32;
			cy = -10;
			arc2(context, cx, cy, no, far);
		}  

	}
}

function arc2(context, x, y, no, far) {
	if ( no == 1 ) {
		if ( far == 1)
			y = y + 140;
		else
			y = y + 50;
	} else {
		if ( far == 1)
			y = y - 140;
		else
			y = y - 50;
	}

	//draw shadow first
	context.beginPath();
	context.arc(x+3,y+3,8,0,2*Math.PI);
	context.fillStyle = "#4a4a4b";
	context.fill();

	context.beginPath();
	context.arc(x,y,8,0,2*Math.PI);
	if ( twoPlayers ) {
		context.fillStyle = color1;
		context.fill();
	} else {
		if ( gameLevel == 0 ) {
			context.fillStyle = color2;
			context.fill();
		} else if ( gameLevel == 1) {
			context.fillStyle = color3;
			context.fill();
		} else if ( gameLevel == 2) {
			context.fillStyle = color4;
			context.fill();
		}
	}

}


/*
game.Seed = me.Entity.extend({
	init: function (x, y) {
		this._super(me.Entity, "init", [x, y, {
			image: "guli",
			width: 31,
			height: 31
		}]);
		this.chooseImage(1);
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
 */

