const x=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))p(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const h of i.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&p(h)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function p(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}};x();function v(e){let t,s=0;return e<13?t="clubs":e<26?(t="diamonds",s=13):e<39?(t="hearts",s=26):(t="spades",s=39),[t,s]}var M={clubs:["ace_of_clubs.png","2_of_clubs.png","3_of_clubs.png","4_of_clubs.png","5_of_clubs.png","6_of_clubs.png","7_of_clubs.png","8_of_clubs.png","9_of_clubs.png","10_of_clubs.png","jack_of_clubs.png","queen_of_clubs.png","king_of_clubs.png"],diamonds:["ace_of_diamonds.png","2_of_diamonds.png","3_of_diamonds.png","4_of_diamonds.png","5_of_diamonds.png","6_of_diamonds.png","7_of_diamonds.png","8_of_diamonds.png","9_of_diamonds.png","10_of_diamonds.png","jack_of_diamonds.png","queen_of_diamonds.png","king_of_diamonds.png"],hearts:["ace_of_hearts.png","2_of_hearts.png","3_of_hearts.png","4_of_hearts.png","5_of_hearts.png","6_of_hearts.png","7_of_hearts.png","8_of_hearts.png","9_of_hearts.png","10_of_hearts.png","jack_of_hearts.png","queen_of_hearts.png","king_of_hearts.png"],spades:["ace_of_spades.png","2_of_spades.png","3_of_spades.png","4_of_spades.png","5_of_spades.png","6_of_spades.png","7_of_spades.png","8_of_spades.png","9_of_spades.png","10_of_spades.png","jack_of_spades.png","queen_of_spades.png","king_of_spades.png"]};const E="cards/";function r(e,t,s){return{x:e,y:t,z:s}}function l(e,t,s,p,n){e.rot={x:e.obj.rotation.x,y:e.obj.rotation.y,z:e.obj.rotation.z},e.tween.rot=new TWEEN.Tween(e.rot).to(p,n),e.tween.rot.onUpdate(function(){e.obj.rotation.x=e.rot.x,e.obj.rotation.y=e.rot.y,e.obj.rotation.z=e.rot.z}),e.tween.rot.easing(TWEEN.Easing.Quadratic.InOut),e.tween.rot.start(),e.tween.rot.active=!0,setTimeout(function(){e.tween.rot.active=!1},n),e.pos={x:e.obj.position.x,y:e.obj.position.y,z:e.obj.position.z},e.tween.pos=new TWEEN.Tween(e.pos).to(t,s),e.tween.pos.onUpdate(function(){e.obj.position.x=e.pos.x,e.obj.position.y=e.pos.y,e.obj.position.z=e.pos.z}),e.tween.pos.easing(TWEEN.Easing.Quadratic.InOut),e.tween.pos.start(),e.tween.pos.active=!0,setTimeout(function(){e.tween.pos.active=!1},s)}const g=new THREE.Scene,u=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3);u.position.z=6;const d=new THREE.WebGLRenderer;d.setPixelRatio(window.devicePixelRatio);d.setSize(window.innerWidth,window.innerHeight);d.setClearColor(14385,1);document.body.appendChild(d.domElement);const o=[],w={swirl:{init:()=>{R(2e3,w.swirl),f(e=>{m.center(1750)})},pos:(e,t)=>{e.consts.delay?(e.consts.delay-=1,e.consts.delay<=0&&delete e.consts.delay):(e.obj.position.x+=Math.cos(c/50-t/1.2+Math.random()/10)/20,e.obj.position.y-=Math.sin(c/50-t/1.2+Math.random()/10)/25,e.obj.position.z+=Math.sin(c/50-t/2)/30)},rot:(e,t)=>{e.consts.delay||(e.obj.rotation.y+=Math.cos(c/100+t/10)/40,e.obj.rotation.z+=Math.cos(c/100+t/10)/50,e.obj.rotation.x+=Math.cos(c/100+t/10)/60)}},static:{init:()=>randomState(),pos:()=>{},rot:()=>{}}},z=new THREE.BoxGeometry(.8125,1.25,.03),H=new THREE.TextureLoader().load(E+"pack.png"),a={material:new THREE.MeshPhongMaterial({color:16777215,map:H})};a.obj=new THREE.Mesh(z,a.material);a.obj.position.z=5;g.add(a.obj);a.tween={pos:{active:!1},rot:{active:!1}};a.state=w.static;function f(e){for(let t=0;t<52;t++)e(t)}function R(e,t){f(s=>{o[s].state=t})}const m={center:e=>{f(t=>{l(o[t],r(0,0,t/52),e-250,r(0,0,0),e)})},spread:e=>{f(t=>{l(o[t],r(t/7-3.5,Math.sin(t/(26/Math.PI)),t/52),e,r(0,0,Math.PI/1.5+t/24.8407),e-500)})}};function _(e,t){setTimeout(t,e)}_(1250,function(){l(a,r(0,0,.5),1e3,r(0,0,0),1e3),_(1e3,function(){l(a,r(0,-35,0),3e3,r(Math.PI/3,0,0),3e3),m.spread(5e3),_(5e3,function(){m.center(1500),_(1500,function(){f(function(e){o[e].consts.delay=e*10,o[e].state=w.swirl})})})})});const k=new THREE.BoxGeometry(.65,1,.03);for(let e=0;e<52;e++){const t=v(e),s=new THREE.TextureLoader().load(E+M[t[0]][e-t[1]]);o[e]={material:new THREE.MeshPhongMaterial({color:16777215,map:s})},o[e].obj=new THREE.Mesh(k,o[e].material),o[e].tween={pos:{active:!1},rot:{active:!1}},o[e].state=w.static,o[e].consts={},g.add(o[e].obj)}const y=new THREE.AmbientLight(16777215);y.position.z=5;g.add(y);let c=-1;const T=()=>{c++,d.render(g,u),requestAnimationFrame(T),a.tween.pos.active||a.state.pos(a,0),a.tween.rot.active||a.state.rot(a,0),f(e=>{o[e].tween.pos.active||o[e].state.pos(o[e],e),o[e].tween.rot.active||o[e].state.rot(o[e],e)}),TWEEN.update()};T();window.addEventListener("resize",()=>{u.aspect=window.innerWidth/window.innerHeight,u.updateProjectionMatrix(),d.setSize(window.innerWidth,window.innerHeight)},!1);
