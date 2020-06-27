function render () {
	requestAnimationFrame (render);
	
	time.setDelta ();
	if (pointerLockActivated)
		player.animate (time);
	
	sun.update ();
	
	counter += time.delta;
	
	if (gameStart) {
		gameStart = false;
		spawnStart = true;
		spawnTime = 5;
		counter = 0;
	}
	
	if (!gameStart && counter > 10)
		gameStart = true;
	
	if (spawnStart && counter > spawnTime) {
		counter = 0;
		// console.log ("game start");
		spawnTime = Math.max (0, spawnStart - 0.01);
		createMeteor ();
		console.log (meteors);
	}
	
	if (spawnStart) {
		updateMeteors ();
		totalTime += time.delta;
	}
	
	renderer.render (scene, camera);
}

