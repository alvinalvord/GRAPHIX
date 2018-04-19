var KizunaAiPath = 'json/model/kizunaai/';

function KizunaAi () {
	
	this.init = function (obj, fn, textureModifier = 'Basic') {
		let loader = new THREE.JSONLoader ();
		loader.load (
			KizunaAiPath + 'kizunaai.json',
			function (geometry, materials) {
				obj.model = new THREE.Mesh (
					geometry,
					KizunaAiMaterials (textureModifier)
				);
				
				obj.model.receiveShadow = true;
				
				fn ();
			}
		);
	}
	
	KizunaAiTextures = function () {
		let loader = new THREE.TextureLoader ();
		this.bottoms = loader.load (KizunaAiPath + 'bottoms.png');
		this.eye = loader.load (KizunaAiPath + 'eye.png');
		this.eye2 = loader.load (KizunaAiPath + 'eye2.png');
		this.face = loader.load (KizunaAiPath + 'face.png');
		this.hair1 = loader.load (KizunaAiPath + 'hair1.png');
		this.hair2 = loader.load (KizunaAiPath + 'hair2.png');
		this.tops = loader.load (KizunaAiPath + 'tops.png');
	}
	
	KizunaAiBasic = function () {
		let textures = new KizunaAiTextures ();
		
		this.bottoms = new THREE.MeshBasicMaterial 
			({map: textures.bottoms, transparent: true});
		this.eye = new THREE.MeshBasicMaterial 
			({map: textures.eye, transparent: true});
		this.eye2 = new THREE.MeshBasicMaterial 
			({map: textures.eye2, transparent: true});
		this.face = new THREE.MeshBasicMaterial 
			({map: textures.face, transparent: true});
		this.hair1 = new THREE.MeshBasicMaterial 
			({map: textures.hair1, transparent: true});
		this.hair2 = new THREE.MeshBasicMaterial 
			({map: textures.hair2, transparent: true});
		this.tops = new THREE.MeshBasicMaterial 
			({map: textures.tops, transparent: true});
	}
	
	KizunaAiPhysical = function () {
		let textures = new KizunaAiTextures ();
	
		this.bottoms = new THREE.MeshPhysicalMaterial 
		({
			map: textures.bottoms, 
			transparent: true,
			roughness: 1.0,
			reflectivity: 0.0,
			metalness: 0.0
		});
		this.eye = new THREE.MeshPhysicalMaterial 
		({
			map: textures.eye, 
			transparent: true,
			roughness: 1.0,
			reflectivity: 0.0,
			metalness: 0.0
		});
		this.eye2 = new THREE.MeshPhysicalMaterial 
		({
			map: textures.eye2, 
			transparent: true,
			roughness: 1.0,
			reflectivity: 0.0,
			metalness: 0.0
		});
		this.face = new THREE.MeshPhysicalMaterial 
		({
			map: textures.face, 
			transparent: true,
			roughness: 1.0,
			reflectivity: 0.0,
			metalness: 0.0
		});
		this.hair1 = new THREE.MeshPhysicalMaterial 
		({
			map: textures.hair1, 
			transparent: true,
			roughness: 1.0,
			reflectivity: 0.0,
			metalness: 0.0
		});
		this.hair2 = new THREE.MeshPhysicalMaterial 
		({
			map: textures.hair2, 
			transparent: true,
			roughness: 1.0,
			reflectivity: 0.0,
			metalness: 0.0
		});
		this.tops = new THREE.MeshPhysicalMaterial 
		({
			map: textures.tops, 
			transparent: true,
			roughness: 1.0,
			reflectivity: 0.0,
			metalness: 0.0
		});
	}

	KizunaAiMaterials = function (textureModifier) {
		var textures;
	
		if (textureModifier === 'Basic')
			textures = new KizunaAiBasic ();
		else if (textureModifier === 'Physical')
			textures = new KizunaAiPhysical ();
	
		var materials = [];
		materials.push (textures.eye);
		materials.push (textures.bottoms);
		materials.push (textures.hair1);
		materials.push (textures.bottoms);
		materials.push (textures.tops);
		materials.push (textures.hair2);
		materials.push (textures.face);
		materials.push (textures.face);
		materials.push (textures.face);
		materials.push (textures.face);
		materials.push (textures.eye2);
		
		return materials;
	}

}
