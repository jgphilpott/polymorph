# Link: https://threejs.org/docs/#api/en/geometries/CylinderGeometry

class CylinderGeometry extends Geometry

    constructor: (params = {}) ->

        super "cylinder", params

class POLY.CylinderBufferGeometry extends THREE.CylinderBufferGeometry

    constructor: (params = {}) ->

        length = params.length ?= 10

        positiveRadius = params.positiveRadius ?= 5
        negativeRadius = params.negativeRadius ?= 5

        radialSegments = params.radialSegments ?= 42
        heightSegments = params.heightSegments ?= 1

        openEnded = params.openEnded ?= false

        thetaStart = params.thetaStart ?= 0
        thetaLength = params.thetaLength ?= Math.PI * 2

        super positiveRadius, negativeRadius, length, radialSegments, heightSegments, openEnded, thetaStart, thetaLength
