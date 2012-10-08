			

	var container, stats;

	var camera, scene, renderer;

	var mapC;

	var group;
	var time = 0;

	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

			
	function mainspr()
	{
		init();
		animate();
	}
	
	
	function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = 1500;

	scene = new THREE.Scene();

	// create sprites

	var amount = 200;
	var radius = 500;
	var mapA = THREE.ImageUtils.loadTexture( "checkerboard.jpg" );
	var mapB = THREE.ImageUtils.loadTexture( "checkerboard.jpg" );
	mapC = THREE.ImageUtils.loadTexture( "checkerboard.jpg" );

	// add 2d-sprites

	sprite = new THREE.Sprite( { map: mapA, alignment: THREE.SpriteAlignment.topLeft } );
	sprite.position.set( 200, 200, 3 );
	sprite.opacity = 1;
	scene.add( sprite );

	// renderer

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColorHex( 0x000000, 1 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );

	// stats

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	time += 0.02;

	renderer.render( scene, camera );

}