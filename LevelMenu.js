functionRUBI.LevelMenu = function(){};

functionRUBI.LevelMenu.prototype = {
  create: function() {
  	 // filter from http://glslsandbox.com/e#18578.0
    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "float noise(vec2 pos) {",
            "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
        "}",

        "void main( void ) {",

            "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
            "float pos = (gl_FragCoord.y / resolution.y);",
            "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
            "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

            "pos -= (distortion * distortion) * 0.1;",

            "float c = sin(pos * 400.0) * 0.4 + 0.4;",
            "c = pow(c, 0.2);",
            "c *= 0.2;",

            "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
            "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

            "c += distortion * 0.08;",
            "// noise",
            "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",


            "gl_FragColor = vec4( 0.0, c, 0.0, 1.0 );",
        "}"
    ];

    this.filter = new Phaser.Filter(this.game, null, fragmentSrc);
    this.filter.setResolution(800, 600);

    this.sprite = this.game.add.sprite();
   this.sprite.width = 800;
    this.sprite.height = 600;
    
    this.sprite.filters = [ this.filter ];
  	
  	
  	 speedButton = this.game.add.button(100,500, 'speed',this.speedClick,this,1,0,1);
  	 rateoffireButton = this.game.add.button(300,500, 'rateoffire',this.rateoffireClick,this,1,0,1);
  	damageButton = this.game.add.button(500,500, 'damage',this.damageClick,this,1,0,1);
  	tutorialButton = this.game.add.button(100,100, 'level',this.tutorialClick,this,1,0,1);
  	
  	
  },
  
  update: function(){
  	this.filter.update(this.game.input.mousePointer);
  },
  
  
  //BUTTON FUNCTIONS
  tutorialClick: function(){
  	this.game.state.start('Game');
  },
  
  
  // a speed upgrade costs 25 rubucks
  speedClick: function(){
  	if(rubiUpgrade.speed <100 && rubiHealth.rubucks >24){
  	rubiUpgrade.speed += 20;
  	rubiHealth.rubucks -=25;
  	}
  	
  },
  
  // rate of fire upgrade costs 50
  rateoffireClick: function(){
  	if(rubiUpgrade.rateoffire <100 && rubiHealth.rubucks >49){
  	rubiUpgrade.rateoffire +=20;
  	  	rubiHealth.rubucks -=50;
  	}
  },
  
  //damage upgrade costs 75
  damageClick: function(){
  	if(rubiUpgrade.damage <20 && rubiHealth.rubucks >74){
  	rubiUpgrade.damage +=5;
  	  	rubiHealth.rubucks -=75;
  	}
  },
  
   //debug functions
render: function(){
	 this.game.debug.text("DEBUGTEXT",500,100);
	 this.game.debug.text("Rubi's speed "+(300+rubiUpgrade.speed),500,120);
	 this.game.debug.text("Rubi's rate of fire "+(fireRate+rubiUpgrade.rateoffire),500,140);
	 this.game.debug.text("Rubi's damage "+(10+rubiUpgrade.damage),500,160);
	 this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),500,180);
},
  
};