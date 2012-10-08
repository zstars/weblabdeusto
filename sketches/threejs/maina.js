			
			var AMOUNT = 100;

			var container, stats;

			var camera, scene, renderer;

			var video, image, imageContext,
			imageReflection, imageReflectionContext, imageReflectionGradient,
			texture, textureReflection;

			var mesh;

			var mouseX = 0;
			var mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			
			
			var bgCamera, bgScene, bgRenderer, bgMesh, bgParticle;

			var sprSprite;
			var sprTexture;
				
				
			function maina() {
				init();
				animate();
			}

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="http://github.com/mrdoob/three.js" target="_blank">three.js</a> - video demo. playing <a href="http://durian.blender.org/" target="_blank">sintel</a> trailer';
				container.appendChild( info );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
				//camera = new THREE.OrthographicCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
				//camera = new THREE.Camera(1, 1000);
				camera.position.z = 1000;
				
				
				// Create the background camera.
				bgCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000 );
				

				scene = new THREE.Scene();
				
				bgScene = new THREE.Scene();
				
				

				video = document.getElementById( 'video' );
				
				var v2 = document.getElementById('video_directo');
				var img2 = document.createElement('canvas');
				img2.width = 480;
				img2.height = 204;
				
				var imgContext2 = img2.getContext('2d');
				imgContext2.fillStyle = '#001100';
				imgContext2.fillRect( 0, 0, 480, 204 );
				
				var texture2 = new THREE.Texture(img2);
				texture2.minFilter = THREE.LinearFilter;
				texture2.magFilter = THREE.LinearFilter;
				
				var material2 = new THREE.MeshBasicMaterial( { map:texture, overdraw:true } );

				//

				image = document.createElement( 'canvas' );
				image.width = 480;
				image.height = 204;

				imageContext = image.getContext( '2d' );
				imageContext.fillStyle = '#000000';
				imageContext.fillRect( 0, 0, 480, 204 );

				texture = new THREE.Texture( image );
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;

				var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );

				imageReflection = document.createElement( 'canvas' );
				imageReflection.width = 480;
				imageReflection.height = 204;

				imageReflectionContext = imageReflection.getContext( '2d' );
				imageReflectionContext.fillStyle = '#000000';
				imageReflectionContext.fillRect( 0, 0, 480, 204 );

				imageReflectionGradient = imageReflectionContext.createLinearGradient( 0, 0, 0, 204 );
				imageReflectionGradient.addColorStop( 0.2, 'rgba(240, 240, 240, 1)' );
				imageReflectionGradient.addColorStop( 1, 'rgba(240, 240, 240, 0.8)' );

				textureReflection = new THREE.Texture( imageReflection );
				textureReflection.minFilter = THREE.LinearFilter;
				textureReflection.magFilter = THREE.LinearFilter;

				var materialReflection = new THREE.MeshBasicMaterial( { map: textureReflection, side: THREE.BackSide, overdraw: true } );

				//
				

				var plane = new THREE.PlaneGeometry( 480, 204, 4, 4 );

				mesh = new THREE.Mesh( plane, material );
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
				//scene.add(mesh);

				mesh = new THREE.Mesh( plane, materialReflection );
				mesh.position.y = -306;
				mesh.rotation.x = - Math.PI;
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
				//scene.add( mesh );
				
				// Create the background mesh
				bgMesh = new THREE.Mesh(
					new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 0, 0),
					new THREE.MeshBasicMaterial({map: texture2, overdraw:true})
					//new THREE.MeshBasicMaterial( { color: 0x8833ff } ) 
					//material
				);
				
				bgMesh.scale.x = bgMesh.scale.y = bgMesh.scale.z = 1.5;
				scene.add(bgMesh);
				//bgScene.add(bgCamera);
				//bgScene.add(bgMesh);
				
				// Sprite related logic
				//sprTexture = THREE.ImageUtils.loadTexture( "http://i20.photobucket.com/albums/b228/isamarsuperman/checkerboard.jpg" );
				
				//image = document.createElement( 'img' );
				//image.src = "http://i20.photobucket.com/albums/b228/isamarsuperman/checkerboard.jpg";
				//image.src = "checkerboard.jpg";

				var texture = new THREE.Texture( image );
				texture.needsUpdate = true;
				
				//var mapA = THREE.ImageUtils.loadTexture("http://mrdoob.github.com/three.js/examples/textures/sprite0.png");
				
				//sprSprite = new THREE.Sprite( { map: sprTexture, useScreenCoordinates: true, color: 0xff50ff } );

				//sprSprite.position.set( 500,
				//					 500,
				//					 500 );

				//sprSprite.scale.x = sprSprite.scale.y = 2000

				//scene.add( sprSprite );
				
				var mapA = THREE.ImageUtils.loadTexture( "checkerboard.jpg" );
				var mapB = THREE.ImageUtils.loadTexture( "checkerboard_red.jpg" );
				sprSprite = new THREE.Sprite( { map: texture, useScreenCoordinates:true, color:0xffffff } );
				sprSprite.position.set( 400, 250, 0 );
				sprSprite.opacity = 1;
				sprSprite.scale.x = 1;
				sprSprite.scale.y = 1;
				bgScene.add( sprSprite );
				
				bgParticle = new THREE.Particle( { map: texture, useScreenCoordinates:true, color:0xffffff} );
				bgParticle.position.set( 400, 250, 0 );
				bgParticle.scale.x = bgParticle.scale.y = 100;
				bgScene.add(bgParticle);
				
				
				// create sprites

				var amount = 200;
				var radius = 500;
				var mapA = THREE.ImageUtils.loadTexture( "checkerboard.jpg" );
				var mapB = THREE.ImageUtils.loadTexture( "checkerboard.jpg" );
				mapC = THREE.ImageUtils.loadTexture( "checkerboard.jpg" );

				// add 2d-sprites

				sprite = new THREE.Sprite( { map: texture, alignment: THREE.SpriteAlignment.topLeft } );
				sprite.position.set( 200, 200, 3 );
				sprite.opacity = 1;
				//scene.add( sprite );
				

				//

				var separation = 150;
				var amountx = 10;
				var amounty = 10;

				var PI2 = Math.PI * 2;
				var material = new THREE.ParticleCanvasMaterial( {

					color: 0x0808080,
					program: function ( context ) {

						context.beginPath();
						context.arc( 0, 0, 1, 0, PI2, true );
						context.closePath();
						context.fill();

					}

				} );

				for ( var ix = 0; ix < amountx; ix++ ) {

					for ( var iy = 0; iy < amounty; iy++ ) {

						particle = new THREE.Particle( material );
						particle.position.x = ix * separation - ( ( amountx * separation ) / 2 );
						particle.position.y = -153
						particle.position.z = iy * separation - ( ( amounty * separation ) / 2 );
						scene.add( particle );

					}

				}

				//renderer = new THREE.WebGLRenderer();
				renderer = new THREE.CanvasRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild( renderer.domElement );

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );


			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY ) * 0.2;

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				//camera.lookAt( scene.position );
				
				var v = new THREE.Vector3(200, 200, 3);
				camera.lookAt(v);

				if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

					imageContext.drawImage( video, 0, 0, 600, 400 );

					if ( texture ) texture.needsUpdate = true;
					if ( textureReflection ) textureReflection.needsUpdate = true;

				}

				//imageReflectionContext.drawImage( image, 0, 0 );
				//imageReflectionContext.fillStyle = imageReflectionGradient;
				//imageReflectionContext.fillRect( 0, 0, 480, 204 );

				renderer.autoClear = false;
				renderer.clear();
				
				bgCamera.lookAt(bgParticle.position);

				renderer.render( scene, camera );
				renderer.render( bgScene, bgCamera);



			}