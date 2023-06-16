# Link: https://threejs.org/docs/#api/en/lights/AmbientLight

class AmbientLight extends Light

    constructor: (params = {}) ->

        super "ambient", params

class POLY.AmbientLight extends THREE.AmbientLight

    constructor: (params = {}) ->

        intensity = params.intensity ?= 1
        color = params.color ?= whiteThree
        position = params.position ?= x: 0, y: 0, z: 0

        super color, intensity

        this.position.set position.x, position.y, position.z