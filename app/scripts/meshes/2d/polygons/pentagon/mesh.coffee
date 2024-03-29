class Pentagon extends Mesh

    constructor: (params = {}) ->

        super "pentagon", params

class POLY.PentagonMesh extends THREE.Mesh

    constructor: (params = {}) ->

        params.material ?= "normal"

        geometry = new PentagonGeometry params
        material = new MeshMaterial params.material, params

        super geometry, material

        this.class = params.class ?= "pentagon"
        this.name = params.name ?= "Pentagon"

        return this
