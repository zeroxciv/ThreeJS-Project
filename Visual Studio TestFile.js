// JavaScript source code



$(function () {

    var stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();

    var orbitGroup = new THREE.Object3D();
    scene.add(orbitGroup);
    orbitGroup.add(camera);

    var robotGroup = new THREE.Object3D();
    scene.add(robotGroup);
    robotGroup.add(camera);




    var controls = new function () {
        this.height = camera.position.y;
        this.orbitAngle = 0;
        this.cameraAngle = 0;
        this.x = camera.position.x;
        this.z = camera.position.z;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'x').listen();
    gui.add(controls, 'height').listen();
    gui.add(controls, 'z').listen();
    gui.add(controls, 'orbitAngle').listen();
    gui.add(controls, 'cameraAngle').listen();

    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;




    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;

    // add the plane to the scene
    scene.add(plane);
    {
        // create a cube
        var cubeGeometry1 = new THREE.CubeGeometry(4, 4, 4);
        var cubeMaterial1 = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        var cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
        cube1.castShadow = true;

        // position the cube
        cube1.position.x = -1;
        cube1.position.y = 3;

        // create a cube
        var cubeGeometry2 = new THREE.CubeGeometry(4, 4, 4);
        var cubeMaterial2 = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        var cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
        cube2.castShadow = true;

        // position the cube
        cube2.position.x = -2;
        cube2.position.y = 3;

        // create a cube
        var cubeGeometry3 = new THREE.CubeGeometry(4, 4, 4);
        var cubeMaterial3 = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        var cube3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3);
        cube3.castShadow = true;

        // position the cube
        cube3.position.x = -6;
        cube3.position.y = 3;

        // create a cube
        var cubeGeometry4 = new THREE.CubeGeometry(4, 4, 4);
        var cubeMaterial4 = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        var cube4 = new THREE.Mesh(cubeGeometry4, cubeMaterial4);
        cube4.castShadow = true;

        // position the cube
        cube4.position.x = 0;
        cube4.position.y = 3;



    }

    {
        // add the cube to the scene
        scene.add(cube1);
        scene.add(cube2);
        scene.add(cube3);
        scene.add(cube4);

        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphere.position.z = 2;
        sphere.castShadow = true;

        // add the sphere to the scene
        scene.add(sphere);

        // position and point the camera to the center of the scene
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);

        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);
    }

    // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);

    var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    // call the render function
    var angle = 0;
    render();

    function render() {

        stats.update();
        // rotate the cube around its axes
        cube1.rotation.x += controls.rotationSpeed;
        cube1.rotation.y += controls.rotationSpeed;
        cube1.rotation.z += controls.rotationSpeed;

        cube2.rotation.x += controls.rotationSpeed;
        cube2.rotation.y += controls.rotationSpeed;
        cube2.rotation.z += controls.rotationSpeed;

        cube3.rotation.x += controls.rotationSpeed;
        cube3.rotation.y += controls.rotationSpeed;
        cube3.rotation.z += controls.rotationSpeed;

        cube4.rotation.x += controls.rotationSpeed;
        cube4.rotation.y += controls.rotationSpeed;
        cube4.rotation.z += controls.rotationSpeed;

        // bounce the sphere up and down
        angle += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(angle)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(angle)));

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function initStats() {

        var stats = new Stats();

        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        $("#Stats-output").append(stats.domElement);

        return stats;
    }


});