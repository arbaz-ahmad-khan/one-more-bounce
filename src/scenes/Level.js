
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bg
		const bg = this.add.tileSprite(0, 540.0000015497208, 8000, 898, "bg");
		bg.scaleY = 1.1;
		bg.setOrigin(0, 0.5);

		// goalsContainer
		const goalsContainer = this.add.container(0, 0);

		// container_obstacles
		const container_obstacles = this.add.container(0, 0);

		// container_gameOver
		const container_gameOver = this.add.container(0, 0);
		container_gameOver.visible = false;

		// rectangle_1
		const rectangle_1 = this.add.rectangle(960, 540, 800, 800);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 591188;
		container_gameOver.add(rectangle_1);

		// text_1
		const text_1 = this.add.text(960, 400, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Game Over";
		text_1.setStyle({ "fontFamily": "Arial", "fontSize": "100px", "stroke": "#5900ce" });
		container_gameOver.add(text_1);

		// restartBtn
		const restartBtn = this.add.image(960, 700, "restart");
		container_gameOver.add(restartBtn);

		this.bg = bg;
		this.goalsContainer = goalsContainer;
		this.container_obstacles = container_obstacles;
		this.restartBtn = restartBtn;
		this.container_gameOver = container_gameOver;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	bg;
	/** @type {Phaser.GameObjects.Container} */
	goalsContainer;
	/** @type {Phaser.GameObjects.Container} */
	container_obstacles;
	/** @type {Phaser.GameObjects.Image} */
	restartBtn;
	/** @type {Phaser.GameObjects.Container} */
	container_gameOver;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.LevelManagers = new LevelManager(this);
		this.isGameOver = false;
		this.isDrawing = false;

		this.currentLevel = 1;

		this.levelTxt();
		this.setLevel(this.currentLevel);
		this.setGoalProperties();
		this.twoSmallCircles();
		this.pointerOverAndOut();
		
		this.graphics = this.add.graphics();
		this.line = new Phaser.Geom.Line(0, 0, 0, 0);
		this.lineBodyArray = [];

		this.setupInputListeners();
		this.setupCollisionListener();
		this.setupRestartButtonListener();

	}

	levelTxt() {
		this.levelText = this.add.text(960, 0, `Level: ${this.currentLevel}`, {
			fontSize: "48px",
			fontFamily: "Arial",
			fontStyle: "bold",
			color: "#ffffff"
		}).setScrollFactor(0);
	}

	setLevel = (currentLevel) => {
		this.levelText.setText(`Level: ${currentLevel}`);

		this.levelSetUp = this.LevelManagers.levelData[currentLevel];

		this.ball = this.matter.add.image(this.levelSetUp.ballPosition[0].x, this.levelSetUp.ballPosition[0].y, "ball", null, {
			shape: { type: "circle", radius: 40, },
			ignoreGravity: true,
		}).setScale(1);
		this.ball.setBounce(1);
		this.ball.setVisible(false);

		this.cameras.main.setBounds(...this.levelSetUp.cameraBound);
		this.cameras.main.startFollow(this.ball, true, 0.1, 0.1);

		this.tapTweenDisplay();
		this.particleBurst();

		this.levelSetUp.obstaclePosition.forEach((obstacle) => {
			const obstacleSprite = this.add.rectangle(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 0x09137f);
			this.matter.add.gameObject(obstacleSprite, {
				isStatic: true,
				label: "obstacle"
			});
			this.container_obstacles.add(obstacleSprite);
		});

		this.levelSetUp.obstaclePositionTriangle.forEach((obstacle, index) => {
			const triangle = this.matter.add.image(obstacle.x, obstacle.y, "triangle", null, {
				shape: this.cache.json.get("triangleJsonFile").triangle,
				label: "obstacle"
			});
			triangle.setScale(obstacle.scaleX, obstacle.scaleY);
			triangle.setAngle(obstacle.angle);
			this.container_obstacles.add(triangle);

			if (index === 2) {
				let tweenConfig = {
					targets: triangle,
					duration: currentLevel === 4 ? 3000 : 4000,
					ease: 'Linear',
					repeat: -1,
					yoyo: true
				};

				if (currentLevel === 4) {
					tweenConfig.y = triangle.y - 650;
				} else if (currentLevel === 5) {
					tweenConfig.x = triangle.x - 750;
				}

				this.thirdTrinangle = this.tweens.add(tweenConfig);
			}

		});

		this.levelSetUp.goalPosition.forEach((goal) => {
			const goalSprite = this.add.image(goal.x, goal.y, "goal");
			goalSprite.setScale(goal.scaleX, goal.scaleY);
			this.goalsContainer.add(goalSprite);
		});

		this.obstacles = this.matter.world.localWorld.bodies;
	}

	setupInputListeners() {
		this.input.on('pointerdown', this.pointerDown, this);
		this.input.on('pointermove', this.pointerMove, this);
		this.input.on('pointerup', this.pointerUp, this);
	}

	setupCollisionListener() {
		this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
			if (bodyA === this.ball.body || bodyB === this.ball.body) {
				this.lineBodyArray.forEach((lineBody) => {
					if (bodyA === lineBody || bodyB === lineBody) {
						this.startCircle.setVisible(false);
						this.endCircle.setVisible(false);
						this.matter.world.remove(lineBody);
						this.graphics.clear();
					}
				});
			}
		});
	}

	tapTweenDisplay() {
		this.tap = this.add.sprite(280, 600, "tap");
		this.tap.setOrigin(0.5);
		this.tapTween = this.tweens.add({
			targets: this.tap,
			x: 500,
			y: 800,
			alpha: 0,
			duration: 2000,
			ease: 'Cubic.InOut',
			repeat: -1,
		});
	}

	twoSmallCircles() {
		this.startCircle = this.add.image(410, 300, "sCircle");
		this.startCircle.setScale(1.5);
		this.startCircle.setVisible(false);
		this.endCircle = this.add.image(4500, 540, "sCircle");
		this.endCircle.setScale(1.5);
		this.endCircle.setVisible(false);
	}

	pointerDown(pointer) {
		if (!this.isGameOver) {
			this.line.x1 = pointer.worldX;
			this.line.y1 = pointer.worldY;
			this.line.x2 = pointer.worldX;
			this.line.y2 = pointer.worldY;
			this.isDrawing = true;

			this.startCircle.setVisible(true);
			this.startCircle.x = pointer.worldX;
			this.startCircle.y = pointer.worldY;

			this.lineBodyArray.forEach((lineBody) => {
				this.matter.world.remove(lineBody);
			});
		}
	}

	pointerMove(pointer) {
		if (!this.isGameOver) {
			if (this.isDrawing) {
				const maxLength = 600;
				this.endCircle.setVisible(true);
				this.endCircle.x = pointer.worldX;
				this.endCircle.y = pointer.worldY;

				const worldX = pointer.worldX;
				const worldY = pointer.worldY;

				this.line.x2 = worldX;
				this.line.y2 = worldY;

				const dx = this.line.x2 - this.line.x1;
				const dy = this.line.y2 - this.line.y1;
				let length = Math.sqrt(dx * dx + dy * dy);

				const maxLineLength = 600;
				const minBounce = 1;
				const maxBounce = 1.8;
				const bounceFactor = minBounce + (maxBounce - minBounce) * (length / maxLineLength);
				this.ball.setBounce(bounceFactor);

				if (bounceFactor < minBounce) {
					this.ball.setBounce(minBounce);
				} else if (bounceFactor > maxBounce) {
					this.ball.setBounce(maxBounce);
				}

				if (length > maxLength) {
					const angle = Math.atan2(dy, dx);
					this.line.x2 = this.line.x1 + maxLength * Math.cos(angle);
					this.line.y2 = this.line.y1 + maxLength * Math.sin(angle);
					length = maxLength;
					this.endCircle.x = this.line.x2;
					this.endCircle.y = this.line.y2;
					const lineBody = this.matter.add.rectangle(this.line.x2, this.line.y2, maxLength, 5, {
						angle: Math.atan2(dy, dx),
						isStatic: true
					});
					this.lineBodyArray.push(lineBody);
					this.input.off('pointermove', this.pointerMove, this);
				}

				this.graphics.clear();
				this.graphics.lineStyle(10, 0xFFFF00, 1);
				this.graphics.strokeLineShape(this.line);

				if (this.lineBodyArray.length > 0) {
					const previousLineBody = this.lineBodyArray.pop();
					this.matter.world.remove(previousLineBody);
				}

				if (length < maxLength) {
					const lineLength = Math.sqrt((this.line.x2 - this.line.x1) ** 2 + (this.line.y2 - this.line.y1) ** 2);
					const lineBody = this.matter.add.rectangle(this.line.x1 + dx / 2, this.line.y1 + dy / 2, lineLength, 5, {
						angle: Math.atan2(dy, dx),
						isStatic: true
					});
					this.lineBodyArray.push(lineBody);
				}
			}
		}
	}
	pointerUp(pointer) {
		if (!this.isGameOver) {
			if (this.isDrawing) {
				this.isDrawing = false;
				this.input.on('pointermove', this.pointerMove, this);
				this.ball.setIgnoreGravity(false);
				if (this.tapTween) {
					this.tapTween.destroy();
					this.tap.destroy();
				}
			}
		}
	}

	setGoalProperties() {
		this.goals = [];
		this.goalsContainer.iterate((child) => {
			this.goals.push(child);
		});
	}

	particleBurst() {
		this.emitter = this.add.particles(0, 0, "particle", {
			x : this.ball.x,
			y : this.ball.y,
			color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
			colorEase: 'quad.out',
			lifespan: 1600,
			angle: { min: -100, max: -80 },
			scale: { start: 1, end: 0, ease: 'sine.out' },
			speed: 100,
			advance: 2000,
			blendMode: 'ADD'
		});

		this.emitter.startFollow(this.ball);
	}

	update() {
		if (!this.isGameOver) {
			if (this.ball !== undefined && this.ball.body !== undefined) {
				this.goals.forEach((goal) => {
					if (Phaser.Geom.Intersects.RectangleToRectangle(goal.getBounds(), this.ball.getBounds())) {
						this.nextLevel();
					}
				});
				this.obstacles.forEach((obstacle) => {
					if (obstacle.label === "obstacle" && this.matter.overlap(this.ball, obstacle)) {
						this.emitter2 = this.add.particles(0, 0, "particle-1", {
							speed: 100,
							scale: { start: 1, end: 0 },
							frequency: 2000,
							quantity: 100,
							blendMode: "ADD",
						});

						this.emitter2.explode(20, this.ball.x, this.ball.y);
						this.gameOver();
					}
				});
			}
		}
	}

	nextLevel() {
		this.isGameOver = true;
		setTimeout(() => {
			this.ball.destroy();
			this.emitter.destroy();
			this.graphics.clear();
			if (this.thirdTrinangle) {
				this.thirdTrinangle.destroy();
			}
			this.lineBodyArray.forEach((lineBody) => {
				this.matter.world.remove(lineBody);
			});
			this.currentLevel++;
			if (this.currentLevel > 5) {
				this.currentLevel = 1;
			}
			this.container_obstacles.removeAll(true);
			this.goalsContainer.removeAll(true);
			this.setLevel(this.currentLevel);
			this.setGoalProperties();
			this.isGameOver = false;
		}, 1000);
	}

	gameOver() {
		this.input.off('pointerdown', this.pointerDown, this);
		this.ball.body.destroy();
		this.isGameOver = true;
		if (this.thirdTrinangle) {
			this.thirdTrinangle.destroy();
		}
		this.emitter.destroy();
		this.graphics.clear();
		this.startCircle.setVisible(false);
		this.endCircle.setVisible(false);

		this.lineBodyArray.forEach((lineBody) => {
			this.matter.world.remove(lineBody);
		});
		setTimeout(() => {
			this.container_gameOver.visible = true;
			const cameraX = this.cameras.main.scrollX + this.cameras.main.width / 2;
			const cameraY = this.cameras.main.scrollY + this.cameras.main.height / 2;
			const sceneCenterX = this.container_gameOver.width / 2 + cameraX;
			const sceneCenterY = this.container_gameOver.height / 2 + cameraY;
			this.container_gameOver.x = sceneCenterX - 900;
		}, 1000);

	}

	restartGame() {
		this.emitter2.destroy();
		this.container_gameOver.visible = false;
		this.container_obstacles.removeAll(true);
		this.goalsContainer.removeAll(true);
		this.setLevel(this.currentLevel);
		this.setGoalProperties();
		this.isGameOver = false;
	}

	setupRestartButtonListener() {
		this.restartBtn.setInteractive().on("pointerdown", () => {
			this.restartGame();
			setTimeout(() => {
				this.input.on('pointerdown', this.pointerDown, this);
			}, 500);
		});
	}

	pointerOverAndOut(){
		this.pointerOver = (aBtn,scale) => {
			this.input.setDefaultCursor('pointer');
			this.tweens.add({
				targets: aBtn,
				scaleX: scale + 0.05,
				scaleY: scale + 0.05,
				duration: 50
			})
		}
		this.pointerOut = (aBtn,scale) => {
			this.input.setDefaultCursor('default');
			this.tweens.add({
				targets: aBtn,
				scaleX: scale,
				scaleY: scale,
				duration: 50,
				onComplete: () => {
					aBtn.forEach((btn) => {
						btn.setScale(scale);
					});
				}
			})
		}
		
		this.restartBtn.on('pointerover', () => this.pointerOver([this.restartBtn],1));
		this.restartBtn.on('pointerout', () => this.pointerOut([this.restartBtn],1));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
