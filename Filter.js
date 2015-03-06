function createBackground(){
	
    // filter from  From http://glslsandbox.com/e#20193.0

    var fragmentSrc = [
        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "float length2(vec2 p) { return dot(p, p); }",

        "float noise(vec2 p){",
            "return fract(sin(fract(sin(p.x) * (43.13311)) + p.y) * 31.0011);",
        "}",

        "float worley(vec2 p) {",
            "float d = 1e30;",
            "for (int xo = -1; xo <= 1; ++xo) {",
                "for (int yo = -1; yo <= 1; ++yo) {",
                    "vec2 tp = floor(p) + vec2(xo, yo);",
                    "d = min(d, length2(p - tp - vec2(noise(tp))));",
                "}",
            "}",
            "return 3.0*exp(-4.0*abs(2.0*d - 1.0));",
        "}",

        "float fworley(vec2 p) {",
            "return sqrt(sqrt(sqrt(",
            "1.1 * // light",
            "worley(p*5. + .3 + time*.0525) *",
            "sqrt(worley(p * 50. + 0.3 + time * -0.15)) *",
            "sqrt(sqrt(worley(p * -10. + 9.3))))));",
        "}",

        "void main() {",
            "vec2 uv = gl_FragCoord.xy / resolution.xy;",
            "float t = fworley(uv * resolution.xy / 1500.0);",
            "t *= exp(-length2(abs(0.7*uv - 1.0)));",
            "gl_FragColor = vec4(t * vec3(0.1, 1.5*t, 1.2*t + pow(t, 0.5-t)), 1.0);",
        "}"
    ];

//change the starting point as rubi moves (p.x, p.y)
    functionRUBI.filter = new Phaser.Filter(functionRUBI.game, null, fragmentSrc);
    functionRUBI.filter.setResolution(1000, 1000);

    functionRUBI.background = functionRUBI.game.add.sprite();
    functionRUBI.background.width = 800;
    functionRUBI.background.height = 600;

    functionRUBI.background.filters = [ functionRUBI.filter ];
}

function filterUpdate(){
	
	functionRUBI.filter.update();
}

////////////Button Prototype

var Buttons = function(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {  
  Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group);
  game.add.existing(this);
};

Buttons.prototype = Object.create(Phaser.Button.prototype);
Buttons.prototype.constructor = Buttons;

Buttons.prototype.activate = function() {
  this.input.enabled = true;
  this.frame = 0;
};

Buttons.prototype.overlap = function(){
 if (this.input.enabled == true){	
	if (this.input.pointerOver()) {
 	 	this.frame = 1;
		} else{
		this.frame = 0;
		}
	}
};

Buttons.prototype.deactivate = function() {
  this.input.enabled = false;
  this.frame = 1; // change this to match your greyed out frame in the button spritesheet
};
