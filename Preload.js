var functionRUBI = functionRUBI || {};

//loading the game assets
functionRUBI.Preload = function(){};

functionRUBI.Preload.prototype = {
  preload: function() {
  	//show logo in loading screen

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	//load game assets
  	//menu assets
   this.game.load.image('title','assets/menu/main-title.gif');
   this.game.load.spritesheet('start','assets/menu/buttons/start.png',200,50);
   this.game.load.spritesheet('level','assets/menu/buttons/level.png',200,50);
   this.game.load.spritesheet('rateoffire','assets/menu/buttons/rateoffire.png',200,50);
  this.game.load.spritesheet('speed','assets/menu/buttons/speed.png',200,50);
    this.game.load.spritesheet('damage','assets/menu/buttons/damage.png',200,50);
   
   
   //Player assets
    this.game.load.spritesheet('player', 'assets/rubi/rubiBlue.png', 64, 64);
 //   this.game.load.image('player','assets/test/rubitest.png');
    this.game.load.image('spark','assets/rubi/part.png');


//enemy assets
 this.game.load.image("follower", "assets/enemies/follower/FollowerIdle1.png");
    this.game.load.image("mildewBullets", "assets/enemies/enemy_bullets/Mildewbullet.png");
    this.game.load.image("mildew", "assets/enemies/mildew/MildewAttack1.png");
    this.game.load.image("slime", "assets/enemies/slime/SlimeIdle1.png");
    
    //loading rubi bullets
    this.game.load.image('intBullet','assets/rubi/bulletWhite.png');
	this.game.load.image('doubleBullet','assets/rubi/bulletRed.png');
	this.game.load.image('stringBullet','assets/rubi/bulletBlue.png');
	this.game.load.image('booleanBullet','assets/rubi/bulletGreen.png');
	
	
	

   // this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
   // this.load.audio('collect', 'assets/audio/collect.ogg');
   
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};