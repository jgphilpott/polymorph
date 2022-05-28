// Link: https://threejs.org/docs/#api/en/geometries/SphereGeometry

import {black} from "../colors/three/grayscale.js"
import {addMesh} from "../../panels/mesh.mjs"
import {meshMaterial} from "../materials/mesh.mjs"

export function newSphere(radius=5, widthSegments=42, heightSegments=42, position=[0, 0, 0], material="normal", color=black) {

  let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
  let sphere = new THREE.Mesh(geometry, meshMaterial(material, color))

  sphere.position.set(position[0], position[1], position[2])

  sphere.class = "sphere"
  sphere.name = "Sphere"

  return sphere

}

export function addSphere(radius=5, widthSegments=42, heightSegments=42, position=[0, 0, 0], material="normal", color=black) {

  return addMesh(newSphere(radius, widthSegments, heightSegments, position, material, color))

}