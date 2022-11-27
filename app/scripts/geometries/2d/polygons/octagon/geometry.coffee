class OctagonGeometry extends Geometry

    constructor : (params = {}) ->

        super "octagon", params

class POLY.OctagonBufferGeometry

    constructor : (params = {}) ->

        angle = 360 / 8
        radius = params.radius ?= 5

        geometry = new THREE.Geometry()

        p0 = circumpoint angle * 0, radius
        p1 = circumpoint angle * 1, radius
        p2 = circumpoint angle * 2, radius
        p3 = circumpoint angle * 3, radius
        p4 = circumpoint angle * 4, radius
        p5 = circumpoint angle * 5, radius
        p6 = circumpoint angle * 6, radius
        p7 = circumpoint angle * 7, radius

        vertices = params.vertices ?= [
            [0, p0[0], p0[1]]
            [0, p1[0], p1[1]]
            [0, p2[0], p2[1]]
            [0, p3[0], p3[1]]
            [0, p4[0], p4[1]]
            [0, p5[0], p5[1]]
            [0, p6[0], p6[1]]
            [0, p7[0], p7[1]]
        ]

        for vertex in vertices

            geometry.vertices.push new THREE.Vector3 vertex[0], vertex[1], vertex[2]

        geometry.faces.push new THREE.Face3 0, 1, 2
        geometry.faces.push new THREE.Face3 0, 2, 3
        geometry.faces.push new THREE.Face3 0, 3, 4
        geometry.faces.push new THREE.Face3 0, 4, 5
        geometry.faces.push new THREE.Face3 0, 5, 6
        geometry.faces.push new THREE.Face3 0, 6, 7

        geometry.computeFaceNormals()

        return new THREE.BufferGeometry().fromGeometry geometry
