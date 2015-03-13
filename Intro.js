functionRUBI.Intro = function(){};

functionRUBI.Intro.prototype = {
  create: function() {
   menuFilter();
    
    if(globalVar.mute = true){
    	functionRUBI.game.sound.mute = false;
    }
     
	
	this.current = 1;
	pictureA = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'intro1');
    pictureA.anchor.setTo(0.5, 0.5);
    pictureA.scale.setTo(.75, .75);

    pictureB = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'intro2');
    pictureB.anchor.setTo(0.5, 0.5);
   pictureB.scale.setTo(.75, .75);
    pictureB.alpha = 0;
    
     this.timer = this.game.time.create(false);
     this.timer.add(10000, this.fadePictures, this);
	this.timer.start();
    
   
     
	//fadeinMus(Menumusic);
	this.background = this.game.add.tileSprite(0, 0, 800,600, 'mainMenuUI');
	
	skipButton = new Buttons(this,300,560, 'skipintro',this.skipClick,this);
  skipButton.activate();
    
   
   
  },
  update: function() {
  	filterUpdate();
  	updateMusic();
  	skipButton.overlap();
  	console.log(this.current);
   	
  },
  
  fadePictures: function(){
  	//  Cross-fade the two pictures
    var tween;

    if (pictureA.alpha === 1)
    {
        tween = this.game.add.tween(pictureA).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(pictureB).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    }
    else
    {
        this.game.add.tween(pictureA).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        tween = this.game.add.tween(pictureB).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }

    //  When the cross-fade is complete we swap the image being shown by the now hidden picture
    tween.onComplete.add(this.changePicture, this);
  },
  
  changePicture: function(){
  	    this.current++;
  	 if (pictureA.alpha === 0)
    {
        pictureA.loadTexture('intro' + this.current);
    }
    else
    {
        pictureB.loadTexture('intro' + this.current);
    }

   // this.current++;

    if (this.current > 5)
    {
       functionRUBI.transitionPlugin.to("LevelMenu");
    }
    this.timer.add(10000, this.fadePictures, this);
  	
  },
  
  render:function(){
  	// this.game.debug.soundInfo(Menumusic, 20, 32);
  },
  
  skipClick: function(){
  	downAudio.play();
  	functionRUBI.transitionPlugin.to("LevelMenu");
  	
  }
};