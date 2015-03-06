// Loads game assets
//
//

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
  	//menu buttons assets
  		this.game.load.image('screenOverlay','assets/world/screenoverlay.png');
  	this.game.load.image('levelMenuUI','assets/menu/levelMenuUI.png');
  	this.game.load.spritesheet('title','assets/menu/main-title.png',684,156);
   this.game.load.spritesheet('start','assets/menu/buttons/start.png',158,47);
   this.game.load.spritesheet('rateoffire','assets/menu/buttons/rateoffire.png',165,33);
  this.game.load.spritesheet('speed','assets/menu/buttons/speed.png',165,33);
    this.game.load.spritesheet('damage','assets/menu/buttons/damage.png',165,33);
    //level buttons
    this.game.load.spritesheet('level0','assets/menu/level/level0.png',150,100);
    this.game.load.spritesheet('level1','assets/menu/level/level1.png',150,100);
    this.game.load.spritesheet('level2','assets/menu/level/level2.png',150,100);
    this.game.load.spritesheet('level3','assets/menu/level/level3.png',150,100);
    this.game.load.spritesheet('level4','assets/menu/level/level4.png',150,99);
    this.game.load.spritesheet('level5','assets/menu/level/level5.png',150,100);
   
   
   //Player assets
    this.game.load.spritesheet('player', 'assets/rubi/rubiWalk.png', 64, 64);
    this.game.load.image('spark','assets/rubi/part.png');
    //gui
	this.game.load.spritesheet("GUI", "assets/world/gui/gui.png", 64, 64);

//enemy assets
 this.game.load.spritesheet('follower', 'assets/enemies/follower/FollowerIdle.png', 32, 32);
    this.game.load.image("mildewBullets", "assets/enemies/enemy_bullets/Mildewbullet.png");
     this.game.load.spritesheet('mildew', 'assets/enemies/mildew/MildewShoot.png', 32, 32);   
     this.game.load.spritesheet('slime', 'assets/enemies/slime/SlimeAttack.png', 32, 32);
     this.game.load.spritesheet('spawner','assets/enemies/spawner/SpawnerSpawn.png',64,64);
    
    //loading rubi bullets
    this.game.load.image('intBullet','assets/rubi/bulletWhite.png');
	this.game.load.image('doubleBullet','assets/rubi/bulletRed.png');
	this.game.load.image('stringBullet','assets/rubi/bulletBlue.png');
	this.game.load.image('floatBullet','assets/rubi/bulletGreen.png');
	this.game.load.spritesheet('booleanBullet','assets/rubi/minefinal.png',32,32);
	
//world assests
this.game.load.spritesheet('goal', 'assets/world/nucleusgoal.png', 96, 96);
this.game.load.image('endscreen', 'assets/world/endgame/endscreen.png',800,600);


	
	
	

   // this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
   // this.load.audio('collect', 'assets/audio/collect.ogg');
   
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};