var functionRUBI = functionRUBI || {};

functionRUBI.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

functionRUBI.game.state.add('Boot', functionRUBI.Boot);

functionRUBI.game.state.add('Preload', functionRUBI.Preload);
functionRUBI.game.state.add('MainMenu', functionRUBI.MainMenu);
functionRUBI.game.state.add('LevelMenu', functionRUBI.LevelMenu);
functionRUBI.game.state.add('Game', functionRUBI.Game);

functionRUBI.game.state.start('Boot');