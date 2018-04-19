// threejs vars
var scene;
var camera;
var renderer;
var ambientLight;
var sun = {};
var sky;

// game vars
var player;
var floor;

// pointer lock vars
var pointerLockAvailable = true;
var pointerLockActivated = false;

// animation vars
var time = {
	current:0, delta: 0, previous: performance.now (),
	setDelta: function () {
		this.current = performance.now ();
		this.delta = (this.current - this.previous) / 1000;
		this.previous = this.current;
	}
};

// constants
const PI_2 = Math.PI / 2;
const Gravity = 9.8;

function globalInit () {
	pointerLockControlCheck ();
	if (pointerLockAvailable) {
		initThreeVars ();
		initGameVars ();
		initEventListeners ();
	}
}

function pointerLockControlCheck () {
	if (!('pointerLockElement' in document ||
		'mozPointerLockElement' in document ||
		'webkitPointerLockElement' in document)) {
			
		try {
			window.stop ();
		} catch (e) {
			document.execCommand ('Stop');
		}
		
		pointerLockAvailable = false;
		document.body.innerHTML = "";
		document.write ("Unable to load Game. Pointer Lock is not supported by your browser.");
	}
}

function initThreeVars () {
	// base threejs code
	scene = new THREE.Scene ();
	
	camera = new THREE.PerspectiveCamera 
		(75, window.innerWidth/window.innerHeight, 0.1, 5000);
	
	renderer = new THREE.WebGLRenderer ();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize (window.innerWidth, window.innerHeight);
	document.body.appendChild (renderer.domElement);
	
	// game elements
	ambientLight = new THREE.AmbientLight (0xffffff, 0.4);
	scene.add (ambientLight);
}

function initGameVars () {
	player = new Player ();
	player.camera = camera;
	
	floor = createFloor ();
	scene.add (floor);
	
	sun = createSun ();
	scene.add (sun.light);
	
	sky = createSky (sun.light);
	scene.add (sky);
	
	stars = createStars ();
	scene.add (stars);
}

function initEventListeners () {
	window.addEventListener ('keydown', onKeyDownEvent, false);
	window.addEventListener ('keyup', onKeyUpEvent, false);
	window.addEventListener ('resize', onWindowResizeEvent, false);
	window.addEventListener ('click', mouseClickEvent, false);
	window.addEventListener ('mousewheel', mouseScrollEvent, false);
	window.addEventListener ('DOMMouseScroll', mouseScrollEvent, false);

	document.addEventListener ('pointerlockchange', pointerLockChangedEvent, false);
	document.addEventListener ('mozpointerlockchange', pointerLockChangedEvent, false);
	document.addEventListener ('webkitpointerlockchange', pointerLockChangedEvent, false);
}

