var pointerControls;
var gameStart = false;
var spawnStart = false;
var spawnTime;
var totalTime = 0;
var counter = 0;

window.onload = function () {
	globalInit ();
	
	if (!pointerLockAvailable)
		return;
	
	var kizunaAiModel = new KizunaAi ();
	kizunaAiModel.init (player, function () {
		player.init ();
		
		render();
		
	}, 'Physical');
}
