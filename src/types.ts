import type { Tween } from "@tweenjs/tween.js";

export type Vec3 = { x: number; y: number; z: number };

export type State = {
  init: (obj: Object, i: number) => void;
  pos: (obj: Object, i: number) => void;
  rot: (obj: Object, i: number) => void;
};

export type Object = {
  id: string;
  material: THREE.MeshPhongMaterial;
  obj: THREE.Mesh;
  rot: Vec3;
  pos: Vec3;
  tween: {
    pos?: Tween<Vec3>;
    posActive: boolean;
    rot?: Tween<Vec3>;
    rotActive: boolean;
  };
  state: State;
  consts: {
    delay?: number;
  };
};
