class OctagonalPrism extends Mesh

    constructor: (params = {}) ->

        super "octagonal-prism", params

class POLY.OctagonalPrismMesh extends THREE.Mesh

    constructor: (params = {}) ->

        params.material ?= "normal"

        geometry = new OctagonalPrismGeometry params
        material = new MeshMaterial params.material, params

        super geometry, material

        this.class = params.class ?= "octagonal-prism"
        this.name = params.name ?= "Octagonal Prism"

        return this
