var functionRUBI = functionRUBI || {};

functionRUBI.Boot = function(){};



//setting game configuration and loading the assets for the loading screen
functionRUBI.Boot.prototype = {
  preload: function() {
  	//assets we'll use in the loading screen
  	
    this.load.image('preloadbar', 'assets/test/preloader-bar.png');
  },
  create: function() {
  	
    this.game.stage.backgroundColor = '#000000';
    
this.game.scale.pageAlignHorizontally = true;
this.game.scale.pageAlignVertically = true;
this.game.scale.refresh();

    
	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	//this.game.physics.startSystem(Phaser.Physics.P2JS);
    
    this.state.start('Preload');
  }
};