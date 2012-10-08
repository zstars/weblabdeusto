			
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
				
			var bg;
			var bgCam;
			var bgScene;

				
			function mainc() {
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
				//camera = new THREE.Camera();
				
				camera.position.z = 1000;

				scene = new THREE.Scene();

				video = document.getElementById( 'video' );

				image = document.createElement( 'canvas' );
				image.width = 480;
				image.height = 204;

				imageContext = image.getContext( '2d' );
				imageContext.fillStyle = '#000000';
				imageContext.fillRect( 0, 0, 480, 204 );

				texture = new THREE.Texture( image );
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				
				
				bg = new THREE.Mesh(
					new THREE.PlaneGeometry(480, 204, 4, 4),
					new THREE.MeshBasicMaterial({map: texture, overdraw:true})
					//new THREE.MeshBasicMaterial( { color: 0x8833ff } ) 
				);
				
				// The bg plane shouldn't care about the z-buffer.
				//bg.material.depthTest = false;
				//bg.material.depthWrite = false;

				var al = new THREE.AmbientLight(0x111111);
				bgScene = new THREE.Scene();
				bgCam = new THREE.Camera();
				bgScene.add(camera);
				bgScene.add(bg);
				bgScene.add(al);
				
				bgCam.lookAt(bg.position);
				
				alert("Initialized");
				

				var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );

				var plane = new THREE.PlaneGeometry( 480, 204, 4, 4 );

				mesh = new THREE.Mesh( plane, material );
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
				scene.add(mesh);

				//mesh = new THREE.Mesh( plane, materialReflection );
				//mesh.position.y = -306;
				//mesh.rotation.x = - Math.PI;
				//mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
				//scene.add( mesh );

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

				renderer = new THREE.CanvasRenderer();
				renderer.setClearColorHex(0xff0000, 0.5);
				renderer.setSize( window.innerWidth, window.innerHeight );
				
				// Doesn't work
				//renderer.setClearColorHex(0xA00000, 0);

				container.appendChild( renderer.domElement );

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

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

				//camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				//camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				camera.lookAt( scene.position );

				if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

					imageContext.drawImage( video, 0, 0, 600, 400 );

					if ( texture ) texture.needsUpdate = true;
					//if ( textureReflection ) textureReflection.needsUpdate = true;

				}

				//imageReflectionContext.drawImage( image, 0, 0 );
				//imageReflectionContext.fillStyle = imageReflectionGradient;
				//imageReflectionContext.fillRect( 0, 0, 480, 204 );

				renderer.autoClear = false;
				renderer.clear();
				
				//renderer.render(bgScene, bgCam);
				renderer.render( scene, camera );

			}