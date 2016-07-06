var cursors, player, ball, ground, scoreLabel;
var score = 0;
var PLAYER_SPEED = 300;

var playState = {
  create: function() {
    score = 0;

    new BackgroundControl().create();

    ground = game.add.sprite(0, game.world.height - 30, 'ground');
    game.physics.arcade.enable(ground);

    player = game.add.sprite((game.world.width / 2) - 40, game.world.height - 65, 'player');
    player.scale.setTo(0.7);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    ball = game.add.sprite((game.world.width / 2) - 40, 0, 'ball');
    game.physics.arcade.enable(ball);

    ball.body.gravity.y = 500;
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.9, 0.9);

    cursors = game.input.keyboard.createCursorKeys();

    var labelOptions = { font: "30px Arial", fill: "#ffffff" };
    scoreLabel = game.add.text(20, 20, 0, labelOptions);
  },

  update: function() {
    game.physics.arcade.overlap(player, ball, this.handleCollision, null, this);
    game.physics.arcade.collide(ball, ground, this.finishGame, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      player.body.velocity.x = -PLAYER_SPEED
    } else if (cursors.right.isDown) {
      player.body.velocity.x = PLAYER_SPEED;
    };
  },

  handleCollision: function() {
    this.incrementPoints();
    this.moveBall();
  },

  incrementPoints: function() {
    score += 1;
    scoreLabel.text = score;
  },

  moveBall: function() {
    ball.body.velocity.x = Math.random() * (-200 + (-200)) + 200;
    ball.body.velocity.y = -500;
  },

  finishGame: function() {
    game.state.start('finish');
  }
};