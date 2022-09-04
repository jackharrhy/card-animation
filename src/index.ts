import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import type { Object } from "./types";
import cardURLs from "./cardURLs";
import state from "./state";
import { forEachCard, numToCard, timeout, vec3 } from "./utils";
import { states } from "./states";
import { transformObj } from "./transformObj";
import { action } from "./actions";

const cardPrefix = "./cards/";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x003831, 1);
document.body.appendChild(renderer.domElement);

const packGeometry = new THREE.BoxGeometry(0.8125, 1.25, 0.03);
const packTexture = new THREE.TextureLoader().load(cardPrefix + "pack.png");
const packMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: packTexture,
});
const packObj = new THREE.Mesh(packGeometry, packMaterial);
packObj.position.z = 5;
scene.add(packObj);

const pack: Object = {
  id: "pack",
  material: packMaterial,
  obj: packObj,
  pos: vec3(0, 0, 0),
  rot: vec3(0, 0, 0),
  tween: {
    posActive: false,
    rotActive: false,
  },
  state: states.static,
  consts: {},
};

timeout(1250, function () {
  transformObj(pack, vec3(0, 0, 0.5), 1000, vec3(0, 0, 0), 1000);

  timeout(1000, function () {
    transformObj(pack, vec3(0, -35, 0), 3000, vec3(Math.PI / 3, 0, 0), 3000);

    action.spread(5000);

    timeout(5000, function () {
      action.center(1500);

      timeout(1500, function () {
        forEachCard(function (i) {
          state.cards[i].consts.delay = i * 10;
          state.cards[i].state = states.swirl;
        });
      });
    });
  });
});

const cardGeometry = new THREE.BoxGeometry(0.65, 1, 0.03);
for (let i = 0; i < 52; i++) {
  const cardDes = numToCard(i);
  const cardTexture = new THREE.TextureLoader().load(
    cardPrefix + cardURLs[cardDes[0] as keyof typeof cardURLs][i - cardDes[1]]
  );
  const cardMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: cardTexture,
  });

  const card: Object = {
    id: `card-${i}`,
    material: cardMaterial,
    obj: new THREE.Mesh(cardGeometry, cardMaterial),
    rot: vec3(0, 0, 0),
    pos: vec3(0, 0, 0),
    tween: {
      posActive: false,
      rotActive: false,
    },
    state: states.static,
    consts: {},
  };

  state.cards.push(card);
  scene.add(card.obj);
}

const light = new THREE.AmbientLight(0xffffff);
light.position.z = 5;
scene.add(light);

const render = () => {
  state.frame++;
  renderer.render(scene, camera);

  requestAnimationFrame(render);

  if (!pack.tween.posActive) {
    pack.state.pos(pack, 0);
  }
  if (!pack.tween.rotActive) {
    pack.state.rot(pack, 0);
  }

  forEachCard((i) => {
    if (!state.cards[i].tween.posActive) {
      state.cards[i].state.pos(state.cards[i], i);
    }

    if (!state.cards[i].tween.rotActive) {
      state.cards[i].state.rot(state.cards[i], i);
    }
  });

  TWEEN.update();
};

render();

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);
