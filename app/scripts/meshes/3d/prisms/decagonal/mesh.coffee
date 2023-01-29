class DecagonalPrism extends Mesh

    constructor: (params = {}) ->

        super "decagonal-prism", params

class POLY.DecagonalPrismMesh extends THREE.Mesh

    constructor: (params = {}) ->

        params.material ?= "normal"

        geometry = new DecagonalPrismGeometry params
        material = new MeshMaterial params.material, params

        super geometry, material

        this.class = "decagonal-prism"
        this.name = "Decagonal Prism"

        return this
