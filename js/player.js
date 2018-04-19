var Player = function () {
	this.model = undefined;
	this.modelYaw = new THREE.Object3D ();
	
	this.camera = undefined;
	this.cameraPitch = new THREE.Object3D ();
	
	this.minModelCameraDistance = new THREE.Vector3 (0.5, 4, 1.5);
	this.maxModelCameraDistance = new THREE.Vector3 (1.5, 4, 4.5);
	this.modelCameraDistance = new THREE.Vector3 (1, 4, 3);
	
	this.velocityDecay = 1;
	this.translationFactor = 1600;
	this.rotationFactor = 0.0007;
	this.velocity = new THREE.Vector3 ();
	this.move = {
		forward: 0,
		backward: 0,
		left: 0,
		right: 0,
		peek: {left: 0, right: 0},
		jump: 0
	};
	
	this.init = function () {
		this.model.position.set (0, 0, 0);
		this.model.castShadow = true;
		this.model.rotation.y = Math.PI - Math.PI/18;
		
		this.camera.rotation.set (0, 0, 0);
		this.cameraPitch.add (this.camera);
		this.cameraPitch.position.set (
			this.cameraPitch.position.x + this.modelCameraDistance.x,
			this.cameraPitch.position.y + this.modelCameraDistance.y,
			this.cameraPitch.position.z + this.modelCameraDistance.z,
		);
		
		this.modelYaw.add (this.model);
		this.modelYaw.add (this.cameraPitch);
		scene.add (this.modelYaw);
		
		sun.light.target = this.modelYaw;
		document.addEventListener ('mousemove', mouseMoveEvent, false);
	}
	
	this.rotate = function (x, y) {
		this.modelYaw.rotation.y -= x * this.rotationFactor;
		this.cameraPitch.rotation.x -= y * this.rotationFactor;
		
		this.cameraPitch.rotation.x = Math.max (-Math.PI/4, Math.min (Math.PI/4, this.cameraPitch.rotation.x));
	}
	
	this.zoom = function (delta) {
		var dx = (this.maxModelCameraDistance.x - this.minModelCameraDistance.x) / 10;
		var dy = (this.maxModelCameraDistance.y - this.minModelCameraDistance.y) / 10;
		var dz = (this.maxModelCameraDistance.z - this.minModelCameraDistance.z) / 10;
		
		if (delta > 0) {
			dx *= -1;
			dy *= -1;
			dz *= -1;
		}
		
		this.cameraPitch.position.set (
			Math.max (this.minModelCameraDistance.x,
				Math.min (this.maxModelCameraDistance.x, 
					this.cameraPitch.position.x + dx)),
			Math.max (this.minModelCameraDistance.y,
				Math.min (this.maxModelCameraDistance.y, 
					this.cameraPitch.position.y + dy)),
			Math.max (this.minModelCameraDistance.z,
				Math.min (this.maxModelCameraDistance.z, 
					this.cameraPitch.position.z + dz))
		);
		
	}
	
	this.animate = function (time) {
		this.velocity.x = 
			((this.velocity.x * this.velocityDecay)
			- ((this.move.left - this.move.right) * this.translationFactor))
			* time.delta * time.delta;
			
		this.velocity.z = 
			((this.velocity.z * this.velocityDecay)
			- ((this.move.forward - this.move.backward) * this.translationFactor))
			* time.delta * time.delta;
			
		this.modelYaw.translateX (this.velocity.x);	
		this.modelYaw.translateZ (this.velocity.z);
	}
	
	
	
}