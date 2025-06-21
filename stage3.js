const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player, cursors, items, distractions, score = 0, scoreText;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('player', 'assets/player.png');
  this.load.image('certificate', 'assets/certificate.png');
  this.load.image('skill', 'assets/skill.png');
  this.load.image('photo', 'assets/photo.png');
  this.load.image('phone', 'assets/phone.png');
  this.load.image('snack', 'assets/snack.png');
  this.load.image('bg', 'assets/bg.png');
}

function create() {
  this.add.image(400, 300, 'bg');

  player = this.physics.add.sprite(100, 300, 'player').setScale(0.1);
  player.setCollideWorldBounds(true);

  // Items to collect
  items = this.physics.add.group();
  items.create(200, 100, 'certificate').setScale(0.1);
  items.create(400, 400, 'skill').setScale(0.1);
  items.create(600, 150, 'photo').setScale(0.2);

  // Distractions to avoid
  distractions = this.physics.add.group();
  distractions.create(300, 300, 'phone').setVelocity(80, 100).setBounce(1).setCollideWorldBounds(true).setScale(0.1);
  distractions.create(500, 500, 'snack').setVelocity(-100, 80).setBounce(1).setCollideWorldBounds(true).setScale(0.3);

  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, 'Resume Items: 0 / 3', {
    fontSize: '20px',
    fill: '#fff'
  });

  this.physics.add.overlap(player, items, collectItem, null, this);
  this.physics.add.collider(player, distractions, hitDistraction, null, this);
}

function update() {
  player.setVelocity(0);
  if (cursors.left.isDown) player.setVelocityX(-200);
  if (cursors.right.isDown) player.setVelocityX(200);
  if (cursors.up.isDown) player.setVelocityY(-200);
  if (cursors.down.isDown) player.setVelocityY(200);
}

function hitDistraction() {
  score = Math.max(0, score - 1);
  scoreText.setText(`Resume Items: ${score} / 3`);
}


function collectItem(player, item) {
  item.disableBody(true, true);
  score++;
  scoreText.setText(`Resume Items: ${score} / 3`);

  if (score === 3) {
    showNextStageButton(this); // call new function
  }
}

function showNextStageButton(scene) {
  scene.scene.pause();

  scene.add.text(200, 200, '🎉 Resume Complete!', { fontSize: '30px', fill: '#0f0' });
  scene.add.text(220, 250, 'You are ready for the final interview.', { fontSize: '20px', fill: '#fff' });

  // Create HTML button using DOM
  const btn = document.createElement("button");
  btn.innerText = "Proceed to Stage 4 ➡️";
  btn.style.position = "absolute";
  btn.style.top = "60%";
  btn.style.left = "50%";
  btn.style.transform = "translate(-50%, -50%)";
  btn.style.padding = "15px 30px";
  btn.style.fontSize = "18px";
  btn.style.backgroundColor = "#00c853";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.cursor = "pointer";
  btn.onclick = () => {
    window.location.href = "stage4.html";
  };

  document.body.appendChild(btn);
}




