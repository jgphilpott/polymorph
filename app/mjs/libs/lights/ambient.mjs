// Link: https://threejs.org/docs/#api/en/lights/AmbientLight

import {white} from "../colors/three/grayscale.js"

export function addAmbientLight(position=scale) {

  let ambientLight = new THREE.AmbientLight(white, 1)

  ambientLight.position.set(0, 0, 0)
  scene.add(ambientLight)

  return ambientLight

}