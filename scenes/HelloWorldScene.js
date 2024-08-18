export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  init() {}

  preload() {}

 // Crear pala como rectángulo
 this.paddle = this.add.rectangle(400, 500, 100, 20, 0x6666ff);
 this.physics.add.existing(this.paddle);
 this.paddle.body.setImmovable(true);
 this.paddle.body.setCollideWorldBounds(true);

 // Crear bola como círculo
 this.ball = this.add.circle(400, 300, 10, 0xff6666);
 this.physics.add.existing(this.ball);
 this.ball.body.setCollideWorldBounds(true);
 this.ball.body.setBounce(1, 1);
 this.ball.body.setVelocity(200, 200);

 // Crear múltiples obstáculos en la parte superior
 this.obstacles = this.physics.add.staticGroup();
 for (let row = 0; row < 3; row++) {
   for (let col = 0; col < 7; col++) {
     let x = 120 + col * 80;
     let y = 100 + row * 40;
     let obstacle = this.add.rectangle(x, y, 60, 20, 0x66ff66);
     this.physics.add.existing(obstacle);
     obstacle.body.setImmovable(true);
     this.obstacles.add(obstacle);
   }
 }

 // Configurar para que la pala no sea afectada por la gravedad
 this.paddle.body.setAllowGravity(false);

 // Agregar colisiones
 this.physics.add.collider(this.paddle, this.ball, null, null, this);
 this.physics.add.collider(this.obstacles, this.ball, this.handleCollision, null, this);

 // Crear cursor
 this.cursor = this.input.keyboard.createCursorKeys();

 // Detectar colisión con el límite inferior del mundo
 this.physics.world.on("worldbounds", (body, up, down, left, right) => {
   if (down) {
     console.log("hit bottom");
     this.scene.start("GameOver");
   }
 });
}
