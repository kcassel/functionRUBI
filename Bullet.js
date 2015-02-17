var fireRate = 200;
var nextFire =0;

function createBullets(){
functionRUBI.bullets = functionRUBI.game.add.group();
functionRUBI.bullets.enableBody = true;
functionRUBI.bullets.physicsBodyType = Phaser.Physics.ARCADE;
functionRUBI.bullets.createMultiple(50, 'bullet');
functionRUBI.bullets.setAll('checkWorldBounds', true);
functionRUBI.bullets.setAll('outOfBoundsKill', true);	
}	
		
function fire(px,py) {

    if (functionRUBI.game.time.now > nextFire && functionRUBI.bullets.countDead() > 0){
        nextFire = functionRUBI.game.time.now + fireRate;

        var bullet = functionRUBI.bullets.getFirstDead();		
		var x0 = px+32;
		var y0 = py+32;
     //  bullet.reset(x0*Math.cos(30)+y0*Math.sin(30),x0*-Math.sin(30)+y0*Math.cos(30));
     
		bullet.reset(px, py);
		//bullet.body.rotation = game.physics.arcade.angleToPointer(player);
		
        functionRUBI.game.physics.arcade.moveToPointer(bullet, 500);
    }
  }