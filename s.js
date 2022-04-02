
    import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
    import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";


    const canvas = document.querySelector('#cnvs');
    let canvasW = window.innerWidth
    let canvasH = window.innerHeight

    const scene = new THREE.Scene()

    function loadTexture(file) {
        return new THREE.TextureLoader().load(file)
    }

    function createLink(side) {
        return `https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/purplenebula/purplenebula_${side}.png`;
    }


    let textureArray = [
        loadTexture(createLink('ft')),
        loadTexture(createLink('bk')),
        loadTexture(createLink('up')),
        loadTexture(createLink('dn')),
        loadTexture(createLink('rt')),
        loadTexture(createLink('lf')),
        ]

    let materialArray = textureArray.map(texture => {
        return new THREE.MeshBasicMaterial({
            map: texture
        })
    })



    for (let i = 0; i < 6; i++) {
        materialArray[i].side = THREE.BackSide;
    }
    let skyboxGeo = new THREE.BoxGeometry(50, 50, 50);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);



    let earthTexture = loadTexture('https://dl.dropbox.com/s/g0uqua8h9ettfvi/2k_earth_daymap.jpg?dl=0');
    const eartGeo = new THREE.SphereGeometry(1, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({ map: earthTexture })
    const earth = new THREE.Mesh(eartGeo, earthMat);
    scene.add(earth);
    earth.rotateZ(.35)

    const camera = new THREE.PerspectiveCamera(
        50, canvasW / canvasH, .1, 100);
    camera.position.x = -5

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.minDistance = 2
    controls.maxDistance = 30
    controls.update();


    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(-20, 0, 0)
    scene.add(directionalLight);


    window.addEventListener('resize', () => {
        canvasW = window.innerWidth
        canvasH = window.innerHeight
        renderer.setSize(canvasW, canvasH);
        camera.aspect = canvasW / canvasH;
        camera.updateProjectionMatrix();
    })

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasW, canvasH);
    renderer.physicallyCorrectLights =true
    renderer.shadowMap.enabled =true
    renderer.shadowMapSoft = true;


    function render() {
        renderer.render(scene, camera);
        controls.update();
        earth.rotateY(0.01)
        requestAnimationFrame(render);
    }
    render();