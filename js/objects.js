function createFloor () {
	let loader = new THREE.TextureLoader ();
	var grass = loader.load ('textures/grass.jpg');
	grass.wrapS = grass.wrapT = THREE.RepeatWrapping;
	grass.repeat.set (256, 256);
	grass.anisotropy = 16;
	var f = new THREE.Mesh (
		new THREE.CylinderGeometry (600, 600, 5, 128, 128),
		new THREE.MeshPhysicalMaterial (
			{
				map: grass,
				side: THREE.DoubleSide,
				roughness: 1.0,
				reflectivity: 0.0,
				metalness: 0.0
			}
		)
	);

	f.position.y = -2.5;
	f.receiveShadow = true;
	
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

function createTrees () {
	let loader = new THREE.JSONLoader ();
	loader.load (
		'json/model/tree.json',
		function (geometry, materials) {
			var t = new THREE.Mesh (
				geometry, 
				materials
			);
			t.scale.multiplyScalar (30);
			t.position.set (0, 0, -400);
	
			scene.add (t);
			
			for (var i = 0; i < 50; i++) {
				t = new THREE.Mesh (
					geometry, 
					materials
				);
				t.scale.multiplyScalar (Math.random () * 5);
				while (Math.abs (t.position.x) + Math.abs (t.position.z) < 50) {
					t.position.set (Math.random () * 600 - 300, 0, Math.random () * 600 - 300);
				}
				scene.add (t);
			}
		}
	);
}

function createMeteor () {
	var g = new THREE.SphereGeometry (5, 32, 32);
	var m = new THREE.MeshPhysicalMaterial ({
		color: 0xf43054,
		side: THREE.DoubleSide,
		roughness: 1.0,
		reflectivity: 0.0,
		metalness: 0.0
	});
	
	var me = new THREE.Mesh (g, m);
	me.position.set (Math.random () * 600 - 300, 1000, Math.random () * 600 -300);
	
	scene.add (me);
	meteors.push (me);
}

function updateMeteors () {
	for (var i = 0; i < meteors.length; i++) {
		meteors[i].translateY (Gravity * 10 * time.delta);
		// console.log (meteors[0].position.y);
		if (meteors[i].position.y < -100) {
			scene.remove (meteors[i]);
		}
	}
}


