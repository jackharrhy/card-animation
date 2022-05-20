import numToCard from "./numToCard";
import cardURLs from "./cardURLs";

const cardPrefix = "./cards/";

function vec3(x, y, z) {
  return { x: x, y: y, z: z };
}

function transformObj(obj, pos, posTime, rot, rotTime) {
  obj.rot = {
    x: obj.obj.rotation.x,
    y: obj.obj.rotation.y,
    z: obj.obj.rotation.z,
  };
  obj.tween.rot = new TWEEN.Tween(obj.rot).to(rot, rotTime);
  obj.tween.rot.onUpdate(function () {
    obj.obj.rotation.x = obj.rot.x;
    obj.obj.rotation.y = obj.rot.y;
    obj.obj.rotation.z = obj.rot.z;
  });
  obj.tween.rot.easing(TWEEN.Easing.Quadratic.InOut);
  obj.tween.rot.start();

  obj.tween.rot.active = true;
  setTimeout(function () {
    obj.tween.rot.active = false;
  }, rotTime);

  obj.pos = {
    x: obj.obj.position.x,
    y: obj.obj.position.y,
    z: obj.obj.position.z,
  };
  obj.tween.pos = new TWEEN.Tween(obj.pos).to(pos, posTime);
  obj.tween.pos.onUpdate(function () {
    obj.obj.position.x = obj.pos.x;
    obj.obj.position.y = obj.pos.y;
    obj.obj.position.z = obj.pos.z;
  });
  obj.tween.pos.easing(TWEEN.Easing.Quadratic.InOut);
  obj.tween.pos.start();

  obj.tween.pos.active = true;
  setTimeout(function () {
    obj.tween.pos.active = false;
  }, posTime);
}

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

const cards = [];

const state = {
  swirl: {
    init: () => {
      stateChangeAfterDelay(2000, state.swirl);
      forEachCard((i) => {
        action.center(1750);
      });
    },
    pos: (obj, i) => {
      if (!obj.consts.delay) {
        obj.obj.position.x +=
          Math.cos(frame / 50 - i / 1.2 + Math.random() / 10) / 20;
        obj.obj.position.y -=
          Math.sin(frame / 50 - i / 1.2 + Math.random() / 10) / 25;
        obj.obj.position.z += Math.sin(frame / 50 - i / 2) / 30;
      } else {
        obj.consts.delay -= 1;
        if (obj.consts.delay <= 0) {
          delete obj.consts.delay;
        }
      }
    },
    rot: (obj, i) => {
      if (!obj.consts.delay) {
        obj.obj.rotation.y += Math.cos(frame / 100 + i / 10) / 40;
        obj.obj.rotation.z += Math.cos(frame / 100 + i / 10) / 50;
        obj.obj.rotation.x += Math.cos(frame / 100 + i / 10) / 60;
      }
    },
  },
  static: {
    init: () => randomState(),
    pos: () => {},
    rot: () => {},
  },
};

const packGeometry = new THREE.BoxGeometry(0.8125, 1.25, 0.03);
const packTexture = new THREE.TextureLoader().load(cardPrefix + "pack.png");
const pack = {
  material: new THREE.MeshPhongMaterial({ color: 0xffffff, map: packTexture }),
};
pack.obj = new THREE.Mesh(packGeometry, pack.material);
pack.obj.position.z = 5;
scene.add(pack.obj);
pack.tween = {
  pos: { active: false },
  rot: { active: false },
};
pack.state = state.static;

function forEachCard(cb) {
  for (let i = 0; i < 52; i++) {
    cb(i);
  }
}

function stateChangeAfterDelay(delay, state) {
  forEachCard((i) => {
    cards[i].state = state;
  });
}

const action = {
  center: (time) => {
    forEachCard((i) => {
      transformObj(
        cards[i],
        vec3(0, 0, i / 52),
        time - 250,
        vec3(0, 0, 0),
        time
      );
    });
  },
  spread: (time) => {
    forEachCard((i) => {
      transformObj(
        cards[i],
        vec3(i / 7 - 3.5, Math.sin(i / (26 / Math.PI)), i / 52),
        time,
        vec3(0, 0, Math.PI / 1.5 + i / 24.8407),
        time - 500
      );
    });
  },
};

function timeout(time, postFunction) {
  setTimeout(postFunction, time);
}

timeout(1250, function () {
  transformObj(pack, vec3(0, 0, 0.5), 1000, vec3(0, 0, 0), 1000);

  timeout(1000, function () {
    transformObj(pack, vec3(0, -35, 0), 3000, vec3(Math.PI / 3, 0, 0), 3000);

    action.spread(5000);

    timeout(5000, function () {
      action.center(1500);

      timeout(1500, function () {
        forEachCard(function (i) {
          cards[i].consts.delay = i * 10;
          cards[i].state = state.swirl;
        });
      });
    });
  });
});

const cardGeometry = new THREE.BoxGeometry(0.65, 1, 0.03);
for (let i = 0; i < 52; i++) {
  const cardDes = numToCard(i);
  const cardTexture = new THREE.TextureLoader().load(
    cardPrefix + cardURLs[cardDes[0]][i - cardDes[1]]
  );

  cards[i] = {
    material: new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: cardTexture,
    }),
  };
  cards[i].obj = new THREE.Mesh(cardGeometry, cards[i].material);
  cards[i].tween = {
    pos: { active: false },
    rot: { active: false },
  };
  cards[i].state = state.static;
  cards[i].consts = {};

  scene.add(cards[i].obj);
}

const light = new THREE.AmbientLight(0xffffff);
light.position.z = 5;
scene.add(light);

let frame = -1;
const render = () => {
  frame++;
  renderer.render(scene, camera);

  requestAnimationFrame(render);

  if (!pack.tween.pos.active) {
    pack.state.pos(pack, 0);
  }
  if (!pack.tween.rot.active) {
    pack.state.rot(pack, 0);
  }

  forEachCard((i) => {
    if (!cards[i].tween.pos.active) {
      cards[i].state.pos(cards[i], i);
    }

    if (!cards[i].tween.rot.active) {
      cards[i].state.rot(cards[i], i);
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
