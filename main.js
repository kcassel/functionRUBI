var functionRUBI = functionRUBI || {};

functionRUBI.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

functionRUBI.game.state.add('Boot', functionRUBI.Boot);

functionRUBI.game.state.add('Preload', functionRUBI.Preload);
functionRUBI.game.state.add('MainMenu', functionRUBI.MainMenu);
functionRUBI.game.state.add('LevelMenu', functionRUBI.LevelMenu);
functionRUBI.game.state.add('Game', functionRUBI.Game);
functionRUBI.game.state.add('level0', functionRUBI.level0);
functionRUBI.game.state.add('level1', functionRUBI.level1);
functionRUBI.game.state.add('level2', functionRUBI.level2);
functionRUBI.game.state.add('level3', functionRUBI.level3);
functionRUBI.game.state.add('level4', functionRUBI.level4);
functionRUBI.game.state.add('level5', functionRUBI.level5);
functionRUBI.game.state.add('EndGame', functionRUBI.EndGame);


functionRUBI.game.state.start('Boot');