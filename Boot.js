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
    
//this.game.scale.pageAlignHorizontally = true;
//this.game.scale.pageAlignVertically = true;
//this.game.scale.refresh();

    functionRUBI.transitionPlugin = this.game.plugins.add(Phaser.Plugin.StateTransition);
    
    
   functionRUBI.transitionPlugin.settings({

    //how long the animation should take
    duration: 2000,

    //ease property
    ease: Phaser.Easing.Exponential.InOut, /* default ease */

    //what property should be tweened
    properties: {
        alpha: 0,
        scale: {
            x: 2,
            y: 2,
        }
    }
	});
	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	//this.game.physics.startSystem(Phaser.Physics.P2JS);
    
    this.state.start('Preload');
  }
};