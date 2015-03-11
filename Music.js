musicVar ={
fadeIn: false,
fadeOut: false,
duration: 0,
inMus: null,
outMus: null,

};

function fadeinMus(music){
	music.volume= 0;
	music.play();
	musicVar.inMus = music;
	musicVar.fadeIn = true;
}

function fadeoutMus(music){
	musicVar.outMus = music;
	musicVar.fadeOut = true;
}

function stopMus(music){
	music.stop();
}

function updateMusic(){
	if(musicVar.fadeIn== true){
		if (functionRUBI.game.time.now > musicVar.duration){
			musicVar.duration = functionRUBI.game.time.now + 100;
			if(musicVar.inMus.volume <= globalVar.audio){
				musicVar.inMus.volume+=.02;
				console.log(musicVar.inMus.volume);
				}else{
				musicVar.inMus = null;
				musicVar.fadeIn = false;
			}
		}
	}
		if(musicVar.fadeOut== true){
		if (functionRUBI.game.time.now > musicVar.duration){
			musicVar.duration = functionRUBI.game.time.now + 100;
			if(musicVar.outMus.volume >=0){
				musicVar.outMus.volume-=.1;
				}else{
				stopMus(musicVar.outMus);
				musicVar.outMus = null;
				musicVar.fadeOut = false;
			}
		}
	}
	
}

