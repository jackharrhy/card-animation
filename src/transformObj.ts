import { Easing, Tween } from "@tweenjs/tween.js";
import type { Vec3, Object } from "./types";

export function transformObj(
  obj: Object,
  pos: Vec3,
  posTime: number,
  rot: Vec3,
  rotTime: number
) {
  obj.rot = {
    x: obj.obj.rotation.x,
    y: obj.obj.rotation.y,
    z: obj.obj.rotation.z,
  };
  const rotTween = new Tween(obj.rot).to(rot, rotTime);
  rotTween.easing(Easing.Quadratic.InOut);
  rotTween.onUpdate(function () {
    obj.obj.rotation.x = obj.rot.x;
    obj.obj.rotation.y = obj.rot.y;
    obj.obj.rotation.z = obj.rot.z;
  });
  rotTween.onComplete(function () {
    obj.tween.rotActive = false;
  });
  obj.tween.rot = rotTween;
  obj.tween.rotActive = true;
  rotTween.start();

  obj.pos = {
    x: obj.obj.position.x,
    y: obj.obj.position.y,
    z: obj.obj.position.z,
  };
  const posTween = new Tween(obj.pos).to(pos, posTime);
  posTween.easing(Easing.Quadratic.InOut);
  posTween.onUpdate(function () {
    obj.obj.position.x = obj.pos.x;
    obj.obj.position.y = obj.pos.y;
    obj.obj.position.z = obj.pos.z;
  });
  posTween.onComplete(function () {
    obj.tween.posActive = false;
  });
  obj.tween.pos = posTween;
  obj.tween.posActive = true;
  posTween.start();

  setTimeout(() => {
    obj.tween.posActive = false;
  }, posTime);
}
