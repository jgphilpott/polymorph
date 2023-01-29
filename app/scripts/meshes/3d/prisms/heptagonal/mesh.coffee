class HeptagonalPrism extends Mesh

    constructor: (params = {}) ->

        super "heptagonal-prism", params

class POLY.HeptagonalPrismMesh extends THREE.Mesh

    constructor: (params = {}) ->

        params.material ?= "normal"

        geometry = new HeptagonalPrismGeometry params
        material = new MeshMaterial params.material, params

        super geometry, material

        this.class = "heptagonal-prism"
        this.name = "Heptagonal Prism"

        return this
