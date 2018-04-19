var pointerControls;

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
