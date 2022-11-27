class QuadrilateralGeometry extends Geometry

    constructor : (params = {}) ->

        super "quadrilateral", params

class POLY.QuadrilateralBufferGeometry

    constructor : (params = {}) ->

        angle = 360 / 4
        radius = params.radius ?= 5

        geometry = new THREE.Geometry()

        p0 = circumpoint angle * 0, radius
        p1 = circumpoint angle * 1, radius
        p2 = circumpoint angle * 2, radius
        p3 = circumpoint angle * 3, radius

        vertices = params.vertices ?= [
            [0, p0[0], p0[1]]
            [0, p1[0], p1[1]]
            [0, p2[0], p2[1]]
            [0, p3[0], p3[1]]
        ]

        for vertex in vertices

            geometry.vertices.push new THREE.Vector3 vertex[0], vertex[1], vertex[2]

        geometry.faces.push new THREE.Face3 0, 1, 2
        geometry.faces.push new THREE.Face3 0, 2, 3

        geometry.computeFaceNormals()

        return new THREE.BufferGeometry().fromGeometry geometry
