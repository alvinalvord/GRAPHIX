function onKeyDownEvent (e) {
	switch (e.keyCode) {
		case 87: player.move.forward = 1;
        break;
        case 83: player.move.backward = 1;
        break;
        case 65: player.move.left = 1;
        break;
        case 68: player.move.right = 1;
        break;
		case 81: player.move.peek.left = 1;
		break;
		case 69: player.move.peek.right = 1;
		break;
		case 32: player.jump ();
		break;
		case 18: e.preventDefault ();
	}
}

function onKeyUpEvent (e) {
	switch (e.keyCode) {
		case 87: player.move.forward = 0;
        break;
        case 83: player.move.backward = 0;
        break;
        case 65: player.move.left = 0;
        break;
        case 68: player.move.right = 0;
        break;
		case 81: player.move.peek.left = 0;
		break;
		case 69: player.move.peek.right = 0;
		break;
	}
}

function onWindowResizeEvent () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix ();
	renderer.setSize (window.innerWidth, window.innerHeight);
}

function pointerLockChangedEvent () {
	if (document.body === document.pointerLockElement ||
		document.body === document.mozPointerLockElement ||
		document.body === document.webkitPointerLockElement
	) {
		pointerLockActivated = true;
	} else {
		pointerLockActivated = false;
	}
}

function mouseClickEvent (e) {
	if (!pointerLockActivated) {
		document.body.requestPointerLock = 
			document.body.requestPointerLock ||
			document.body.mozRequestPointerLock ||
			document.body.webkitRequestPointerLock;
		document.body.requestPointerLock ();
		pointerLockActivated = true;
	}
}

function mouseMoveEvent (e) {
	if (!pointerLockActivated || player === undefined)
		return;
	
	var x = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
	var y = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
	
	player.rotate (x, y);
	
}

function mouseScrollEvent (e) {
	if (!pointerLockActivated || player === undefined)
		return;

	player.zoom (e.wheelDelta);
}
