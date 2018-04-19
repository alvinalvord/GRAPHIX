function createFloor () {
	var f = new THREE.Mesh (
		new THREE.BoxGeometry (1000, 1000, 5),
		new THREE.MeshPhysicalMaterial (
			{
				color: 0x99d15e,
				side: THREE.DoubleSide,
				roughness: 1.0,
				reflectivity: 0.0,
				metalness: 0.0
			}
		)
	);

	f.position.y = -2.5;
	f.rotation.x = -PI_2;
	f.receiveShadow = true;
	
	// var a = new THREE.Object3D ();
	
	// a.add (f);
	
	// var b = new THREE.Mesh (new THREE.BoxGeometry (10,10,1), new THREE.MeshPhysicalMaterial ({color: 0xff0000, side: THREE.DoubleSide}));
	// a.add (b);
	// b.position.y = -0.49;
	// b.rotation.x = PI_2;
	
	return f;
}

function createSun () {
	var sun = {
		light: new THREE.DirectionalLight (0xffffff, 0.5),
		alpha: 0.00,
		beta: Math.PI * -0.5,
		pos: 0.00,
		counter: 0.00,
		posinc: function () {
			if (this.pos <= -1.00)
				this.pos += 1;
			
			this.pos -= 0.0001;
		},
		update: function () {
			this.posinc ();
			this.alpha = Math.PI * this.pos * 2;
			
			this.light.position.set (
				1000 * Math.cos (this.alpha),
				1000 * Math.sin (this.alpha) * Math.sin (this.beta),
				1000 * Math.sin (this.alpha) * Math.cos (this.beta)
			);
		}
	};
	
	sun.light.castShadow = true;
	sun.light.shadow.camera.far = 10000;
	
	sun.update ();
	// var helper = new THREE.CameraHelper( sun.light.shadow.camera );
	// scene.add( helper );
	
	return sun;
}

function createSky (sun) {
	var s = new THREE.Sky ();
	s.scale.setScalar (5000);
	s.material.uniforms.turbidity.value = 6;
	s.material.uniforms.rayleigh.value = 6;
	s.material.uniforms.luminance.value = 1;
	s.material.uniforms.mieCoefficient.value = 0.025;
	s.material.uniforms.mieDirectionalG.value = 0.7;
	s.material.uniforms.sunPosition.value = sun.position.copy (sun.position);
	
	return s;
}

function createStars () {
	var stars = new THREE.Object3D ();
	var g = new THREE.SphereGeometry (1, 32, 32);
	var m = new THREE.MeshPhysicalMaterial ({
		color: 0xffffff,
		emissive: 0xffffff,
		side: THREE.DoubleSide,
		roughness: 1.0,
		reflectivity: 0.0,
		metalness: 0.0
	});
	
	var rand = function () {
		return Math.random () * 2000;
	}
	
	var makeStar = function (x, y, z) {
		var s = new THREE.Mesh (g, m);
		s.position.set (x, y, z);
		s.receiveShadow = false;
		s.castShadow = false;
		
		return s;
	}
	
	for (var i = 0; i < 175; i++) {
		stars.add (makeStar (1000, rand () - 1000, rand () - 1000));
		stars.add (makeStar (-1000, rand () - 1000, rand () - 1000));
		stars.add (makeStar (rand () - 1000, 1000, rand () - 1000));
		stars.add (makeStar (rand () - 1000, -1000, rand () - 1000));
		stars.add (makeStar (rand () - 1000, rand () - 1000, 1000));
		stars.add (makeStar (rand () - 1000, rand () - 1000, -1000));
	}
	
	return stars;
}
