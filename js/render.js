function render () {
	requestAnimationFrame (render);
	
	time.setDelta ();
	if (pointerLockActivated)
		player.animate (time);
	
	sun.update ();
	
	renderer.render (scene, camera);
}

