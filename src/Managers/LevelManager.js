class LevelManager {
	constructor(oScene) {
		this.levelData = {
			1: {
				obstaclePosition: [
					{ x: -50, y: 540, width: 200, height: 1080 },
					{ x: 2000, y: -50, width: 4000, height: 200 },
					{ x: 2000, y: 1130, width: 4000, height: 200 },
				],
				obstaclePositionTriangle: [
					{ x: 1200, y: 125, scaleX: 1, scaleY: 1, angle: 60},
					{ x: 2100, y: 955, scaleX: 1, scaleY: 1, angle: 0},
				],
				goalPosition: [
					{ x: 4000+200, y: 540, scaleX: 1, scaleY: 1 },
				],
				ballPosition: [
					{ x: 410, y: 300 },
				],
				cameraBound: [0, 0, 4000, 1080],
			},
			2: {
				obstaclePosition: [
					{ x: -50, y: 540, width: 200, height: 1080 },
					{ x: 2000, y: -50, width: 4000, height: 200 },
					{ x: 2000, y: 1130, width: 4000, height: 200 },
				],
				obstaclePositionTriangle: [
					{ x: 1200+500, y: 125, scaleX: 1, scaleY: 1, angle: 60},
					{ x: 1500+500, y: 125, scaleX: 1, scaleY: 1, angle: 60},
					{ x: 1800+500, y: 125, scaleX: 1, scaleY: 1, angle: 60},
					{ x: 2100+500, y: 125, scaleX: 1, scaleY: 1, angle: 60},
					{ x: 1200+500, y: 955, scaleX: 1, scaleY: 1, angle: 0},
					{ x: 1500+500, y: 955, scaleX: 1, scaleY: 1, angle: 0},
					{ x: 1800+500, y: 955, scaleX: 1, scaleY: 1, angle: 0},
					{ x: 2100+500, y: 955, scaleX: 1, scaleY: 1, angle: 0},
				],
				goalPosition: [
					{ x: 4000+200, y: 540, scaleX: 1, scaleY: 2 }
				],
				ballPosition: [
					{ x: 410, y: 300 },
				],
				cameraBound: [0, 0, 4000, 1080]
			},
			3: {
				obstaclePosition: [
					{ x: -50, y: 540, width: 200, height: 1080 },
					{ x: 2800, y: -50, width: 5500, height: 200 },
					{ x: 2800, y: 1130, width: 5500, height: 200 },
				],
				obstaclePositionTriangle: [
					{ x: 1500, y: 900, scaleX: 1, scaleY: 1, angle: 0 },
					{ x: 1200, y: 200, scaleX: 1, scaleY: 1, angle: 60 },
					{ x: 2500, y: 900, scaleX: 1, scaleY: 1, angle: 0 },
					{ x: 2200, y: 200, scaleX: 1, scaleY: 1, angle: 60 },
					{ x: 3500, y: 900, scaleX: 1, scaleY: 1, angle: 0 },
					{ x: 3200, y: 200, scaleX: 1, scaleY: 1, angle: 60 },
					{ x: 3900, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 3600, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 4300, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 4000, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 5000, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 4700, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
				],
				
				goalPosition: [
					{ x: 5500+200, y: 540, scaleX: 1, scaleY: 2}
				],
				ballPosition: [
					{ x: 410, y: 300 },
				],
				cameraBound: [0, 0, 5500, 1080]
			},
			4: {
				obstaclePosition: [
					{ x:-50 , y: 540, width: 200, height: 1080 },
					{ x: 2800, y: -50, width: 5500, height: 200 },
					{ x: 2800, y: 1130, width: 5500, height: 200 },
				],
				obstaclePositionTriangle: [
					{ x: 1500, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 1200, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 2500, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 2200, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 3500, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 3200, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 4500, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 4200, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 5500, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 5200, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 6000, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 5700, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
				],
				goalPosition: [
					{ x: 6500+200, y: 900, scaleX: 1, scaleY: 2},
				],
				ballPosition: [
					{ x: 540, y: 220 },
				],
				cameraBound: [0, 0, 6500, 1080]
			},
			5: {
				obstaclePosition: [
					{ x: -50, y: 540, width: 200, height: 1080 },
					{ x: 2800, y: -50, width: 5500, height: 200 },
					{ x: 2800, y: 1130, width: 5500, height: 200 },
				],
				obstaclePositionTriangle: [
					{ x: 1500, y: 900, scaleX: 1, scaleY: 1, angle: 0 },
					{ x: 1200, y: 200, scaleX: 1, scaleY: 1, angle: 60 },
					{ x: 3000, y: 540, scaleX: 0.5, scaleY: 0.5, angle: 30 },
					{ x: 2500, y: 900, scaleX: 1, scaleY: 1, angle: 0 },
					{ x: 2200, y: 200, scaleX: 1, scaleY: 1, angle: 60 },
					{ x: 3500, y: 900, scaleX: 1, scaleY: 1, angle: 0 },
					{ x: 3200, y: 200, scaleX: 1, scaleY: 1, angle: 60 },
					{ x: 3900, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 3600, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 4300, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 4000, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
					{ x: 5000, y: 900, scaleX: 0.5, scaleY: 0.5, angle: 0 },
					{ x: 4700, y: 200, scaleX: 0.5, scaleY: 0.5, angle: 60 },
				],
				goalPosition: [
					{ x: 5500+200, y: 540, scaleX: 1, scaleY: 2},
				],
				ballPosition: [
					{ x: 600, y: 220 },
				],
				cameraBound: [0, 0, 5500, 1080]
			},
			
		};
	};
}