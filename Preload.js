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
  	
  	//Music assets
  	this.game.load.audio('menuMus', 'assets/music/MenuMus.mp3');
  	this.game.load.audio('easyLevelMus','assets/music/PlanetJumper.mp3');
  	this.game.load.audio('hardLevelMus','assets/music/NotAnotherBattleLoop.mp3');
  	
  	//soundeffects
  	this.game.load.audio('buttonDown', 'assets/music/soundeffects/LevelSelect.mp3');
  	this.game.load.audio('buttonUp', 'assets/music/soundeffects/Hover.mp3');
  	this.game.load.audio('Upgrade', 'assets/music/soundeffects/Upgrade.mp3');
  	this.game.load.audio('wallHit','assets/music/soundeffects/WallHit.mp3');
  	this.game.load.audio('LevelComplete', 'assets/music/soundeffects/LevelComplete.mp3');
  	this.game.load.audio('LevelFailure','assets/music/soundeffects/LevelFailure.mp3');
  	
  	//rubi sound effects
  	this.game.load.audio('rubiInt', 'assets/music/soundeffects/RUBIShootInt.mp3');
  	this.game.load.audio('rubiDouble', 'assets/music/soundeffects/RUBIShootDouble.mp3');
  	this.game.load.audio('rubiFloat1', 'assets/music/soundeffects/Shield.mp3');
  	this.game.load.audio('rubiFloat2', 'assets/music/soundeffects/Denial.mp3');
  	this.game.load.audio('rubiboolean2', 'assets/music/soundeffects/MineExplode.mp3');
  	this.game.load.audio('rubiboolean1','assets/music/soundeffects/MineDrop.mp3');
  	this.game.load.audio('rubiString','assets/music/soundeffects/GrenadeFire.mp3');
  	this.game.load.audio('rubiWalk', 'assets/music/soundeffects/Walk.mp3');
  	this.game.load.audio('rubiHurt', 'assets/music/soundeffects/RUBIHurt.mp3');
  	
  	//enemy sound effects
  	this.game.load.audio('enemyHurt', 'assets/music/soundeffects/Hurt.mp3');
  	this.game.load.audio('followerHurt', 'assets/music/soundeffects/Grenade.mp3');
  	this.game.load.audio('slimeShoot', 'assets/music/soundeffects/SlimeExplode.mp3');
  	this.game.load.audio('mildewShoot', 'assets/music/soundeffects/MildewFire.mp3');
  	this.game.load.audio('spawnerShoot', 'assets/music/soundeffects/SpawnerSpawn.mp3');
  	
  	
  	//intro images
  	this.game.load.image('intro1','assets/menu/Intro/intro1.png');
  	this.game.load.image('intro2','assets/menu/Intro/intro2.png');
  	this.game.load.image('intro3','assets/menu/Intro/intro3.png');
  	this.game.load.image('intro4','assets/menu/Intro/intro4.png');
  	this.game.load.image('intro5','assets/menu/Intro/intro4.png');
  	
  	
  	
  	//menu buttons assets
  		this.game.load.image('screenOverlay','assets/world/screenoverlay.png');
  	this.game.load.image('levelMenuUI','assets/menu/levelMenuUI.png');
  	this.game.load.image('mainMenuUI','assets/menu/mainMenuUI.png');
  	this.game.load.image('credit','assets/menu/credits.png');
  	this.game.load.spritesheet('title','assets/menu/RUBILOGO.png',669,91);
   
   this.game.load.spritesheet('skipintro','assets/menu/buttons/skipintro.png',165,33);
    this.game.load.spritesheet('credits','assets/menu/buttons/credits.png',165,33); 
     this.game.load.spritesheet('start','assets/menu/buttons/start.png',240,33); 
    this.game.load.spritesheet('return','assets/menu/buttons/return.png',165,33); 
   this.game.load.spritesheet('rateoffire','assets/menu/buttons/rateoffire.png',165,33);
  this.game.load.spritesheet('speed','assets/menu/buttons/speed.png',165,33);
    this.game.load.spritesheet('damage','assets/menu/buttons/damage.png',165,33);
    this.game.load.spritesheet('menubutton','assets/menu/buttons/menu.png',165,33);
    this.game.load.spritesheet('weapon','assets/menu/buttons/weaponinfo.png',120,24);
     this.game.load.spritesheet('return1','assets/menu/buttons/return1.png',120,24);
    
    
    //level buttons
    this.game.load.spritesheet('level0','assets/menu/level/level0.png',150,100);
    this.game.load.spritesheet('level1','assets/menu/level/level1.png',150,100);
    this.game.load.spritesheet('level2','assets/menu/level/level2.png',150,100);
    this.game.load.spritesheet('level3','assets/menu/level/level3.png',150,100);
    this.game.load.spritesheet('level4','assets/menu/level/level4.png',150,99);
    this.game.load.spritesheet('level5','assets/menu/level/level5.png',150,100);
    
    //tutorial assets
    this.game.load.image('tutIntro','assets/world/level0/tutIntro.png');
    this.game.load.image('tutMovement','assets/world/level0/tutMovement.png');
    this.game.load.image('tutShoot','assets/world/level0/tutShoot.png');
    this.game.load.image('tutShoot1','assets/world/level0/tutShoot1.png');
     this.game.load.image('tutShoot2','assets/world/level0/tutShoot2.png');
    this.game.load.image('tutHealth','assets/world/level0/tutHealth.png');
     this.game.load.image('tutHealth1','assets/world/level0/tutHealth1.png');
     this.game.load.image('tutUpgrade1','assets/world/level0/tutUpgrade1.png');
     this.game.load.image('tutUpgrade','assets/world/level0/tutUpgrade.png');
       this.game.load.image('tutGoal','assets/world/level0/tutGoal.png');
 
    //more level stuff
     this.game.load.image('endSucess','assets/world/endSucess.png');
     this.game.load.image('endFail','assets/world/endFail.png');
   
   
   //Player assets
    this.game.load.spritesheet('player', 'assets/rubi/rubiWalk.png', 64, 64);
    this.game.load.image('spark','assets/rubi/part.png');
    //gui
	this.game.load.spritesheet("GUI", "assets/world/gui/gui.png", 64, 64);

//enemy assets
 this.game.load.spritesheet('follower', 'assets/enemies/follower/FollowerIdle.png', 32, 32);
    this.game.load.image("mildewBullets", "assets/enemies/enemy_bullets/Mildewbullet.png");
     this.game.load.spritesheet('mildew', 'assets/enemies/mildew/MildewShoot.png', 32, 32);   
     this.game.load.spritesheet('slime', 'assets/enemies/slime/SlimeFinal.png', 32, 32);
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


  },
  create: function() {
  	//create all audio Sounds
  	   Menumusic = this.game.add.audio('menuMus',globalVar.audio,true);
  	  easylevelMusic = this.game.add.audio('easyLevelMus',globalVar.audio,true);
  	   hardlevelMusic = this.game.add.audio('hardLevelMus',globalVar.audio.true);
  	   
       downAudio = this.game.add.audio('buttonDown',globalVar.soundfx);
       upAudio = this.game.add.audio('buttonUp',globalVar.soundfx);
       upgradeAudio = this.game.add.audio('Upgrade',globalVar.soundfx);
       completeAudio = this.game.add.audio('LevelComplete',globalVar.soundfx);
       failureAudio = this.game.add.audio('LevelFailure',globalVar.soundfx);
       
       intAudio = this.game.add.audio('rubiString',globalVar.soundfx);
       doubleAudio = this.game.add.audio('rubiDouble',globalVar.soundfx);
       float1Audio = this.game.add.audio('rubiFloat2',globalVar.soundfx);
       float2Audio = this.game.add.audio('rubiFloat1',globalVar.soundfx);
       stringAudio = this.game.add.audio('rubiInt',globalVar.soundfx);
       boolean1Audio = this.game.add.audio('rubiboolean1',globalVar.soundfx);
       boolean2Audio = this.game.add.audio('rubiboolean2',globalVar.soundfx);
       walkAudio = this.game.add.audio('rubiWalk',globalVar.soundfx);
       hurtAudio = this.game.add.audio('rubiHurt',globalVar.soundfx);
       wallAudio = this.game.add.audio('wallHit',globalVar.soundfx);
       
       enemyHurtAudio = this.game.add.audio('enemyHurt',globalVar.soundfx);
       followerHurtAudio = this.game.add.audio('followerHurt',globalVar.soundfx);
          slimeShootAudio = this.game.add.audio('slimeShoot',globalVar.soundfx);
       mildewShootAudio = this.game.add.audio('mildewShoot',globalVar.soundfx);
       spawnerShootAudio = this.game.add.audio('spawnerShoot',globalVar.soundfx);
       
  functionRUBI.game.time.events.add(Phaser.Timer.SECOND * 3, this.start, this);   
  	
  	
  },
  
   start: function() {

   	functionRUBI.transitionPlugin.to('MainMenu');

   },
   
   render: function(){
  	// this.game.debug.soundInfo(hardlevelMusic, 20, 32);
  },
  
  
};