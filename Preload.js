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
   this.game.load.image('background','assets/test/background.jpg');
    this.game.load.image('player','assets/test/rubitest.png');
    this.game.load.image('bullet','assets/enemies/enemy_bullets/Mildewbullet.png');


   // this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
   // this.load.audio('collect', 'assets/audio/collect.ogg');
   
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};