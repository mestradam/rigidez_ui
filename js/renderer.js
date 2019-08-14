//COLORS
var Colors = {
  node:0x359245,
  floor:0x898989,
  element:0x0a509e,
  elementExtruded:0x70aedc,
};

// THREEJS RELATED VARIABLES

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

//SCREEN & MOUSE VARIABLES

var height, width, controls;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

  height = window.innerHeight;
  width = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = width / height;
  fieldOfView = 60;
  nearPlane = 0.1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
  camera.position.x = 0;
  camera.position.y = 10;
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, container);
  controls.target.set(0, 0, 0);
  controls.update();

  window.addEventListener('resize', handleWindowResize, false);
}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
  height = window.innerHeight;
  width = window.innerWidth;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}


// LIGHTS

var hemisphereLight, light;

function createLights() {

  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x090909, 0.8);
  light = new THREE.DirectionalLight(0xffffff, 0.9);
  light.position.set(150, 350, 350);

  scene.add(hemisphereLight);
  scene.add(light);
}

// HELPERS

var size = 10;
var divisions = 10;

function createGrid(){

  var grid = new THREE.GridHelper(size, divisions, 0x444444, 0x999999);
  scene.add(grid);

}

function createAxes(){

  var axes = new THREE.AxesHelper(1);
  scene.add(axes);

}

// RENDER FUNCTIONS

function loop(){
  updateModel();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function updateModel(){
  // Put anything to update at every time frame. For example animations.
}

function init(event){
  createScene();
  createLights();
  createGrid();
  createAxes();
  // createFloor(20, 12);
  createMesh();
  loop();
}


window.addEventListener('load', init, false);


////////////////////////////////////////////////////////////////////////////////
// 3D MODELS

var floor, mesh;

function createFloor(a, b){
  var geom = new THREE.BoxGeometry(a, 0.1, b);
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.floor,
    transparent: true,
    opacity: 0.6
  });
  floor = new THREE.Mesh(geom, mat);
  floor.receiveShadow = true;
  floor.position.y = -0.05;
  scene.add(floor);
}

function createElement(ni, nj){
  var mat = new THREE.LineBasicMaterial({
    color: Colors.element,
    linewidth: 3
  });
  var geom = new THREE.Geometry();
  geom.vertices.push(ni);
  geom.vertices.push(nj);
  var element = new THREE.Line(geom, mat);
  return element;
}

function createNode(ni){
  var mat = new THREE.PointsMaterial({
    color: Colors.node,
    size: 0.5
  });
  var geom = new THREE.Geometry();
  geom.vertices.push(ni);
  var node = new THREE.Points(geom, mat);
  return node;
}

function createMesh(){
  mesh = new THREE.Object3D();
}

// User functions (to be used in chrome console)

function node(coord){
  var n = new THREE.Vector3(coord[0], coord[1], coord[2]);
  var newNode = createNode(n);
  mesh.add(newNode);
  scene.add(mesh);
}

function elem(coord1, coord2){
  var n1 = new THREE.Vector3(coord1[0], coord1[1], coord1[2]);
  var n2 = new THREE.Vector3(coord2[0], coord2[1], coord2[2]);
  var newElem = createElement(n1, n2);
  mesh.add(newElem);
  scene.add(mesh);
}

function loadFile(fileId){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = fileId;
  document.body.appendChild(script);
}
