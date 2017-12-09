function randInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function vec3(x, y, z) {
  return { x: x, y: y, z: z };
}

function transformObj(obj, pos, posTime, rot, rotTime) {
  obj.rot = { x: obj.obj.rotation.x, y: obj.obj.rotation.y, z: obj.obj.rotation.z };
  obj.tween.rot = new TWEEN.Tween(obj.rot).to(rot, rotTime);
  obj.tween.rot.onUpdate(function () {
    obj.obj.rotation.x = obj.rot.x;
    obj.obj.rotation.y = obj.rot.y;
    obj.obj.rotation.z = obj.rot.z;
  });
  obj.tween.rot.easing(TWEEN.Easing.Quadratic.InOut)
  obj.tween.rot.start();

  obj.tween.rot.active = true;
  setTimeout(function () {
    obj.tween.rot.active = false;
  }, rotTime)

  obj.pos = { x: obj.obj.position.x, y: obj.obj.position.y, z: obj.obj.position.z };
  obj.tween.pos = new TWEEN.Tween(obj.pos).to(pos, posTime);
  obj.tween.pos.onUpdate(function () {
    obj.obj.position.x = obj.pos.x;
    obj.obj.position.y = obj.pos.y;
    obj.obj.position.z = obj.pos.z;
  });
  obj.tween.pos.easing(TWEEN.Easing.Quadratic.InOut)
  obj.tween.pos.start();

  obj.tween.pos.active = true;
  setTimeout(function () {
    obj.tween.pos.active = false;
  }, posTime)
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x003831, 1);
document.body.appendChild(renderer.domElement);

var cards = [];

var state = {
  swirl: {
    pos: function (obj, i) {
      if(!obj.vars.delay) {
        obj.obj.position.x += (Math.cos(frame / 50 - i / 1.2 + Math.random() / 10) / 20);
        obj.obj.position.y -= (Math.sin(frame / 50 - i / 1.2 + Math.random() / 10) / 25);
        obj.obj.position.z += (Math.sin(frame / 50 - i / 2) / 30);
      } else {
        obj.vars.delay -= 1;
        if(obj.vars.delay <= 0) {
          delete obj.vars.delay;
        }
      }
    },
    rot: function (obj, i) {
      if(!obj.vars.delay) {
        obj.obj.rotation.y += (Math.cos(frame / 100 + i / 10) / 40);
        obj.obj.rotation.z += (Math.cos(frame / 100 + i / 10) / 50);
        obj.obj.rotation.x += (Math.cos(frame / 100 + i / 10) / 60);
      }
    }
  },
  static: {
    pos: function (obj, i) { },
    rot: function (obj, i) { }
  }
};

var packGeometry = new THREE.BoxGeometry(0.8125, 1.25, 0.03);
var packTexture = new THREE.TextureLoader().load(cardPrefix + 'pack.png');
var pack = {
  material: new THREE.MeshPhongMaterial({ color: 0xffffff, map: packTexture })
};
pack.obj = new THREE.Mesh(packGeometry, pack.material);
pack.obj.position.z = 5;
scene.add(pack.obj);
pack.tween = {
  pos: { active: false },
  rot: { active: false }
};
pack.state = state.static;

setTimeout(function() {
  transformObj(pack,
    vec3(0,0,0.5), 1000,
    vec3(0,0,0), 1000
  );
  setTimeout(function() {
    forEachCard(function(i) {
      transformObj(cards[i],
        vec3(i/7 - 3.5,Math.sin(i / (26/Math.PI)),i/52), 5000,
        vec3(0,0,(Math.PI/1.5) + i/24.8407), 4250
      );
      setTimeout(function() {
        forEachCard(function(i) {
          transformObj(cards[i],
            vec3(0,0,i/52), 1000,
            vec3(0,0,0), 1250
          );
        });

        setTimeout(function() {
          forEachCard(function(i){
            cards[i].vars.delay = i * 10;
            cards[i].state = state.swirl;
          });
        }, 1500);
      }, 5000);
    });

    transformObj(pack,
      vec3(0,-35,0), 3000,
      vec3(Math.PI/3,0,0),3000,
    );
  }, 1000);
}, 1250);

var cardGeometry = new THREE.BoxGeometry(0.65, 1, 0.03);
for (var i = 0; i < 52; i++) {
  var cardDes = numToCard(i);
  var cardTexture = new THREE.TextureLoader().load(cardPrefix + cardURLs[cardDes[0]][i - cardDes[1]]);

  cards[i] = {
    material: new THREE.MeshPhongMaterial({ color: 0xffffff, map: cardTexture })
  };
  cards[i].obj = new THREE.Mesh(cardGeometry, cards[i].material);
  cards[i].tween = {
    pos: { active: false },
    rot: { active: false }
  };
  cards[i].state = state.static;
  cards[i].vars = {};

  scene.add(cards[i].obj);
}

var light = new THREE.AmbientLight(0xffffff);
light.position.z = 5;
scene.add(light);

function forEachCard(cb) {
  for (var i = 0; i < 52; i++) {
    cb(i);
  }
}

forEachCard(function(i) {
  //transformCard(cards[i], vec3(0, 0, 0), 1000, vec3(0, 0, 0), 1000);
});

var frame = -1;
var render = function () {
  frame++;
  renderer.render(scene, camera);

  requestAnimationFrame(render);

  if(!pack.tween.pos.active) {
    pack.state.pos(pack, 0);
  }
  if(!pack.tween.rot.active) {
    pack.state.rot(pack, 0);
  }

  forEachCard(function (i) {
    if(!cards[i].tween.pos.active) {
      cards[i].state.pos(cards[i], i);
    }

    if(!cards[i].tween.rot.active) {
      cards[i].state.rot(cards[i], i);
    }
  });

  TWEEN.update();
};

render();
