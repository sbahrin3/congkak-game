game.Hole = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
            image: "ships",
            width: 100,
            height: 100
        }]);

        this.settings = settings;
        me.input.registerPointerEvent('pointerdown', this, this.onSelect.bind(this));
        
        var frame = 0;

        this.chooseImage(frame);
        this.body.setVelocity(0, 0);
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.name = 'hole';
        this.seeds = 0;
        this.posX = 0;
        this.posY = 0;
        this.position = 0;
        this.burned = 0; //burned = 1 meaning burned house
        this.n = 0;
        this.shaking1 = false;
        this.shaking2 = false;
        this.shakepos1 = 0;
        this.shakepos2 = 0;
        this.fally1 = 40;
        this.fally2 = -40;

        
    },

    onSelect: function(event) {
        if ( this.position > -1 && this.position < 7 ) {
            if ( this.seeds > 0 ) {
                if ( !runPlayer1 ) {

                    if ( gameFirstStart && !twoPlayers ) {
                        this.computerFirstStart();
                    }

                    if ( turnPlayer1 ) {
                        this.playerSelectHole1();
                    }
                    
                }
            }
        }
        else if ( this.position > 7 && this.position < 15 ) {
            if ( this.seeds > 0 ) {
                if ( !runPlayer2 ) {
                    
                    if ( twoPlayers && turnPlayer2 ) {
                        this.playerSelectHole2();

                    }


                }
            }
        }

    },

    computerFirstStart: function() {

        if ( !quitGameDialog ) {
            turnPlayer2 = true;
            holePosition2 = 8;
            collectCount2 = holes[holePosition2].seeds;
            holes[holePosition2].seeds = 0;
            
            pressHole2(this);
            
            holePosition2++;
            runPlayer2 = true; //run the computer
            stoppedPlayer2 = false;
            arrowRun2.status = '';
            
        }

    },

    playerSelectHole1: function() {

        if ( !quitGameDialog ) {
            if ( !gameEnded ) {
                console.log('player1 SELECT hole ' + this.position);
                this.chooseActive();
                
                holePosition1 = this.position;
                collectCount1 = holes[holePosition1].seeds;
                holes[holePosition1].seeds = 0;
                
                resetHolesColor();

                holePosition1++;
                runPlayer1 = true;
                stoppedPlayer1 = false;

                gameFirstStart = false;
                roundPlayer1 = 0;

                arrowRun1.status = '';
                
                hand1.move = true;
				hand1.direction = holePosition1 < 7 ? "left" : "right";
				hand1.direction = holePosition1 == 7 ? "up" : hand1.direction;
				hand1.direction = holePosition1 == 14 ? "down" : hand1.direction;

                hand1.pos.x = this.posX + 35;
                hand1.pos.y = this.posY + 100;
                
                pressHole1(this);
                
                
            }
        }

    },

    playerSelectHole2: function() {

        if ( !quitGameDialog ) {
            if ( !gameEnded ) {

                this.chooseActive();

                holePosition2 = this.position;
                collectCount2 = holes[holePosition2].seeds;
                holes[holePosition2].seeds = 0;
                
                resetHolesColor();

                holePosition2++;
                runPlayer2 = true;
                stoppedPlayer2 = false;

                gameFirstStart = false;
                roundPlayer2 = 0;

                arrowRun2.status = '';
                
                hand2.move = true;
				hand2.direction = holePosition2 < 7 ? "left" : "right";
				hand2.direction = holePosition2 > 14 ? "down" : hand2.direction;
				hand2.direction = holePosition2 == 6 ? "up" : hand2.direction;

                hand2.pos.x = this.posX + 35;
                hand2.pos.y = this.posY - 30;
                
                pressHole2(this);
                

            }
        }

    },

    tembakAtas: function(fromHole, toHole) {
        
    	tembakHole(1, fromHole, toHole);
    	
    },


    tembakBawah: function(fromHole, toHole) {
    	
    	tembakHole(2, fromHole, toHole);
    	
    },

    chooseImage: function (frame) {
    		try {
    			this.renderable.addAnimation("idle", [frame], 1);
    			this.renderable.setCurrentAnimation("idle");
    		} catch (err) {
    			console.log('Err: ' + err.message);
    		}
    },

    chooseActive: function() {
    		try {
    			//this.renderable.addAnimation("idle", [1], 1);
    			//this.renderable.setCurrentAnimation("idle");
    		} catch (err) {
    			console.log('Err: ' + err.message);
    		}
    },

    chooseActive2: function() {
    		try {
    			//this.renderable.addAnimation("idle", [2], 1);
    			//this.renderable.setCurrentAnimation("idle");
    		} catch (err) {
    			console.log('Err: ' + err.message);
    		}
    },

    chooseScoop1: function() {
    		try {
    			
    			pressHole1(this);
    			
    			//this.renderable.addAnimation("idle", [1], 1);
    			//this.renderable.setCurrentAnimation("idle");
    		} catch (err) {
    			console.log('Err: ' + err.message);
    		}
    },

    chooseScoop2: function() {
    		try {
    			
    			pressHole2(this);
    			
    			//this.renderable.addAnimation("idle", [2], 1);
    			//this.renderable.setCurrentAnimation("idle");
    		} catch (err) {
    			console.log('Err: ' + err.message);
    		}
    },

    chooseTembak: function() {
    		try {
    			//this.renderable.addAnimation("idle", [3], 1);
    			//this.renderable.setCurrentAnimation("idle");
    		} catch (err) {
    			console.log('Err: ' + err.message);
    		}
    },
    chooseBoom: function() {
    		try {
    			//this.renderable.addAnimation("idle", [4], 1);
    			//this.renderable.setCurrentAnimation("idle");
    		} catch (err) {
    			console.log('Err: ' + err.message);
    		}
    },
    chooseNormal: function() {
    		try {
    			//this.renderable.addAnimation("idle", [0], 1);
    			//this.renderable.setCurrentAnimation("idle");
    		} catch (err) {
    			console.log('Err: ' + err.message);
    		}
    },
    draw : function (renderer) {
        
        var context = renderer.getContext();

        this.n++;
        if ( this.n == 5 ) {
            this.n = 0;
            if ( this.shaking1 ) {
                
                if ( this.shakepos1 == 0 ) {
                    this.pos.y = this.pos.y - 5;
                    this.shakepos1++;

                    this.fally1--;
                    drawFallingSeed(context, this.fally1, 1);
                    if ( this.fally1 < -100 ) {
                        this.fally1 = 0;
                    }

                } else {
                    this.shakepos1 = 0;
                    this.shaking1 = false;
                    this.pos.y = this.pos.y + 5;
                }
                
            }
            if ( this.shaking2 ) {
                if ( this.shakepos2 == 0 ) {
                    this.pos.y = this.pos.y + 5;
                    this.shakepos2++;

                    this.fally2++;
                    drawFallingSeed(context, this.fally2, 1);
                    if ( this.fally2 > 100 ) {
                        this.fally2 = 0;
                    }

                } else {
                    this.shakepos2 = 0;
                    this.shaking2 = false;
                    this.pos.y = this.pos.y - 5;
                }
            }
        }

        drawSeeds(context, this.seeds);

       //draw number
        
        var label = new me.Font("times", 22, "white", "middle");
        var ix = 14;
        var iy = -50;
        
        var x = this.seeds < 10 ? ix + 3 : ix + 10;
        
        context.beginPath();
        context.arc(x + 2,iy + 12,16,0,2*Math.PI);
        context.fillStyle = "#4a4a4b";
        context.fill();

        context.beginPath();
        context.arc(x + 2,iy + 12,16,0,2*Math.PI);
        context.stroke();

        
        if ( this.seeds > 0 ) {
            if ( !this.shaking1 && !this.shaking2 ) {
             label._drawFont(context, this.seeds, ix, iy);
            }
        }

        return this._super(me.Entity, "draw", [ renderer ]);
    },
    update: function (time) {
        this._super(me.Entity, "update", [time]);

        
        this.body.update();
        return true;
    }
});

function resetHolesColor() {
    for ( var i=0; i<16; i++ ) {
        holes[i].chooseNormal();
    }
}

function drawSeeds(context, seedCount) {


   if ( seedCount == 1 ) {
        var cx = 0;
        var cy = 0;
        arc(context, cx, cy);
   }
   else if ( seedCount == 2 ) {
        var cx = -10;
        var cy = 0;
        for ( var n=0;n<2;n++) {
            arc(context, cx, cy);

            cx += 20;
        }
   }
   else if ( seedCount == 3 ) {
        var cx = -10;
        var cy = -6;
        for ( var n=0;n<2;n++) {
            arc(context, cx, cy);
            cx += 20;
        }
        cx = 0;
        cy = 12;
        arc(context, cx, cy);
   }
   else if ( seedCount == 4 ) {
        var cx = -10;
        var cy = -8;
        for ( var n=0;n<2;n++) {
           arc(context, cx, cy);
            cx += 15;
        }
        cx = -10;
        cy = 12;
        for ( var n=0;n<2;n++) {
           arc(context, cx, cy);
            cx += 15;
        }
    }
    else if ( seedCount > 4 ) {
        var cnt = 0;
        var cx = -10;
        var cy = -8;
        for ( var n=0;n<2;n++) {
            arc(context, cx, cy);
            cx += 15;
        }
        cx = -10;
        cy = 10;
        for ( var n=0;n<2;n++) {
            arc(context, cx, cy);
            cx += 15;
        }
        cnt = 4;
        
        //5
        if (  cnt++ < seedCount ) {
            cx = 20;
            cy = 0;
            arc(context, cx, cy);
        }
        //6
        if (  cnt++ < seedCount ) {
            cx = -24;
            cy = 0;
            arc(context, cx, cy);
        }
        //7
        if (  cnt++ < seedCount ) {
            cx = -2;
            cy = -25;
            arc(context, cx, cy);
        }
        //8
        if (  cnt++ < seedCount ) {
            cx = -2;
            cy = 27;
            arc(context, cx, cy);
        }
        //9
        if (  cnt++ < seedCount ) {
            cx = 12;
            cy = -22;
            arc(context, cx, cy);
        }
        //10
        if (  cnt++ < seedCount ) {
            cx = -17;
            cy = -22;
            arc(context, cx, cy);
        }
        //11
        if (  cnt++ < seedCount ) {
            cx = -17;
            cy = 22;
            arc(context, cx, cy);
        }
        //12
        if (  cnt++ < seedCount ) {
            cx = 13;
            cy = 22;
            arc(context, cx, cy);
        }
        
        //13
        if (  cnt++ < seedCount ) {
            cx = 20;
            cy = -16;
            arc(context, cx, cy);
        }
        //14
        if (  cnt++ < seedCount ) {
            cx = -24;
            cy = -15;
            arc(context, cx, cy);
        }
        //15
        if (  cnt++ < seedCount ) {
        		cx = -24;
            cy = 15;
            arc(context, cx, cy);
        }
        //16
        if (  cnt++ < seedCount ) {
        		cx = 22;
            cy = 15;
            arc(context, cx, cy);
        }
        //17
        if (  cnt++ < seedCount ) {
        		cx = -2;
            cy = 0;
            arc(context, cx, cy);
        }
        //18
        if (  cnt++ < seedCount ) {
        		cx = -13;
            cy = 0;
            arc(context, cx, cy);
        }
        //19
        if (  cnt++ < seedCount ) {
    			cx = 10;
            cy = 0;
            arc(context, cx, cy);          
        }
        //20
        if (  cnt++ < seedCount ) {
        		cx = -2;
            cy = -14;
            arc(context, cx, cy); 
        }
        //21
        if (  cnt++ < seedCount ) {
        		cx = -2;
            cy = 14;
            arc(context, cx, cy); 
        }
        //22
        if (  cnt++ < seedCount ) {
        		cx = 26;
            cy = 0;
            arc(context, cx, cy);
        }
        //23
        if (  cnt++ < seedCount ) {
    			cx = -28;
            cy = 0;
            arc(context, cx, cy);           
        }
        //24
        if (  cnt++ < seedCount ) {
			cx = -28;
            cy = -10;
            arc(context, cx, cy);             
        }
        //25
        if (  cnt++ < seedCount ) {
			cx = 28;
            cy = 10;
            arc(context, cx, cy); 
        }
        //26
        if (  cnt++ < seedCount ) {
			cx = -28;
            cy = 10;
            arc(context, cx, cy);             
        }
        //27
        if (  cnt++ < seedCount ) {
			cx = 28;
            cy = -10;
            arc(context, cx, cy);            
        }
        //28
        if (  cnt++ < seedCount ) {
            
        }
        //29
        if (  cnt++ < seedCount ) {
            
        }
        //30
        if (  cnt++ < seedCount ) {
            
        }
        //31
        if (  cnt++ < seedCount ) {
            
        }
        //32
        if (  cnt++ < seedCount ) {
            
        }
        //32
        if (  cnt++ < seedCount ) {
            
        }
        //33
        if (  cnt++ < seedCount ) {
            
        }
        //34
        if (  cnt++ < seedCount ) {
            
        }   
        //35
        if (  cnt++ < seedCount ) {
            
        }
        //36
        if (  cnt++ < seedCount ) {
            
        }  
                   
    }
}

function arc(context, x, y) {
	
	//draw shadow first
    context.beginPath();
    context.arc(x+2,y+2,8,0,2*Math.PI);
    context.fillStyle = "#4a4a4b";
    context.fill();
    
    //draw seed
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

function arc_test(context, x, y) {
    context.beginPath();
    context.arc(x,y,8,0,2*Math.PI);

    context.fillStyle = "#fff";
    context.fill();
    
}



function drawFallingSeed(context, y, no) {
    arc3(context, 0, y, no);
 }


 function arc3(context, x, y, no) {

    context.beginPath();
    context.arc(x,y,8,0,2*Math.PI);

    
    if ( twoPlayers ) {
        context.fillStyle = color1;
        context.fill();
    } else {
        if ( gameLevel == 0 ) {
            context.fillStyle = color2;
            context.fill();
        } else {
            context.fillStyle = color3;
            context.fill();
        }
    }
    
    
}


function tembakHole(direction, fromHole, toHole) {
	
	

	/**
	if ( direction == 1 ) {
    
    	this.laser = me.pool.pull("laser", this.posX + 50, this.posY - 20);
    	this.laser.direction = 1;
    	this.laser.fromHole = fromHole;
    	this.laser.toHole = toHole;

	} else {

    	this.laser = me.pool.pull("laser", this.posX + 50, this.posY + 100);
    	this.laser.direction = 2;
    	this.laser.fromHole = fromHole;
    	this.laser.toHole = toHole;
    
    }
    
    me.game.world.addChild(this.laser, 3);
 	**/
	

	tembak.chooseImage(direction == 1 ? 0 : 0);
    tembak.pos.x = holes[toHole].pos.x + 75;
    
    
    //after 300 set hole to normal
    setTimeout( function() { 
    	
    		tembak.pos.x = -200;
    		
    		var totalCnt = holes[fromHole].seeds + holes[toHole].seeds;
    	    holes[direction == 1 ? 7 : 15].seeds += totalCnt;
    	    
    	    holes[fromHole].seeds = 0;
    	    holes[toHole].seeds = 0;
    	    
    	    if ( checkGameEnded() ) {
            displayScore();
        }
    	    
    }, 300);
    
}


function pressHole1(obj) {
    press1.pos.x = obj.posX - 15;
    press1.pos.y = obj.posY - 14;
    setTimeout( function() { 
        press1.pos.x = -500;
        press1.pos.y = -500;
	    
    }, 200);
}

function pressHole2(obj) {
    press2.pos.x = obj.posX - 15;
    press2.pos.y = obj.posY - 14;
    setTimeout( function() { 
        press2.pos.x = -500;
        press2.pos.y = -500;
	    
    }, 200);
}