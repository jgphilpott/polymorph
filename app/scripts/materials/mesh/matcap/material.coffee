# Link: https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial

class MatcapMeshMaterial extends MeshMaterial

    constructor: (params = {}) ->

        super "matcap", params

class POLY.MatcapMeshMaterial extends THREE.MeshMatcapMaterial

    constructor: (params = {}) ->

        params.side ?= THREE.DoubleSide
        params.color ?= blackThree
        params.transparent ?= true
        params.wireframe ?= false
        params.reflectivity ?= 50
        params.transmission ?= 0
        params.metalness ?= 50
        params.roughness ?= 50
        params.opacity ?= 100

        $params = clone params

        $params.reflectivity /= 100
        $params.transmission /= 100
        $params.metalness /= 100
        $params.roughness /= 100
        $params.opacity /= 100

        super $params
