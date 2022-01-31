// Link: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera

export function addPerspectiveCamera(position=data.scale) {

  let camera = new THREE.PerspectiveCamera(75, data.width / data.height, 0.1, 1000)

  camera.up.set(0, 0, 1)
  camera.position.set(position * 1.35, position * 1.35, position * 0.55)

  camera.target = {x: 0, y: 0, z: 0}
  camera.lookAt(camera.target.x, camera.target.y, camera.target.z)

  data.camera = camera

  return camera

}