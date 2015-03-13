functionRUBI.MainMenu = function(){};

functionRUBI.MainMenu.prototype = {
  create: function() {
   menuFilter();
    
     this.background = this.game.add.tileSprite(0, 0, 800,600, 'mainMenuUI');
      this.title = this.game.add.sprite(75,250,'title'); 
       this.title.animations.add('title');	
       
       this.credits= this.game.add.sprite(0,0,'credit');
       this.credits.alpha = 0;
       

    
    
    startButton = new Buttons(this,275,560, 'start',this.startClick,this);
  	startButton.activate();
 
  	
    returnButton = new Buttons(this,610,560, 'return',this.returnClick,this);
    returnButton.deactivate();
    returnButton.alpha = 0;
  	
  	creditsButton = new Buttons(this,610,560, 'credits',this.creditsClick,this);
  	creditsButton.activate();
  	
  
     
	fadeinMus(Menumusic);
    
   
   
  },
  update: function() {
  	filterUpdate();
  	updateMusic();
  	startButton.overlap();
  	creditsButton.overlap();

  	returnButton.overlap();
  
  
 
   	this.title.animations.play('title', 2);
   
  },
  
  render:function(){
  	// this.game.debug.soundInfo(Menumusic, 20, 32);
  },
  
  startClick: function(){
  	downAudio.play();
  	functionRUBI.transitionPlugin.to("Intro");
  	
  },
  

  
  creditsClick: function(){
  	downAudio.play();
  	this.title.alpha = 0;
  	this.credits.alpha = 1;
  	returnButton.activate();
  	returnButton.alpha = 1;
  	creditsButton.alpha = 0;
  	creditsButton.deactivate();
  	
  },
  
  returnClick: function(){
  	downAudio.play();
  	this.title.alpha = 1;
  	this.credits.alpha = 0;
  	returnButton.deactivate();
  	returnButton.alpha = 0;
  	creditsButton.alpha = 1;
  	creditsButton.activate();
  }
};