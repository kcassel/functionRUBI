functionRUBI.MainMenu = function(){};

functionRUBI.MainMenu.prototype = {
  create: function() {
   menuFilter();
    
    
     this.background = this.game.add.tileSprite(0, 0, 800,600, 'screenOverlay');
      this.title = this.game.add.sprite(50,200,'title'); 
       this.title.animations.add('title');	

    
    startButton = this.game.add.button(300,400, 'start',this.startClick,this,1,0,1);
    
   
   
  },
  update: function() {
  	filterUpdate();
   	this.title.animations.play('title', 2);
   
  },
  
  startClick: function(){
  	this.game.state.start('LevelMenu');
  }
};